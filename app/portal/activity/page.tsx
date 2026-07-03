import type { Metadata } from "next"
import { ActivityExplorer } from "@/components/portal/activity-explorer"

export const metadata: Metadata = {
  title: "Activity — Marchetti Stone",
}

export default function ActivityPage() {
  return <ActivityExplorer />
}
