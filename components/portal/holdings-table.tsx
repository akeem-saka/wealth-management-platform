import { holdings, formatCurrency } from "@/lib/portal-data"

export function HoldingsTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">Holdings</h2>
        <span className="text-sm text-muted-foreground">{holdings.length} positions</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3 font-medium">Position</th>
              <th className="px-6 py-3 font-medium">Asset Class</th>
              <th className="px-6 py-3 text-right font-medium">Market Value</th>
              <th className="px-6 py-3 text-right font-medium">Weight</th>
              <th className="px-6 py-3 text-right font-medium">Day</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h.ticker} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                <td className="px-6 py-3.5">
                  <div className="font-medium text-foreground">{h.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{h.ticker}</div>
                </td>
                <td className="px-6 py-3.5 text-muted-foreground">{h.assetClass}</td>
                <td className="px-6 py-3.5 text-right tabular-nums text-foreground">
                  {formatCurrency(h.value)}
                </td>
                <td className="px-6 py-3.5 text-right tabular-nums text-muted-foreground">
                  {h.weight}%
                </td>
                <td
                  className={`px-6 py-3.5 text-right tabular-nums ${
                    h.dayPct > 0
                      ? "text-accent"
                      : h.dayPct < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {h.dayPct > 0 ? "+" : ""}
                  {h.dayPct.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
