import type { Metadata } from "next"
import { HoldingsExplorer } from "@/components/portal/holdings-explorer"

export const metadata: Metadata = {
  title: "Holdings — Marchetti Stone",
}

export default function HoldingsPage() {
  return <HoldingsExplorer />
}
