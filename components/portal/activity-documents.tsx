import { FileText, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { activity, documents, formatCurrency } from "@/lib/portal-data"

export function ActivityDocuments() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">
            Recent Activity
          </h2>
        </div>
        <ul className="divide-y divide-border/60">
          {activity.map((item, i) => (
            <li key={i} className="flex items-center justify-between gap-4 px-6 py-3.5">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    item.amount >= 0 ? "bg-accent/12 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.amount >= 0 ? (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm tabular-nums ${
                    item.amount >= 0 ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.amount >= 0 ? "+" : ""}
                  {formatCurrency(item.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">
            Document Vault
          </h2>
        </div>
        <ul className="divide-y divide-border/60">
          {documents.map((doc) => (
            <li
              key={doc.name}
              className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-secondary/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.type} · {doc.date} · {doc.size}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Download ${doc.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Download className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
