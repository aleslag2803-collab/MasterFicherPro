"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog"

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
}

interface EditOrganizacionModalProps {
  open: boolean
  onClose: () => void
  organizacion: Organizacion | null
  onUpdate: (id: string, data: any) => Promise<boolean>
}

export default function EditOrganizacionModal({
  open,
  onClose,
  organizacion,
  onUpdate,
}: EditOrganizacionModalProps) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [nombreCarpeta, setNombreCarpeta] = useState("")
  const [nivelJerarquico, setNivelJerarquico] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (organizacion && open) {
      setNombre(organizacion.nombre)
      setDescripcion(organizacion.descripcion || "")
      setEmail(organizacion.emailContacto || "")
      setTelefono(organizacion.telefono || "")
      setDireccion(organizacion.direccion || "")
      setNombreCarpeta(organizacion.nombreCarpeta)
      setNivelJerarquico(organizacion.nivelJerarquico)
      setError("")
    }
  }, [organizacion, open])

  const handleSubmit = async () => {
    setError("")

    if (!nombre.trim()) {
      setError("El nombre es obligatorio")
      return
    }

    if (!nombreCarpeta.trim()) {
      setError("El nombre de la carpeta es obligatorio")
      return
    }

    setLoading(true)

    try {
      const updateData = {
        nombre: nombre.trim(),
        descripcion: descripcion || null,
        emailContacto: email || null,
        telefono: telefono || null,
        direccion: direccion || null,
        nombreCarpeta: nombreCarpeta.trim(),
        nivelJerarquico,
      }

      const success = await onUpdate(organizacion!.idOrganizacion, updateData)

      if (success) {
        onClose()
      }
    } catch (err: any) {
      setError(err.message || "Error al actualizar la organización")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Organización</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">{error}</div>}

          <div>
            <Label>Nombre *</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de la organización" />
          </div>

          <div>
            <Label>Nombre de Carpeta *</Label>
            <Input
              value={nombreCarpeta}
              onChange={(e) => setNombreCarpeta(e.target.value)}
              placeholder="Nombre de carpeta"
            />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              rows={3}
            />
          </div>

          <div>
            <Label>Nivel Jerárquico</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={nivelJerarquico}
              onChange={(e) => setNivelJerarquico(parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
            </div>
          </div>

          <div>
            <Label>Dirección</Label>
            <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" />
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
