"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { performanceSeries } from "@/lib/portal-data"

const ranges = ["3M", "6M", "1Y", "All"] as const

export function PerformanceChart() {
  const [range, setRange] = useState<(typeof ranges)[number]>("1Y")

  const data =
    range === "3M"
      ? performanceSeries.slice(-3)
      : range === "6M"
        ? performanceSeries.slice(-6)
        : performanceSeries

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">
            Portfolio Performance
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Value vs. blended benchmark</p>
        </div>
        <div className="flex gap-1 rounded-md border border-border p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                range === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(v) => `$${v}k`}
              domain={["dataMin - 400", "dataMax + 400"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "13px",
                color: "var(--popover-foreground)",
              }}
              labelStyle={{ color: "var(--foreground)", fontWeight: 500 }}
              formatter={(value: number, name) => [
                `$${value.toLocaleString()}k`,
                name === "portfolio" ? "Portfolio" : "Benchmark",
              ]}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="var(--chart-4)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              fill="url(#portfolioFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-6 border-t border-border pt-4 text-xs">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--chart-1)]" />
          Portfolio
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2.5 w-4 rounded-full border border-dashed border-[var(--chart-4)]" />
          Benchmark
        </span>
      </div>
    </div>
  )
}
