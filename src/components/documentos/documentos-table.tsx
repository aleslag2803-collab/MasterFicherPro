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

type Documento = {
  idDocumento: string
  nombreArchivo: string
  tipoArchivo: string
  fechaSubida: string // viene como string de la API (ISO)
  estado: string
  tamanoBytes?: number | null
  // puedes agregar más campos si los necesitas después
}

export function DocumentsTable() {
  const [documents, setDocuments] = useState<Documento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    // por si en la BD tienes "activo", "borrador", etc.
    if (!estado) return "-"
    const lower = estado.toLowerCase()
    if (lower === "activo") return "Activo"
    if (lower === "borrador") return "Borrador"
    if (lower === "revision" || lower === "revisión") return "Revisión"
    return estado
  }

  return (
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

                {/* Por ahora la organización no está en el modelo Documentos directamente,
                    puedes dejar "-" o luego mapearla desde tu tabla Organizacion */}
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
                      {/* Ver detalle en página /documentos/[idDocumento] */}
                      <Link href={`/documentos/${doc.idDocumento}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalle
                        </DropdownMenuItem>
                      </Link>

                      {/* Descargar / ver PDF directamente desde el endpoint BLOB */}
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

                      <DropdownMenuItem className="text-destructive">
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
  )
}
