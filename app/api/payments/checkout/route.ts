import { NextResponse } from "next/server"
import { getStripeClient, isStripeConfigured } from "@/lib/stripe"
import { hasValidSession } from "@/lib/session"
import { invoices } from "@/lib/portal-data"

const MIN_CONTRIBUTION_CENTS = 100
const MAX_CONTRIBUTION_CENTS = 50_000_000 * 100 // $50M — Stripe's own ceiling per session

export async function POST(request: Request) {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Set STRIPE_SECRET_KEY to enable checkout." },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { type } = (body ?? {}) as Record<string, unknown>
  const origin = request.headers.get("origin") || new URL(request.url).origin
  const stripe = getStripeClient()

  try {
    if (type === "contribution") {
      const { amount } = body as Record<string, unknown>
      const cents = Math.round(Number(amount) * 100)
      if (!Number.isFinite(cents) || cents < MIN_CONTRIBUTION_CENTS || cents > MAX_CONTRIBUTION_CENTS) {
        return NextResponse.json({ error: "Please enter a valid contribution amount." }, { status: 400 })
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Account Contribution — Whitfield Family Trust" },
              unit_amount: cents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/portal/payments?status=success&kind=contribution`,
        cancel_url: `${origin}/portal/payments?status=cancelled`,
      })
      return NextResponse.json({ url: session.url })
    }

    if (type === "invoice") {
      const { invoiceId } = body as Record<string, unknown>
      const invoice = invoices.find((i) => i.id === invoiceId)
      if (!invoice) {
        return NextResponse.json({ error: "Invoice not found." }, { status: 404 })
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: invoice.description },
              unit_amount: Math.round(invoice.amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: { invoiceId: invoice.id },
        success_url: `${origin}/portal/payments?status=success&kind=invoice&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/portal/payments?status=cancelled`,
      })
      return NextResponse.json({ url: session.url })
    }

    return NextResponse.json({ error: "Unknown payment type." }, { status: 400 })
  } catch (err) {
    console.error("[payments/checkout]", err)
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 })
  }
}
