import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { RecentDocuments } from "@/components/recent-documents"
import { QuickActions } from "@/components/quick-actions"
import { DocumentCharts } from "@/components/document-charts"
import { TopBar } from "@/components/top-bar"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Resumen general del sistema de gestión documental</p>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RecentDocuments />
            <QuickActions />
          </div>

          <DocumentCharts />
        </main>
      </div>
    </div>
  )
}
