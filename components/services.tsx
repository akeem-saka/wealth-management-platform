import { LineChart, Landmark, ScrollText, ShieldCheck, Globe2, Users } from "lucide-react"

const services = [
  {
    icon: LineChart,
    title: "Portfolio Strategy",
    audience: "Private Wealth",
    description:
      "Goals-based asset allocation grounded in modern portfolio theory and factor analysis, rebalanced with discipline and monitored continuously.",
  },
  {
    icon: Globe2,
    title: "Private Market Access",
    audience: "Both",
    description:
      "Curated access to institutional-grade private equity, credit, and real assets—with diligence, monitoring, and transparent reporting built in.",
  },
  {
    icon: Landmark,
    title: "Institutional Advisory",
    audience: "Institutions",
    description:
      "Investment policy design, manager selection, and governance support for endowments, foundations, and family offices.",
  },
  {
    icon: ScrollText,
    title: "Estate & Tax Strategy",
    audience: "Private Wealth",
    description:
      "Coordinated wealth structuring, generational planning, and tax-aware implementation alongside your legal and accounting advisors.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Suitability",
    audience: "Both",
    description:
      "Continuous suitability checks and risk profiling, with every recommendation logged to an immutable, audit-ready trail.",
  },
  {
    icon: Users,
    title: "Dedicated Advisory Team",
    audience: "Both",
    description:
      "A named advisor and analyst pairing for every relationship—automation handles the routine so people focus on judgment.",
  },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-2xl">
        <span className="text-sm font-medium uppercase tracking-widest text-accent">
          Services
        </span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          A full advisory practice, delivered through one platform.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Every engagement blends human expertise with an interactive platform—so you get
          considered advice without sacrificing transparency or speed.
        </p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="group bg-card p-7 transition-colors hover:bg-secondary/60">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/8 text-primary">
                <service.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {service.audience}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-foreground">
              {service.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
