import type { Metadata } from "next"
import { StatCards } from "@/components/portal/stat-cards"
import { PerformanceChart } from "@/components/portal/performance-chart"
import { AllocationChart } from "@/components/portal/allocation-chart"
import { HoldingsTable } from "@/components/portal/holdings-table"
import { ActivityDocuments } from "@/components/portal/activity-documents"
import { client } from "@/lib/portal-data"

export const metadata: Metadata = {
  title: "Client Portal — Marchetti Stone",
  description: "Your portfolio overview, holdings, activity, and documents.",
}

export default function PortalPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          {client.riskProfile} · Client since {client.inceptionYear}
        </p>
        <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Good afternoon, {client.name}.
        </h1>
      </div>

      <StatCards />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <PerformanceChart />
        <AllocationChart />
      </div>

      <HoldingsTable />

      <ActivityDocuments />
    </>
  )
}
