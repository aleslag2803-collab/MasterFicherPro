import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { FileText, MoreVertical } from "lucide-react"
import { prisma } from "@/src/lib/prisma"

// Helper para formatear la fecha
function formatFecha(fecha: Date) {
  return fecha.toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Helper para mapear el estado a una “pill” visual
function getEstadoBadge(estado?: string | null) {
  if (!estado) {
    return {
      label: "Sin estado",
      classes: "bg-gray-100 text-gray-700",
    }
  }

  const lower = estado.toLowerCase()

  if (lower === "activo") {
    return {
      label: "Activo",
      classes: "bg-blue-100 text-blue-700",
    }
  }

  if (lower === "borrador") {
    return {
      label: "Borrador",
      classes: "bg-yellow-100 text-yellow-700",
    }
  }

  if (lower === "revision" || lower === "revisión") {
    return {
      label: "Revisión",
      classes: "bg-purple-100 text-purple-700",
    }
  }

  if (lower === "archivado" || lower === "archivados") {
    return {
      label: "Archivado",
      classes: "bg-gray-100 text-gray-700",
    }
  }

  // Por si tienes otros estados custom
  return {
    label: estado,
    classes: "bg-gray-100 text-gray-700",
  }
}

export async function RecentDocuments() {
  // 👉 Opción sencilla: últimos documentos creados
  // Si quieres que también cuente modificaciones/versiones,
  // luego podemos incluir relaciones y calcular la última fecha.
  const documentos = await prisma.documentos.findMany({
    orderBy: { fechaSubida: "desc" },
    take: 5,
  })

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Documentos recientes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Últimos documentos creados en el sistema
        </p>
      </CardHeader>
      <CardContent>
        {documentos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no hay documentos registrados en el sistema.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {documentos.map((doc) => {
                const { label, classes } = getEstadoBadge(doc.estado)

                return (
                  <div
                    key={doc.idDocumento}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {doc.nombreArchivo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.tipoArchivo} • {formatFecha(doc.fechaSubida)}
                      </p>
                    </div>

                    <Badge variant="secondary" className={classes}>
                      {label}
                    </Badge>

                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              Ver todos los documentos
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
