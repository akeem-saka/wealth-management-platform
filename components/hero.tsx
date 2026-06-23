import { ArrowUpRight, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        <img
          src="/hero-architecture.png"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground/80">
            <ShieldCheck className="h-3.5 w-3.5" />
            Registered Investment Advisor · Est. 1998
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Disciplined counsel for private wealth and institutional capital.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/75">
            We combine the judgment of a boutique advisory practice with an interactive
            platform that gives you institutional-grade portfolio insight, private market
            access, and transparent reporting—on your terms.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Request a Consultation
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/portal"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Explore the Client Portal
            </a>
          </div>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-primary-foreground/15 pt-10 sm:grid-cols-4">
          {[
            { value: "$12.4B", label: "Assets advised" },
            { value: "320+", label: "Client relationships" },
            { value: "27 yrs", label: "Median tenure focus" },
            { value: "98%", label: "Client retention" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="font-serif text-3xl font-medium tracking-tight">{stat.value}</dt>
              <dd className="mt-1 text-sm text-primary-foreground/65">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
