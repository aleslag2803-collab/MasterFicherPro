import { Card, CardContent } from "./ui/card"
import { FileText, Building2, Search, MessageSquare } from "lucide-react"

const stats = [
  {
    title: "Total Documentos",
    value: "1,234",
    subtitle: "+12% vs mes anterior",
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Organizaciones",
    value: "45",
    subtitle: "+5% vs mes anterior",
    icon: Building2,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    title: "Buscadores",
    value: "23",
    subtitle: "Activos este mes",
    icon: Search,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    title: "Comentarios",
    value: "1,211",
    subtitle: "+8% vs mes anterior",
    icon: MessageSquare,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-semibold text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
