"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { allocation, formatCurrency } from "@/lib/portal-data"

const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function AllocationChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">
        Asset Allocation
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Current vs. policy targets</p>

      <div className="mt-4 flex justify-center">
        <div className="h-44 w-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={84}
                paddingAngle={2}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {allocation.map((entry, i) => (
                  <Cell key={entry.name} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--popover-foreground)",
                }}
                formatter={(value: number, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {allocation.map((item, i) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2.5 text-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              {item.name}
            </span>
            <span className="flex items-center gap-3">
              <span className="text-muted-foreground">{formatCurrency(item.amount)}</span>
              <span className="w-9 text-right font-medium tabular-nums text-foreground">
                {item.value}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
