import type { Metadata } from "next"
import { PortalSidebar } from "@/components/portal/portal-sidebar"
import { PortalTopbar } from "@/components/portal/portal-topbar"
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
    <div className="flex min-h-screen bg-secondary/30">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar />
        <main className="flex-1 space-y-6 px-6 py-8">
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
        </main>
      </div>
    </div>
  )
}
