"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { activity, formatCurrency } from "@/lib/portal-data"

const types = ["All", ...Array.from(new Set(activity.map((a) => a.type)))]

export function ActivityExplorer() {
  const [filter, setFilter] = useState("All")

  const filtered = useMemo(
    () => (filter === "All" ? activity : activity.filter((a) => a.type === filter)),
    [filter],
  )

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-lg font-medium tracking-tight text-foreground">Activity</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {activity.length} events
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                filter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-border/60">
        {filtered.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-4 px-6 py-3.5">
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  item.amount >= 0 ? "bg-accent/12 text-accent" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.amount >= 0 ? (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                )}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.type}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm tabular-nums ${item.amount >= 0 ? "text-accent" : "text-foreground"}`}>
                {item.amount >= 0 ? "+" : ""}
                {formatCurrency(item.amount)}
              </p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-muted-foreground">
            No activity in this category.
          </li>
        )}
      </ul>
    </div>
  )
}
