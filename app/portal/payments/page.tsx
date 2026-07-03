import type { Metadata } from "next"
import { PaymentsView } from "@/components/portal/payments-view"
import { invoices } from "@/lib/portal-data"
import { listPaidInvoiceIds } from "@/lib/invoices"
import { isStripeConfigured } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Payments — Marchetti Stone",
}

export default async function PaymentsPage() {
  const paidInvoiceIds = await listPaidInvoiceIds()

  return (
    <PaymentsView
      invoices={invoices}
      paidInvoiceIds={paidInvoiceIds}
      stripeConfigured={isStripeConfigured()}
    />
  )
}
