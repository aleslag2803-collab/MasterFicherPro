import Link from "next/link"

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex h-14 items-center justify-between px-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>DocManager v1.0.0</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/help" className="hover:text-foreground transition-colors">
            Ayuda / Soporte
          </Link>
        </div>
      </div>
    </footer>
  )
}
