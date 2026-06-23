export const client = {
  name: "Whitfield Family Trust",
  advisor: "Daniel Marchetti",
  advisorTitle: "Senior Advisor",
  riskProfile: "Balanced Growth",
  inceptionYear: 2011,
}

export const portfolioSummary = {
  totalValue: 24_318_540,
  dayChange: 84_220,
  dayChangePct: 0.35,
  ytdReturnPct: 9.8,
  unrealizedGain: 6_142_900,
  cashAvailable: 1_240_000,
}

// 12 months of portfolio value vs. a benchmark
export const performanceSeries = [
  { month: "Jul", portfolio: 21_640, benchmark: 21_640 },
  { month: "Aug", portfolio: 21_980, benchmark: 21_810 },
  { month: "Sep", portfolio: 21_420, benchmark: 21_350 },
  { month: "Oct", portfolio: 22_310, benchmark: 21_900 },
  { month: "Nov", portfolio: 22_840, benchmark: 22_180 },
  { month: "Dec", portfolio: 22_510, benchmark: 22_040 },
  { month: "Jan", portfolio: 23_120, benchmark: 22_560 },
  { month: "Feb", portfolio: 23_460, benchmark: 22_810 },
  { month: "Mar", portfolio: 23_180, benchmark: 22_640 },
  { month: "Apr", portfolio: 23_780, benchmark: 23_010 },
  { month: "May", portfolio: 24_090, benchmark: 23_240 },
  { month: "Jun", portfolio: 24_318, benchmark: 23_390 },
]

export const allocation = [
  { name: "Public Equities", value: 42, amount: 10_213_787 },
  { name: "Fixed Income", value: 24, amount: 5_836_450 },
  { name: "Private Markets", value: 18, amount: 4_377_337 },
  { name: "Real Assets", value: 11, amount: 2_675_039 },
  { name: "Cash & Equivalents", value: 5, amount: 1_215_927 },
]

export const holdings = [
  { name: "Global Equity Index", ticker: "GEQX", assetClass: "Public Equities", value: 5_420_000, weight: 22.3, dayPct: 0.42 },
  { name: "US Large Cap Value", ticker: "USLV", assetClass: "Public Equities", value: 3_180_000, weight: 13.1, dayPct: 0.18 },
  { name: "Intl Developed Equity", ticker: "IDEV", assetClass: "Public Equities", value: 1_613_787, weight: 6.6, dayPct: -0.24 },
  { name: "Investment Grade Credit", ticker: "IGCR", assetClass: "Fixed Income", value: 3_410_000, weight: 14.0, dayPct: 0.06 },
  { name: "Municipal Bond Ladder", ticker: "MUNI", assetClass: "Fixed Income", value: 2_426_450, weight: 10.0, dayPct: 0.04 },
  { name: "Marchetti Private Credit II", ticker: "MPC2", assetClass: "Private Markets", value: 2_540_000, weight: 10.4, dayPct: 0.0 },
  { name: "Growth Equity Co-Invest", ticker: "GECI", assetClass: "Private Markets", value: 1_837_337, weight: 7.6, dayPct: 0.0 },
  { name: "Core Real Estate", ticker: "CORE", assetClass: "Real Assets", value: 1_675_039, weight: 6.9, dayPct: 0.12 },
  { name: "Infrastructure Income", ticker: "INFR", assetClass: "Real Assets", value: 1_000_000, weight: 4.1, dayPct: -0.08 },
  { name: "Treasury Reserve", ticker: "CASH", assetClass: "Cash", value: 1_215_927, weight: 5.0, dayPct: 0.0 },
]

export const activity = [
  { date: "Jun 18", type: "Rebalance", description: "Trimmed Public Equities to target weight", amount: -420_000 },
  { date: "Jun 12", type: "Distribution", description: "Quarterly income distribution", amount: 86_400 },
  { date: "Jun 05", type: "Capital Call", description: "Marchetti Private Credit II — drawdown 4 of 8", amount: -310_000 },
  { date: "May 28", type: "Contribution", description: "Wire received from external account", amount: 500_000 },
  { date: "May 14", type: "Dividend", description: "Reinvested dividends — Global Equity Index", amount: 41_280 },
]

export const documents = [
  { name: "Q2 2026 Performance Report", type: "Report", date: "Jun 30, 2026", size: "2.4 MB" },
  { name: "Investment Policy Statement", type: "Governance", date: "Jan 14, 2026", size: "640 KB" },
  { name: "May 2026 Statement", type: "Statement", date: "Jun 03, 2026", size: "1.1 MB" },
  { name: "Private Credit II — Capital Account", type: "Private Markets", date: "Jun 05, 2026", size: "820 KB" },
  { name: "2025 Tax Summary (1099)", type: "Tax", date: "Feb 10, 2026", size: "1.8 MB" },
]

export function formatCurrency(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
