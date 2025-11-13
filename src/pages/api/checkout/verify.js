// src/pages/api/checkout/verify.js
import axios from 'axios'
import { supabaseAdmin } from '../../../lib/supabaseServer'

export default async function handler(req, res) {
  // Paystack may send redirect with ?reference=xxxx
  const reference = req.query.reference || req.body.reference

  if (!reference) {
    return res.status(400).json({ error: 'reference required' })
  }

  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY
    const verifyUrl = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`
    const verifyResp = await axios.get(verifyUrl, {
      headers: { Authorization: `Bearer ${paystackSecret}` }
    })

    const payData = verifyResp.data?.data
    if (!payData) {
      return res.status(400).json({ error: 'invalid verification response' })
    }

    // check status
    if (payData.status !== 'success') {
      // update order to failed
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed', metadata: { paystack: payData } })
        .eq('paystack_reference', reference)
      return res.status(400).json({ error: 'payment not successful', detail: payData })
    }

    // amount (in kobo) reported by paystack
    const amount = payData.amount

    // find the pending order using reference
    const { data: existingOrder } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('paystack_reference', reference)
      .single()

    // If no existing order (maybe not pre-created), we create one using metadata from Paystack
    let orderId = existingOrder?.id
    if (!existingOrder) {
      // Use metadata to construct order
      const metadataItems = payData.metadata?.items || []
      const email = payData.customer?.email || payData.customer?.customer_email || 'unknown'
      const { data: newOrder } = await supabaseAdmin
        .from('orders')
        .insert([{
          email,
          total: amount,
          currency: payData.currency || 'NGN',
          status: 'paid',
          paystack_reference: reference,
          metadata: payData
        }])
        .select()
        .single()
      orderId = newOrder.id
    } else {
      // update order status to 'paid'
      await supabaseAdmin
        .from('orders')
        .update({ status: 'paid', metadata: { paystack: payData } })
        .eq('id', existingOrder.id)
      orderId = existingOrder.id
    }

    // Insert order_items and decrement product inventory
    const items = payData.metadata?.items || existingOrder?.metadata?.items || []
    // items expected: [{ id, name, unit_price, qty }]

    // IMPORTANT: run these modifications inside a single transaction ideally.
    // Supabase JS doesn't support multi-statement transactions directly; recommended: create a Postgres function to handle it.
    // For simplicity, do perfunctory inserts and updates (be aware of race conditions).
    for (const it of items) {
      // insert item
      await supabaseAdmin.from('order_items').insert([{
        order_id: orderId,
        product_id: it.id,
        name: it.name,
        unit_price: it.unit_price,
        qty: it.qty
      }])

      // decrement inventory (if product exists)
      if (it.id) {
        await supabaseAdmin.rpc('decrement_inventory', { p_id: it.id, dec_by: it.qty }).catch(async (e) => {
          // fallback: update directly
          await supabaseAdmin
            .from('products')
            .update({ inventory: supabaseAdmin.raw('inventory - ?', [it.qty]) })
            .eq('id', it.id)
        })
      }
    }

    // All good — redirect to success UI page or return JSON
    // If Paystack is redirecting the browser, send a redirect
    if (req.method === 'GET') {
      return res.redirect(`/checkout/success?reference=${reference}`)
    }
    return res.status(200).json({ success: true, reference })
  } catch (err) {
    console.error('verify error', err?.response?.data || err)
    return res.status(500).json({ error: 'verification_failed', detail: err?.message })
  }
}
