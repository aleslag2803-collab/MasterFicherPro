import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const recentDocs = [
  {
    id: 1,
    name: "Contrato de Servicios 2025",
    type: "Contrato",
    date: "Hace 2 horas",
    status: "Activo",
  },
  {
    id: 2,
    name: "Informe Financiero Q1",
    type: "Informe",
    date: "Hace 5 horas",
    status: "Revisión",
  },
  {
    id: 3,
    name: "Política de Privacidad",
    type: "Política",
    date: "Hace 1 día",
    status: "Activo",
  },
  {
    id: 4,
    name: "Manual de Usuario v2.0",
    type: "Manual",
    date: "Hace 2 días",
    status: "Borrador",
  },
]

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Recientes</CardTitle>
        <CardDescription>Últimos documentos modificados en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.type} • {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={doc.status === "Activo" ? "default" : "secondary"}>{doc.status}</Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Link href="/documents">
            <Button variant="outline" className="w-full bg-transparent">
              Ver Todos los Documentos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
