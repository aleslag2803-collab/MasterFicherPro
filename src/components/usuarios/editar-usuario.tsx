"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog"

interface Usuario {
  idUsuario: string
  nombre: string
  correo: string
  rol: string
  estado: boolean
}

interface EditUserModalProps {
  open: boolean
  onClose: () => void
  usuario: Usuario 
  onUpdate: (id: string, data: any) => Promise<boolean>
}

export default function EditUserModal({ open, onClose, usuario, onUpdate }: EditUserModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("usuario")
  const [active, setActive] = useState("si")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (usuario && open) {
      setName(usuario.nombre)
      setEmail(usuario.correo)
      setRole(usuario.rol || "usuario")
      setActive(usuario.estado ? "si" : "no")
      setPassword("")
      setError("")
    }
  }, [usuario, open])

  const handleSubmit = async () => {
    setError("")

    if (!name || !email) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (password && password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const updateData: any = {
        nombre: name,
        correo: email,
        rol: role,
        estado: active === "si",
      }

      if (password) {
        updateData.passwordHash = password
      }

      const success = await onUpdate(usuario!.idUsuario, updateData)

      if (success) {
        onClose()
      }
    } catch (err: any) {
      setError(err.message || "Error al actualizar el usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Perez" />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
            />
          </div>

          

          <div>
            <Label>Rol</Label>
            <select className="border rounded-md p-2 w-full" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="usuario">Lector</option>
            </select>
          </div>

          {/* Solo renderizamos el modal si tenemos un usuario mapeado <div>
            <Label>Estado</Label>
            <select className="border rounded-md p-2 w-full" value={active} onChange={(e) => setActive(e.target.value)}>
              <option value="si">Activo</option>
              <option value="no">Inactivo</option>
            </select>
          </div> */}

          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button className="bg-black text-white" onClick={handleSubmit} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
