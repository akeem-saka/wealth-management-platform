"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react"
import { holdings, formatCurrency } from "@/lib/portal-data"

type SortKey = "name" | "assetClass" | "value" | "weight" | "dayPct"
type SortDir = "asc" | "desc"

const columns: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "name", label: "Position" },
  { key: "assetClass", label: "Asset Class" },
  { key: "value", label: "Market Value", align: "right" },
  { key: "weight", label: "Weight", align: "right" },
  { key: "dayPct", label: "Day", align: "right" },
]

export function HoldingsExplorer() {
  const [query, setQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("value")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = q
      ? holdings.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.ticker.toLowerCase().includes(q) ||
            h.assetClass.toLowerCase().includes(q),
        )
      : holdings

    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number)
      return sortDir === "asc" ? cmp : -cmp
    })
    return sorted
  }, [query, sortKey, sortDir])

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-lg font-medium tracking-tight text-foreground">Holdings</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {holdings.length} positions
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 sm:w-72">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ticker, asset class…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              {columns.map((col) => (
                <th key={col.key} className={col.align === "right" ? "px-6 py-3 text-right" : "px-6 py-3"}>
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={`inline-flex items-center gap-1 font-medium transition-colors hover:text-foreground ${
                      col.align === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.ticker} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                <td className="px-6 py-3.5">
                  <div className="font-medium text-foreground">{h.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{h.ticker}</div>
                </td>
                <td className="px-6 py-3.5 text-muted-foreground">{h.assetClass}</td>
                <td className="px-6 py-3.5 text-right tabular-nums text-foreground">
                  {formatCurrency(h.value)}
                </td>
                <td className="px-6 py-3.5 text-right tabular-nums text-muted-foreground">{h.weight}%</td>
                <td
                  className={`px-6 py-3.5 text-right tabular-nums ${
                    h.dayPct > 0 ? "text-accent" : h.dayPct < 0 ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {h.dayPct > 0 ? "+" : ""}
                  {h.dayPct.toFixed(2)}%
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  No holdings match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
