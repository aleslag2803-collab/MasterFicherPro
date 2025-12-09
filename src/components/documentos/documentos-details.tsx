"use client"

import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import {
  Calendar,
  Building,
  Download,
  Edit,
  FileText,
  Share2,
  Trash2,
  User,
} from "lucide-react"
import EditDocumentModal from "./editar-documento"
import { useToast } from "@/src/hooks/use-toast"

interface DocumentDetailsProps {
  documentId: string
}

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
  idOrganizacion?: string
  usuario?: {
    nombre: string
    correo: string
  }
}

export function DocumentDetails({ documentId }: DocumentDetailsProps) {
  const [doc, setDoc] = useState<Documento | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [usuario, setUsuario] = useState<any>(null)
  const [loadingUsuario, setLoadingUsuario] = useState(false)
  const [organizacion, setOrganizacion] = useState<any>(null)
  const [loadingOrganizacion, setLoadingOrganizacion] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/documentos/${documentId}?mode=meta`)

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error ?? "Error al cargar documento")
        }

        const data = (await res.json()) as Documento
        setDoc(data)

        // Cargar información del usuario
        if (data.idUsuarioPropietario) {
          setLoadingUsuario(true)
          try {
            const userRes = await fetch(`/api/usuarios/${data.idUsuarioPropietario}`)
            if (userRes.ok) {
              const userData = await userRes.json()
              setUsuario(userData)
            }
          } catch (err) {
            console.error("Error al cargar usuario:", err)
          } finally {
            setLoadingUsuario(false)
          }
        }

        // Cargar información de la organización desde el idOrganizacion
        if (data.idOrganizacion) {
          setLoadingOrganizacion(true)
          try {
            const orgRes = await fetch(`/api/organizacion/${data.idOrganizacion}`)
            if (orgRes.ok) {
              const orgData = await orgRes.json()
              setOrganizacion(orgData)
            }
          } catch (err) {
            console.error("Error al cargar organización:", err)
          } finally {
            setLoadingOrganizacion(false)
          }
        }
      } catch (err: any) {
        console.error("Error cargando detalles de documento", err)
        setError(err?.message ?? "No se pudo cargar el documento")
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [documentId])

  const formatDate = (iso?: string | null) => {
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

  const formatSize = (bytes?: number | null) => {
    if (!bytes || bytes <= 0) return "Sin archivo"
    const mb = bytes / (1024 * 1024)
    if (mb < 1) {
      const kb = bytes / 1024
      return `${kb.toFixed(1)} KB`
    }
    return `${mb.toFixed(1)} MB`
  }

  const normalizeStatusLabel = (estado?: string | null) => {
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
    if (m.includes("sheet")) return "Hoja de cálculo"
    if (m.includes("word")) return "Documento Word"
    if (m.includes("excel")) return "Excel"
    return mime
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Cargando información del documento...</p>
        </CardContent>
      </Card>
    )
  }

  if (error || !doc) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">
            {error ?? "No se encontró el documento"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleUpdate = async (id: string, updateData: any) => {
    try {
      const res = await fetch(`/api/documentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Error al actualizar")
      }

      const updated = await res.json()
      setDoc(updated)
      
      toast({
        title: "Documento actualizado",
        description: "Los cambios se han guardado correctamente.",
      })
      
      return true
    } catch (error: any) {
      console.error("Error al actualizar:", error)
      toast({
        title: "Error al actualizar",
        description: error.message || "Ocurrió un error al actualizar el documento",
      })
      return false
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este documento?")) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/documentos/${doc.idDocumento}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Error al eliminar el documento")
      }

      toast({
        title: "Documento eliminado",
        description: "El documento se ha marcado como eliminado correctamente.",
      })

      // Redirigir a documentos
      setTimeout(() => {
        window.location.href = "/documentos"
      }, 500)
    } catch (error: any) {
      console.error("Error al eliminar:", error)
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el documento",
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <EditDocumentModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        documento={doc}
        onUpdate={handleUpdate}
      />

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
              <span className="font-medium">{typeLabelFromMime(doc.tipoArchivo)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Organización:</span>
              <span className="font-medium">
                {loadingOrganizacion ? "Cargando..." : organizacion?.nombre || "Desconocida"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Fecha:</span>
              <span className="font-medium">{formatDate(doc.fechaSubida)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Subido por:</span>
              <span className="font-medium">
                {loadingUsuario ? "Cargando..." : usuario?.nombre || "Desconocido"}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Estado</p>
            <Badge>
              {normalizeStatusLabel(doc.estado)}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Tamaño</p>
            <p className="text-sm text-muted-foreground">{formatSize(doc.tamanoBytes)}</p>
          </div>

          {doc.version && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Versión</p>
                <p className="text-sm text-muted-foreground">{doc.version}</p>
              </div>
            </>
          )}

          {doc.etiquetas && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Etiquetas</p>
                <p className="text-sm text-muted-foreground">{doc.etiquetas}</p>
              </div>
            </>
          )}

          {doc.resumen && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Resumen</p>
                <p className="text-sm text-muted-foreground">{doc.resumen}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            asChild
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            <a
              href={`/api/documentos/${documentId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar / Ver
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
