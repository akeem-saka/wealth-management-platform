import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, PiggyBank } from "lucide-react"
import { portfolioSummary, formatCurrency } from "@/lib/portal-data"

export function StatCards() {
  const { totalValue, dayChange, dayChangePct, ytdReturnPct, unrealizedGain, cashAvailable } =
    portfolioSummary

  const cards = [
    {
      label: "Total Portfolio Value",
      value: formatCurrency(totalValue),
      change: `${dayChange >= 0 ? "+" : ""}${formatCurrency(dayChange)} (${dayChangePct}%) today`,
      positive: dayChange >= 0,
      icon: Wallet,
    },
    {
      label: "YTD Return",
      value: `+${ytdReturnPct}%`,
      change: "Net of fees",
      positive: true,
      icon: TrendingUp,
    },
    {
      label: "Unrealized Gain",
      value: formatCurrency(unrealizedGain),
      change: "Since inception",
      positive: true,
      icon: PiggyBank,
    },
    {
      label: "Cash Available",
      value: formatCurrency(cashAvailable),
      change: "Across all accounts",
      positive: true,
      icon: Wallet,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{card.label}</span>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground">
            {card.value}
          </p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-xs ${
              card.positive ? "text-accent" : "text-destructive"
            }`}
          >
            {card.positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {card.change}
          </p>
        </div>
      ))}
    </div>
  )
}
