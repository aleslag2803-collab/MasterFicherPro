import { Card, CardContent } from "@/components/ui/card"
import { FileText, FolderTree, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Documentos",
    value: "1,234",
    change: "+12%",
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Organizaciones",
    value: "45",
    change: "+3%",
    icon: FolderTree,
    color: "text-secondary",
  },
  {
    title: "Pendientes",
    value: "23",
    change: "-8%",
    icon: Clock,
    color: "text-accent",
  },
  {
    title: "Completados",
    value: "1,211",
    change: "+15%",
    icon: CheckCircle,
    color: "text-chart-1",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change} vs mes anterior</p>
              </div>
              <div className={`rounded-full bg-muted p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
