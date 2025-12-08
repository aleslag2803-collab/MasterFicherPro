import Link from "next/link"
import { AuditoriaDetails } from "@/src/components/auditoria/auditoria-details"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"

// params es Promise<{ id: string }> igual que en Documentos
export default async function AuditoriaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/auditoria">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Detalle de auditoría
          </h1>
          <p className="text-sm text-muted-foreground">
            Vista detallada del proceso de auditoría y del documento asociado.
          </p>
        </div>
      </div>

      <AuditoriaDetails auditId={id} />
    </div>
  )
}
