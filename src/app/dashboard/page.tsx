import { DocumentCharts } from "@/src/components/document-charts";
import { QuickActions } from "@/src/components/quick-actions";
import { RecentDocuments } from "@/src/components/recent-documents";
import { StatsCards } from "@/src/components/stats-cards";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Resumen general del sistema de gestión documental
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentDocuments />
        <QuickActions />
      </div>

      <DocumentCharts />
    </main>
  );
}
