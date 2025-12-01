import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { FileText, MoreVertical } from "lucide-react"


const documents = [
  {
    title: "Contrato de Servicios 2025",
    subtitle: "Contrato • Hace 2 horas",
    status: "Activo",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Informe Financiero Q1",
    subtitle: "Informe • Hace 5 horas",
    status: "Revisión",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Política de privacidad",
    subtitle: "Política • Hace 1 día",
    status: "Activo",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Manual de Usuario v2.0",
    subtitle: "Manual • Hace 2 días",
    status: "Borrador",
    statusColor: "bg-gray-100 text-gray-700",
  },
]

export function RecentDocuments() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Documentos Recientes</CardTitle>
        <p className="text-sm text-muted-foreground">Documentos modificados o creados en el sistema</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{doc.title}</p>
                <p className="text-xs text-muted-foreground">{doc.subtitle}</p>
              </div>
              <Badge variant="secondary" className={doc.statusColor}>
                {doc.status}
              </Badge>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Ver Todos los Documentos
        </Button>
      </CardContent>
    </Card>
  )
}
