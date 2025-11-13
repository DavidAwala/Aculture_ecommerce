// src/pages/api/checkout/paystack.js
import axios from 'axios'
import { supabaseAdmin } from '../../../lib/supabaseServer'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { cart, email } = req.body
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart required' })
    }
    if (!email) return res.status(400).json({ error: 'Customer email required' })

    // compute total server-side using database prices (prevent client price tampering)
    // build list of product ids
    const ids = cart.map(i => `'${i.id}'`).join(',')
    const { data: products, error } = await supabaseAdmin
      .rpc('select_products_by_ids', { ids_list: ids }) // optional: replace with direct query below
      .catch(()=> null)

    // If you don't have RPC, simple select:
    const { data: dbProducts, error: pErr } = await supabaseAdmin
      .from('products')
      .select('id, name, price, currency, inventory')
      .in('id', cart.map(i => i.id))

    if (pErr) throw pErr

    // map and compute total
    const items = cart.map(ci => {
      const prod = dbProducts.find(p => p.id === ci.id)
      if (!prod) throw new Error('Product not found: ' + ci.id)
      return {
        id: prod.id,
        name: prod.name,
        unit_price: prod.price,
        qty: ci.qty || 1
      }
    })

    const total = items.reduce((s, it) => s + (it.unit_price * (it.qty || 1)), 0) // in kobo

    // init Paystack transaction
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY
    const initializeUrl = 'https://api.paystack.co/transaction/initialize'
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/checkout/verify` // where Paystack redirects after payment

    const body = {
      email,
      amount: total, // in kobo
      metadata: { items },
      callback_url: callbackUrl
    }

    const resp = await axios.post(initializeUrl, body, {
      headers: { Authorization: `Bearer ${paystackSecret}` }
    })

    const authUrl = resp.data?.data?.authorization_url
    const reference = resp.data?.data?.reference

    // Optionally store a pending order locally BEFORE redirect (status: pending)
    // We will update it when payment is verified
    const { data: newOrder, error: insertErr } = await supabaseAdmin
      .from('orders')
      .insert([{
        email,
        total,
        currency: 'NGN',
        status: 'pending',
        paystack_reference: reference,
        metadata: { items }
      }])
      .select()
      .single()
    if (insertErr) {
      console.error('Order insert failed', insertErr)
      // non-fatal: continue returning auth url
    }

    return res.status(200).json({ authorization_url: authUrl, reference })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'server-error' })
  }
}
