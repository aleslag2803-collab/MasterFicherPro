"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Download, Eye, MoreVertical, Trash2 } from "lucide-react"

// 👇 importamos el dialogo de confirmación y el toast
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { useToast } from "@/src/hooks/use-toast"

type Documento = {
  idDocumento: string
  nombreArchivo: string
  tipoArchivo: string
  fechaSubida: string // viene como string de la API (ISO)
  estado: string
  tamanoBytes?: number | null
}

export function DocumentsTable() {
  const [documents, setDocuments] = useState<Documento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 👇 estados para el diálogo de confirmación
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [docToDelete, setDocToDelete] = useState<Documento | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const res = await fetch("/api/documentos")

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error ?? "Error al cargar documentos")
        }

        const data = await res.json()
        setDocuments(data as Documento[])
      } catch (err: any) {
        console.error("Error al cargar documentos", err)
        setError(err?.message ?? "No se pudieron cargar los documentos")
      } finally {
        setIsLoading(false)
      }
    }

    loadDocuments()
  }, [])

  const formatDate = (iso: string) => {
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
    if (!bytes || bytes <= 0) return "-"
    const mb = bytes / (1024 * 1024)
    if (mb < 1) {
      const kb = bytes / 1024
      return `${kb.toFixed(1)} KB`
    }
    return `${mb.toFixed(1)} MB`
  }

  const normalizeStatusLabel = (estado: string) => {
    if (!estado) return "-"
    const lower = estado.toLowerCase()
    if (lower === "activo") return "Activo"
    if (lower === "borrador") return "Borrador"
    if (lower === "revision" || lower === "revisión") return "Revisión"
    return estado
  }

  // 👇 función que llama al DELETE /api/documentos/[id]
  const handleConfirmDelete = async () => {
    if (!docToDelete) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/documentos/${docToDelete.idDocumento}`, {
        method: "DELETE",
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        toast({
          title: "No se pudo eliminar",
          description: data?.error ?? "Ocurrió un error al eliminar el documento.",
        })
        return
      }

      // actualizar lista local (quitamos el documento)
      setDocuments(prev =>
        prev.filter(d => d.idDocumento !== docToDelete.idDocumento)
      )

      toast({
        title: "Documento eliminado",
        description: data?.message ?? "El documento se ha marcado como eliminado.",
      })

      setConfirmOpen(false)
      setDocToDelete(null)
    } catch (err) {
      console.error("Error al eliminar documento", err)
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Organización</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">
                  Cargando documentos...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-red-500 py-6">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">
                  No hay documentos registrados.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !error &&
              documents.map((doc) => (
                <TableRow key={doc.idDocumento}>
                  <TableCell className="font-medium">{doc.nombreArchivo}</TableCell>
                  <TableCell>{doc.tipoArchivo}</TableCell>

                  <TableCell>-</TableCell>

                  <TableCell>{formatDate(doc.fechaSubida)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        normalizeStatusLabel(doc.estado) === "Activo" ? "default" : "secondary"
                      }
                    >
                      {normalizeStatusLabel(doc.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatSize(doc.tamanoBytes ?? null)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/documentos/${doc.idDocumento}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalle
                          </DropdownMenuItem>
                        </Link>

                        <a
                          href={`/api/documentos/${doc.idDocumento}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar / Ver
                          </DropdownMenuItem>
                        </a>

                        {/* 👇 aquí abrimos el diálogo de confirmación */}
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={(e) => {
                            e.preventDefault() // evita que se cierre raro el menú
                            setDocToDelete(doc)
                            setConfirmOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* 👇 AlertDialog global controlado por estado */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar documento</AlertDialogTitle>
            <AlertDialogDescription>
              {docToDelete
                ? `¿Estás seguro de que deseas eliminar el documento "${docToDelete.nombreArchivo}"?`
                : "¿Estás seguro de que deseas eliminar este documento?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Sí, eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  )
}
