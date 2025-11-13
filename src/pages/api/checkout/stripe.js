import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    // Minimal placeholder: create a PaymentIntent
    const { amount } = req.body || { amount: 1000 }
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    })
    res.status(200).json({ clientSecret: intent.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Stripe error' })
  }
}
