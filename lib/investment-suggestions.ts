export type InvestmentSuggestion = {
  headline: string
  services: string[]
  note: string
}

// Keyed to the same investor types offered in the contact form, and the
// same service names defined in components/services.tsx.
export const suggestionsByInvestorType: Record<string, InvestmentSuggestion> = {
  "Private Wealth": {
    headline: "Portfolio Strategy + Private Market Access",
    services: ["Portfolio Strategy", "Private Market Access", "Estate & Tax Strategy"],
    note: "Most private clients start with goals-based portfolio strategy, layering in private market access and estate planning as needs grow.",
  },
  "Family Office": {
    headline: "Institutional Advisory + Dedicated Advisory Team",
    services: ["Institutional Advisory", "Private Market Access", "Dedicated Advisory Team"],
    note: "Family offices typically pair institutional-grade governance with a dedicated advisor and analyst team.",
  },
  "Endowment / Foundation": {
    headline: "Institutional Advisory",
    services: ["Institutional Advisory", "Risk & Suitability"],
    note: "We design investment policy and manager selection aligned to your spending policy and risk tolerance.",
  },
  Institution: {
    headline: "Institutional Advisory + Risk & Suitability",
    services: ["Institutional Advisory", "Risk & Suitability"],
    note: "Investment policy design, manager selection, and governance support tailored to institutional mandates.",
  },
}
