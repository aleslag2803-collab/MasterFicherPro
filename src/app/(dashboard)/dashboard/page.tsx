import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { DocumentCharts } from "@/components/dashboard/document-charts"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Resumen general del sistema de gestión documental</p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentDocuments />
        <QuickActions />
      </div>
      <DocumentCharts />
    </div>
  )
}
