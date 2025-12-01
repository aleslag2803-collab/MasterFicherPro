import { DocumentDetails } from "@/src/components/documentos/documentos-details";
import { DocumentViewer } from "@/src/components/documentos/documentos-viewer";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Link } from "lucide-react";


export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/documentos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Detalle del Documento</h2>
          <p className="text-muted-foreground">ID: {params.id}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DocumentViewer documentId={params.id} />
        </div>
        <div>
          <DocumentDetails documentId={params.id} />
        </div>
      </div>
    </div>
  )
}
