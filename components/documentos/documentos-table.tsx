"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Download, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const documents = [
  {
    id: "1",
    name: "Contrato de Servicios 2025",
    type: "Contrato",
    organization: "Acme Corp",
    uploadDate: "2025-01-15",
    status: "Activo",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Informe Financiero Q1",
    type: "Informe",
    organization: "Finance Dept",
    uploadDate: "2025-01-14",
    status: "Revisión",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Política de Privacidad",
    type: "Política",
    organization: "Legal Dept",
    uploadDate: "2025-01-13",
    status: "Activo",
    size: "856 KB",
  },
  {
    id: "4",
    name: "Manual de Usuario v2.0",
    type: "Manual",
    organization: "Tech Dept",
    uploadDate: "2025-01-12",
    status: "Borrador",
    size: "3.2 MB",
  },
  {
    id: "5",
    name: "Acuerdo de Confidencialidad",
    type: "Contrato",
    organization: "HR Dept",
    uploadDate: "2025-01-11",
    status: "Activo",
    size: "1.2 MB",
  },
]

export function DocumentsTable() {
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
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.organization}</TableCell>
              <TableCell>{doc.uploadDate}</TableCell>
              <TableCell>
                <Badge variant={doc.status === "Activo" ? "default" : "secondary"}>{doc.status}</Badge>
              </TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/dashboard/documentos/${doc.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalle
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </DropdownMenuItem>
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
