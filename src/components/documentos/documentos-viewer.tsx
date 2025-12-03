"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FileText } from "lucide-react"

interface DocumentViewerProps {
  documentId: string
}

type DocumentoMeta = {
  idDocumento: string
  nombreArchivo: string
  tipoArchivo: string
  tamanoBytes: number | null
  fechaSubida: string
  estado: string
  // lo demás no lo necesitamos aquí
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [doc, setDoc] = useState<DocumentoMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fileUrl = `/api/documentos/${documentId}`

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/documentos/${documentId}?mode=meta`)

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error ?? "Error al cargar documento")
        }

        const data = (await res.json()) as DocumentoMeta
        setDoc(data)
      } catch (err: any) {
        console.error("Error cargando meta del documento", err)
        setError(err?.message ?? "No se pudo cargar el documento")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [documentId])

  const hasFile = doc && doc.tamanoBytes !== null && doc.tamanoBytes > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista Previa del Documento</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex h-[600px] items-center justify-center rounded-lg border bg-muted">
            <p className="text-sm text-muted-foreground">
              Cargando documento...
            </p>
          </div>
        )}

        {!isLoading && (error || !doc) && (
          <div className="flex h-[600px] items-center justify-center rounded-lg border bg-muted">
            <p className="text-sm text-red-500">
              {error ?? "No se encontró el documento"}
            </p>
          </div>
        )}

        {!isLoading && doc && !hasFile && (
          <div className="flex h-[600px] items-center justify-center rounded-lg border-2 border-dashed bg-muted">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Este documento aún no tiene archivo almacenado.
              </p>
              <p className="text-xs text-muted-foreground">
                Sube una nueva versión con archivo para ver la vista previa aquí.
              </p>
            </div>
          </div>
        )}

        {!isLoading && doc && hasFile && (
          <div className="h-[600px] w-full overflow-hidden rounded-lg border bg-muted">
            <iframe src={fileUrl} className="h-full w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
