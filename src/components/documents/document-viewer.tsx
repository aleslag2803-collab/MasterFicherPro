import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface DocumentViewerProps {
  documentId: string
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista Previa del Documento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[600px] items-center justify-center rounded-lg border-2 border-dashed bg-muted">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Vista previa del documento #{documentId}</p>
            <p className="text-xs text-muted-foreground">La vista previa se mostrará aquí</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
