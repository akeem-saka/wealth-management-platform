import { Quote } from "lucide-react"

const credentials = [
  "Fiduciary, fee-only structure",
  "SEC-registered investment advisor",
  "SOC 2 Type II secure infrastructure",
  "Independent custody & reporting",
]

export function TrackRecord() {
  return (
    <section id="track-record" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Track Record
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Trusted across generations of families and institutions.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Our work is measured in decades, not quarters. We hold ourselves to a fiduciary
            standard and operate with full transparency on fees, holdings, and performance.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <figure className="rounded-lg border border-border bg-card p-8 lg:p-10">
          <Quote className="h-8 w-8 text-accent" aria-hidden />
          <blockquote className="mt-5 text-pretty font-serif text-xl leading-relaxed text-foreground lg:text-2xl">
            “They pair the responsiveness of a boutique with reporting we used to only see from
            the largest institutions. The portal gives our investment committee a single,
            trustworthy view of everything.”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-serif text-sm font-medium text-primary-foreground">
              EH
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Eleanor Hastings</p>
              <p className="text-sm text-muted-foreground">CIO, Brandt Family Foundation</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
