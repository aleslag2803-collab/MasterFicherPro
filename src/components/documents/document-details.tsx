import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, Edit, Trash2, FileText, Calendar, User, Building } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface DocumentDetailsProps {
  documentId: string
}

export function DocumentDetails({ documentId }: DocumentDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Tipo:</span>
              <span className="font-medium">Contrato</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Organización:</span>
              <span className="font-medium">Acme Corp</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Fecha:</span>
              <span className="font-medium">2025-01-15</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Subido por:</span>
              <span className="font-medium">Juan Pérez</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Estado</p>
            <Badge>Activo</Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Tamaño</p>
            <p className="text-sm text-muted-foreground">2.4 MB</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
