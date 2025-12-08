"use client"

import Link from "next/link"
import { MoreVertical, Eye, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export interface AuditRow {
  id: string
  nombreProceso: string
  nombreDocumento: string
  estadoProceso: string
  fechaLimite: string | null
}

interface AuditTableProps {
  audits: AuditRow[]
  onDelete?: (id: string) => void
}

export default function AuditTable({ audits, onDelete }: AuditTableProps) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "en_proceso":
        return "bg-blue-100 text-blue-800"
      case "finalizado":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (iso: string | null) => {
    if (!iso) return "-"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "-"
    return d.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  if (!audits.length) {
    return (
      <div className="mt-4 text-sm text-muted-foreground">
        No hay procesos de auditoría registrados.
      </div>
    )
  }

  // 👇 Mismo formato que la tabla original (border-border, bg-card, text-foreground, etc.)
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left px-6 py-4 font-semibold text-foreground">
                Nombre del proceso
              </th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">
                Nombre del documento
              </th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">
                Estado del proceso
              </th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">
                Fecha límite
              </th>
              <th className="text-center px-6 py-4 font-semibold text-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit, index) => (
              <tr
                key={audit.id}
                className={index !== audits.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">
                    {audit.nombreProceso}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {audit.nombreDocumento}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                      audit.estadoProceso
                    )}`}
                  >
                    {audit.estadoProceso}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(audit.fechaLimite)}
                </td>
                <td className="px-6 py-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* Ver detalle */}
                      <Link href={`/auditoria/${audit.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                      </Link>

                      {/* Eliminar */}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete?.(audit.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
