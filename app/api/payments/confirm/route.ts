import { NextResponse } from "next/server"
import { getStripeClient, isStripeConfigured } from "@/lib/stripe"
import { hasValidSession } from "@/lib/session"
import { markInvoicePaid } from "@/lib/invoices"

// Confirms payment status directly against Stripe (never trusts the
// client-supplied redirect alone) and records the invoice as paid.
// A production deployment should also verify via a signed Stripe webhook,
// since this confirm call can be skipped if the browser never returns here.
export async function POST(request: Request) {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Payments aren't configured." }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { sessionId } = (body ?? {}) as Record<string, unknown>
  if (typeof sessionId !== "string" || sessionId.trim().length === 0) {
    return NextResponse.json({ error: "Missing session id." }, { status: 400 })
  }

  try {
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed." }, { status: 400 })
    }

    const invoiceId = session.metadata?.invoiceId
    if (invoiceId) {
      await markInvoicePaid(invoiceId)
    }

    return NextResponse.json({ ok: true, invoiceId: invoiceId ?? null })
  } catch (err) {
    console.error("[payments/confirm]", err)
    return NextResponse.json({ error: "Couldn't confirm payment." }, { status: 500 })
  }
}
