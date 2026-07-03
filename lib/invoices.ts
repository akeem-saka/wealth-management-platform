import { getDb } from "@/lib/db"

export async function listPaidInvoiceIds(): Promise<string[]> {
  const sql = await getDb()
  const rows = await sql`SELECT invoice_id FROM paid_invoices`
  return rows.map((r) => r.invoice_id as string)
}

export async function markInvoicePaid(invoiceId: string): Promise<void> {
  const sql = await getDb()
  await sql`
    INSERT INTO paid_invoices (invoice_id) VALUES (${invoiceId})
    ON CONFLICT (invoice_id) DO NOTHING
  `
}
