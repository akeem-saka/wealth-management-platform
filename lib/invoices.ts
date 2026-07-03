import { readJsonFile, writeJsonFile } from "@/lib/json-store"

const FILE = "paid-invoices.json"

export async function listPaidInvoiceIds(): Promise<string[]> {
  return readJsonFile<string>(FILE)
}

export async function markInvoicePaid(invoiceId: string): Promise<void> {
  const paid = await listPaidInvoiceIds()
  if (!paid.includes(invoiceId)) {
    paid.push(invoiceId)
    await writeJsonFile(FILE, paid)
  }
}
