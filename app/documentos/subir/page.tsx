import { UploadDocumentForm } from "@/components/documentos/formulario-subir-documento"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UploadDocumentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/documentos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Subir Documento</h2>
          <p className="text-muted-foreground">Agregar un nuevo documento al sistema</p>
        </div>
      </div>
      <UploadDocumentForm />
    </div>
  )
}
