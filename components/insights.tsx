import { ArrowUpRight } from "lucide-react"

const articles = [
  {
    category: "Market Commentary",
    date: "June 2026",
    title: "Positioning fixed income as the rate cycle turns",
    readTime: "6 min read",
  },
  {
    category: "Private Markets",
    date: "May 2026",
    title: "Why selectivity matters more than vintage in private credit",
    readTime: "8 min read",
  },
  {
    category: "Wealth Planning",
    date: "April 2026",
    title: "A framework for tax-aware multigenerational giving",
    readTime: "5 min read",
  },
]

export function Insights() {
  return (
    <section id="insights" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-widest text-accent">
              Insights
            </span>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Research and perspective from our investment team.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent"
          >
            View all insights
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.title}
              href="#"
              className="group flex flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-accent">{article.category}</span>
                <span aria-hidden>·</span>
                <span>{article.date}</span>
              </div>
              <h3 className="mt-4 flex-1 text-pretty font-serif text-xl font-medium leading-snug tracking-tight text-foreground">
                {article.title}
              </h3>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">{article.readTime}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
