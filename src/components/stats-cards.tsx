import { Card, CardContent } from "./ui/card"
import { FileText, Building2, Search, MessageSquare } from "lucide-react"
import { prisma } from "@/src/lib/prisma"

export async function StatsCards() {
  // 1. Leemos datos reales desde la BD
  const [totalDocumentos, totalOrganizaciones] = await Promise.all([
    prisma.documentos.count(),
    prisma.organizacion.count(),
  ])

  // 2. Armamos las tarjetas con valores reales
  const stats = [
    {
      title: "Total Documentos",
      value: totalDocumentos.toLocaleString("es-MX"),
      subtitle: "Documentos registrados en el sistema",
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Organizaciones",
      value: totalOrganizaciones.toLocaleString("es-MX"),
      subtitle: "Organizaciones / carpetas configuradas",
      icon: Building2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    // Estas dos tarjetas las dejo sin datos “inventados”
    // para que no muestren información falsa.
    {
      title: "Buscadores",
      value: "—",
      subtitle: "Métrica aún no implementada",
      icon: Search,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },
    {
      title: "Comentarios",
      value: "—",
      subtitle: "Métrica aún no implementada",
      icon: MessageSquare,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
  ]

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
                <div
                  className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}
                >
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
