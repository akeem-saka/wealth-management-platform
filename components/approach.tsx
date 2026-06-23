const steps = [
  {
    number: "01",
    title: "Discovery & Suitability",
    description:
      "We map your objectives, liquidity needs, time horizon, and risk tolerance through a structured questionnaire reviewed by your advisor.",
  },
  {
    number: "02",
    title: "Strategy & Proposal",
    description:
      "Our analysts model allocations and stress-test scenarios. You review a clear, interactive proposal before anything is implemented.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Automation handles rebalancing, cash management, and routine execution—while every decision is logged to an audit-ready trail.",
  },
  {
    number: "04",
    title: "Ongoing Stewardship",
    description:
      "Continuous monitoring, quarterly reviews, and direct access to your team for life events, tax planning, and market shifts.",
  },
]

export function Approach() {
  return (
    <section id="approach" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-accent">
              The Hybrid Model
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Machines for precision. People for judgment.
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              The platform automates the disciplined, repeatable work—risk profiling,
              rebalancing, reporting—so your advisory team can focus on the moments that
              genuinely require experience and care.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              The result is institutional rigor with the responsiveness of a boutique firm,
              and a complete, transparent record of every recommendation we make.
            </p>
          </div>

          <ol className="relative space-y-8 border-l border-border pl-8">
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">{step.number}</span>
                  <h3 className="font-serif text-xl font-medium tracking-tight text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
