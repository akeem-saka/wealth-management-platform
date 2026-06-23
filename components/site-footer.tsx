import Link from "next/link"
import { BrandMark } from "@/components/brand-mark"

const columns = [
  {
    heading: "Services",
    links: ["Portfolio Strategy", "Private Markets", "Institutional Advisory", "Estate & Tax"],
  },
  {
    heading: "Firm",
    links: ["About", "Our Team", "Insights", "Careers"],
  },
  {
    heading: "Clients",
    links: ["Client Portal", "Document Vault", "Schedule a Review", "Support"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-foreground">
              <BrandMark className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-medium tracking-tight">Marchetti Stone</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A fiduciary advisory firm serving private wealth and institutional investors with
              disciplined strategy and transparent reporting.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-medium text-foreground">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marchetti Stone Advisors LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Form ADV</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Disclosures</a>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground/70">
          This site is a demonstration. Nothing herein constitutes investment advice or an offer
          to buy or sell any security. Investing involves risk, including the possible loss of
          principal. Past performance is not indicative of future results.
        </p>
      </div>
    </footer>
  )
}
