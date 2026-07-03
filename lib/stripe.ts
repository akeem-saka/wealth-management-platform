import Stripe from "stripe"

let client: Stripe | null = null

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("Payments aren't configured — set STRIPE_SECRET_KEY to enable checkout.")
  }
  if (!client) {
    client = new Stripe(key)
  }
  return client
}
