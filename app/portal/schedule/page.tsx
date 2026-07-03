import type { Metadata } from "next"
import { ScheduleReview } from "@/components/portal/schedule-review"

export const metadata: Metadata = {
  title: "Schedule Review — Marchetti Stone",
}

export default function SchedulePage() {
  return <ScheduleReview />
}
