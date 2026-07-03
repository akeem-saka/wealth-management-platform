import type { Metadata } from "next"
import { DocumentVault } from "@/components/portal/document-vault"

export const metadata: Metadata = {
  title: "Documents — Marchetti Stone",
}

export default function DocumentsPage() {
  return <DocumentVault />
}
