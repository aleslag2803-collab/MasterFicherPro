"use client"

import { useEffect, useState } from "react"
import { Building, FileText, MoreVertical, Users, Edit, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useEliminarOrganizacion } from "./BotonEliminar"
import EditOrganizacionModal from "./editar-organizacion"


interface Organizacion {
  idOrganizacion: string
  idUsuario: string
  nombre: string
  descripcion: string | null
  emailContacto: string | null
  telefono: string | null
  direccion: string | null
  nombreCarpeta: string
  nivelJerarquico: number
  padreId: string | null
  fechaCreacion: string
  _count?: {
    documentos?: number
    hijos?: number
  }
}

interface OrganizationsGridProps {
  searchTerm?: string
  onRefresh?: () => void
}

export function OrganizationsGrid({ searchTerm = "", onRefresh }: OrganizationsGridProps) {
  const [organizations, setOrganizations] = useState<Organizacion[]>([])
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organizacion[]>([])
  const [loading, setLoading] = useState(true)
  const [editingOrg, setEditingOrg] = useState<Organizacion | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const eliminar = useEliminarOrganizacion()

  useEffect(() => {
    cargarOrganizaciones()
  }, [])

  useEffect(() => {
    // Filtrar organizaciones por nombre o descripción
    const filtered = organizations.filter(
      (org) =>
        org.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredOrganizations(filtered)
  }, [searchTerm, organizations])

  async function cargarOrganizaciones() {
    try {
      setLoading(true)
      const res = await fetch("/api/organizacion")
      if (!res.ok) throw new Error("Error cargando organizaciones")

      const data = await res.json()
      setOrganizations(data)
      setFilteredOrganizations(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (org: Organizacion) => {
    setEditingOrg(org)
    setEditModalOpen(true)
  }

  const handleUpdate = async (id: string, updateData: any) => {
    try {
      const res = await fetch(`/api/organizacion/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      const updated = await res.json()
      setOrganizations(organizations.map((o) => (o.idOrganizacion === id ? updated : o)))
      setEditModalOpen(false)
      return true
    } catch (error: any) {
      console.error(error)
      return false
    }
  }

  const handleDelete = async (org: Organizacion) => {
    setDeleting(org.idOrganizacion)
    const ok = await eliminar(org.idOrganizacion)
    if (ok) {
      setOrganizations((prev) => prev.filter((o) => o.idOrganizacion !== org.idOrganizacion))
    }
    setDeleting(null)
  }

  if (loading) return <p className="text-center text-muted-foreground">Cargando organizaciones...</p>

  if (filteredOrganizations.length === 0) {
    return (
      <div className="text-center py-10">
        <Building className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          {searchTerm ? "No se encontraron organizaciones" : "No hay organizaciones creadas"}
        </p>
      </div>
    )
  }

  return (
    <>
      <EditOrganizacionModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          setEditingOrg(null)
        }}
        organizacion={editingOrg}
        onUpdate={handleUpdate}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrganizations.map((org) => (
          <Card key={org.idOrganizacion} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Building className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{org.nombre}</CardTitle>
                    <CardDescription className="text-xs">
                      {org.descripcion || "Sin descripción"}
                    </CardDescription>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={deleting === org.idOrganizacion}>
                      {deleting === org.idOrganizacion ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <MoreVertical className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(org)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(org)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Sub-Orgs: {org._count?.hijos || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Docs: {org._count?.documentos || 0}</span>
                </div>
              </div>

              {org.emailContacto && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Email: </span>
                  <span className="text-foreground">{org.emailContacto}</span>
                </div>
              )}

              {org.telefono && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Tel: </span>
                  <span className="text-foreground">{org.telefono}</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <Badge variant="outline" className="text-xs">
                  Nivel {org.nivelJerarquico}
                </Badge>
                {org.padreId && <Badge variant="secondary" className="text-xs">Sub-org</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

