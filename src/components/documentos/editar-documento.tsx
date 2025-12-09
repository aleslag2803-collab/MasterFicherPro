"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog"

interface Documento {
  idDocumento: string
  nombreArchivo: string
  tipoArchivo: string
  estado: string
  version?: string | null
  etiquetas?: string | null
  resumen?: string | null
}

interface EditDocumentModalProps {
  open: boolean
  onClose: () => void
  documento: Documento | null
  onUpdate: (id: string, data: any) => Promise<boolean>
}

const ESTADOS = ["activo", "borrador", "revisión", "archivado"]

export default function EditDocumentModal({
  open,
  onClose,
  documento,
  onUpdate,
}: EditDocumentModalProps) {
  const [nombreArchivo, setNombreArchivo] = useState("")
  const [estado, setEstado] = useState("activo")
  const [version, setVersion] = useState("")
  const [etiquetas, setEtiquetas] = useState("")
  const [resumen, setResumen] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (documento && open) {
      setNombreArchivo(documento.nombreArchivo)
      setEstado(documento.estado || "activo")
      setVersion(documento.version || "")
      setEtiquetas(documento.etiquetas || "")
      setResumen(documento.resumen || "")
      setError("")
    }
  }, [documento, open])

  const handleSubmit = async () => {
    setError("")

    setLoading(true)

    try {
      const updateData = {
        estado: estado || undefined,
        version: version || undefined,
        etiquetas: etiquetas || undefined,
        resumen: resumen || undefined,
      }

      const success = await onUpdate(documento!.idDocumento, updateData)

      if (success) {
        onClose()
      }
    } catch (err: any) {
      setError(err.message || "Error al actualizar el documento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}

          <div>
            <Label>Nombre del Archivo</Label>
            <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{nombreArchivo}</p>
          </div>

          <div>
            <Label>Estado</Label>
            <select
              className="border rounded-md p-2 w-full text-sm"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              {ESTADOS.map((est) => (
                <option key={est} value={est}>
                  {est.charAt(0).toUpperCase() + est.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Versión</Label>
            <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0" />
          </div>

          <div>
            <Label>Etiquetas</Label>
            <Input
              value={etiquetas}
              onChange={(e) => setEtiquetas(e.target.value)}
              placeholder="importante, confidencial, ..."
            />
          </div>

          <div>
            <Label>Resumen</Label>
            <Textarea value={resumen} onChange={(e) => setResumen(e.target.value)} placeholder="Descripción breve..." rows={3} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button className="bg-black text-white" onClick={handleSubmit} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
