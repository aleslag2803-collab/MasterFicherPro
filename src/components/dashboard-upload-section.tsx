import { UploadDocumentForm } from "@/src/components/documentos/formulario-subir-documento"

export function DashboardUploadSection() {
  return (
    <section
      id="upload-document-section"
      className="mt-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Subir Documento
          </h2>
          <p className="text-muted-foreground">
            Agrega un nuevo documento al sistema directamente desde el Dashboard.
          </p>
        </div>
      </div>

      {/* Aquí reutilizamos exactamente el mismo formulario que en /documentos/subir */}
      <UploadDocumentForm />
    </section>
  )
}
