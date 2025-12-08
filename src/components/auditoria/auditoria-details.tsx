"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Calendar, FileText, Building, User } from "lucide-react"
import { DocumentViewer } from "../documentos/documentos-viewer"
import { Button } from "../ui/button"


type Documento = {
  idDocumento: string
  idUsuarioPropietario: string
  nombreArchivo: string
  tipoArchivo: string
  tamanoBytes: number | null
  fechaSubida: string
  version: string | null
  estado: string
  etiquetas: string | null
  resumen: string | null
}

type Auditor = {
  idUsuario: string
  nombre: string
  correo: string
}

type Comentario = {
  idComentarioAuditoria: string
  comentario: string
  fechaComentario: string
  usuario: {
    idUsuario: string
    nombre: string
  }
}

type ProcesoAuditoriaDetalle = {
  idProcesoAuditoria: string
  nombre: string | null
  estado: string
  fechaLimite: string | null
  fechaCreacion: string
  fechaActualizacion: string
  documento: Documento
  auditor: Auditor | null
  comentarios: Comentario[]
}

interface AuditoriaDetailsProps {
  auditId: string
}

export function AuditoriaDetails({ auditId }: AuditoriaDetailsProps) {

  const [audit, setAudit] = useState<ProcesoAuditoriaDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 👇 NUEVOS estados
  const [estadoLocal, setEstadoLocal] = useState<string>("en_proceso")
  const [savingEstado, setSavingEstado] = useState(false)

  const [newComment, setNewComment] = useState("")
  const [savingComment, setSavingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch(`/api/audit/${auditId}`)
        if (!res.ok) {
          throw new Error("No se pudo cargar la auditoría")
        }

        const data = await res.json()
        setAudit(data)
        setEstadoLocal(data.estado)

      } catch (err: any) {
        console.error("Error cargando detalles de auditoría", err)
        setError(err?.message ?? "No se pudo cargar la auditoría")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [auditId])

  const formatDateTime = (iso?: string | null) => {
    if (!iso) return "-"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "-"
    return d.toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (iso?: string | null) => {
    if (!iso) return "-"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "-"
    return d.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatSize = (bytes?: number | null) => {
    if (!bytes || bytes <= 0) return "Sin archivo"
    const mb = bytes / (1024 * 1024)
    if (mb < 1) {
      const kb = bytes / 1024
      return `${kb.toFixed(1)} KB`
    }
    return `${mb.toFixed(2)} MB`
  }

  const normalizeEstadoProceso = (estado?: string | null) => {
    if (!estado) return "-"
    const lower = estado.toLowerCase()
    if (lower === "en_proceso") return "En progreso"
    if (lower === "finalizado" || lower === "aprobado" || lower === "aceptado")
      return "Aprobado"
    if (lower === "cancelado") return "Cancelado"
    return estado
  }
  
  const isFinalState = (estado: string) => {
    const lower = estado.toLowerCase()
    return lower === "aprobado" || lower === "finalizado" || lower === "aceptado"
  }

  const normalizeEstadoDocumento = (estado?: string | null) => {
    if (!estado) return "-"
    const lower = estado.toLowerCase()
    if (lower === "activo") return "Activo"
    if (lower === "borrador") return "Borrador"
    if (lower === "revision" || lower === "revisión") return "Revisión"
    return estado
  }

  const typeLabelFromMime = (mime?: string | null) => {
    if (!mime) return "-"
    const m = mime.toLowerCase()
    if (m.includes("pdf")) return "PDF"
    if (m.includes("word") || m.includes("doc")) return "Word"
    if (m.includes("sheet") || m.includes("excel") || m.includes("xls"))
      return "Hoja de cálculo"
    if (m.includes("image") || m.includes("png") || m.includes("jpg") || m.includes("jpeg")) {
      return "Imagen"
    }
    return "Documento"
  }

  const handleEstadoChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!audit) return
    const nuevoEstado = e.target.value
    setEstadoLocal(nuevoEstado)

    try {
      setSavingEstado(true)

      const res = await fetch(`/api/audit/${auditId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      })

      if (!res.ok) {
        throw new Error("No se pudo actualizar el estado")
      }

      const updated = await res.json()
      setAudit(updated)
      setEstadoLocal(updated.estado)
    } catch (err) {
      console.error("Error al actualizar estado de auditoría", err)
      // opcional: podríamos revertir el estadoLocal si falla
    } finally {
      setSavingEstado(false)
    }
  }

  const handleSaveComment = async () => {
    if (!audit) return
    if (!newComment.trim()) return

    try {
      setSavingComment(true)
      setCommentError(null)

      const userId = audit.documento.idUsuarioPropietario

      const res = await fetch(`/api/audit/${auditId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comentario: newComment.trim(),
          userId,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? "No se pudo guardar el comentario")
      }

      const created: Comentario = await res.json()

      setAudit({
        ...audit,
        comentarios: [...audit.comentarios, created],
      })
      setNewComment("")
    } catch (err: any) {
      console.error("Error al guardar comentario", err)
      setCommentError(
        err?.message ?? "Error desconocido al guardar el comentario"
      )
    } finally {
      setSavingComment(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Vista previa del documento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cargando documento...
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Panel de auditoría</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cargando información de auditoría...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !audit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error al cargar auditoría</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            {error ?? "No se encontró el proceso de auditoría"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const doc = audit.documento

    return (
    <div className="space-y-6">
      {/* Arriba: vista previa + panel de auditoría */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna izquierda: documento + info del documento */}
        <div className="lg:col-span-2 space-y-4">
          {/* Vista previa del documento (igual que en Documentos) */}
          <DocumentViewer documentId={doc.idDocumento} />

          {/* Información del documento, SOLO debajo del visor */}
          <Card>
            <CardHeader>
              <CardTitle>Información del documento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium">
                    {typeLabelFromMime(doc.tipoArchivo)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Organización:</span>
                  {/* Cuando conecten organizaciones aquí se reemplaza el "-" */}
                  <span className="font-medium">-</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Fecha de subida:
                  </span>
                  <span className="font-medium">
                    {formatDateTime(doc.fechaSubida)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Subido por (id usuario):
                  </span>
                  <span className="font-mono text-xs">
                    {doc.idUsuarioPropietario}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: panel de auditoría + comentarios */}
        <div className="space-y-4">
          {/* Panel de auditoría */}
          <Card>
            <CardHeader>
              <CardTitle>Panel de auditoría</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Proceso de Auditoría
                </p>
                <p className="text-base font-semibold">
                  {audit.nombre || `Auditoría de ${doc.nombreArchivo}`}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Auditor asignado
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {audit.auditor?.nombre ?? "Sin asignar"}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Fecha límite de revisión
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {formatDate(audit.fechaLimite)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Estado general
                </p>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border border-border bg-background px-3 py-1 text-sm"
                    value={estadoLocal}
                    onChange={handleEstadoChange}
                    disabled={savingEstado}
                  >
                    <option value="en_proceso">En progreso</option>
                    <option value="aprobado">Aprobado</option>
                  </select>
                  {savingEstado && (
                    <span className="text-xs text-muted-foreground">
                      Guardando...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Cuando el estado es{" "}
                  <span className="font-semibold">Aprobado</span> ya no se
                  reciben cambios en este apartado.
                </p>
              </div>

              <Separator />

              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  Creado el:{" "}
                  <span className="font-medium text-foreground">
                    {formatDateTime(audit.fechaCreacion)}
                  </span>
                </p>
                <p>
                  Última actualización:{" "}
                  <span className="font-medium text-foreground">
                    {formatDateTime(audit.fechaActualizacion)}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comentarios */}
          <Card>
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Formulario para nuevo comentario */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Agrega un comentario sobre esta auditoría.
                </p>
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  rows={3}
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={savingComment || isFinalState(estadoLocal)}
                />
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveComment}
                    disabled={
                      savingComment ||
                      !newComment.trim() ||
                      isFinalState(estadoLocal)
                    }
                  >
                    {savingComment ? "Guardando..." : "Guardar comentario"}
                  </Button>

                  {isFinalState(estadoLocal) && (
                    <p className="text-[11px] text-muted-foreground">
                      La auditoría está aprobada; ya no se permiten nuevos
                      comentarios.
                    </p>
                  )}
                </div>
                {commentError && (
                  <p className="text-xs text-destructive">{commentError}</p>
                )}
              </div>

              <Separator />

              {/* Lista de comentarios */}
              {audit.comentarios.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aún no hay comentarios para este proceso de auditoría.
                </p>
              )}

              {audit.comentarios.length > 0 && (
                <div className="space-y-4">
                  {audit.comentarios.map((comentario) => (
                    <div
                      key={comentario.idComentarioAuditoria}
                      className="rounded-lg border border-border bg-card px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold">
                          {comentario.usuario?.nombre ?? "Usuario"}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatDateTime(comentario.fechaComentario)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-foreground">
                        {comentario.comentario}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
