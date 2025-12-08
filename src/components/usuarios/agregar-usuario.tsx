"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog"

interface CreateUserModalProps {
  open: boolean
  onClose: () => void
  onCreate: (user: any) => void
}

export default function CreateUserModal({ open, onClose, onCreate }: CreateUserModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("usuario")
  const [active, setActive] = useState("si")

  const handleSubmit = () => {
    if (!name || !email) return alert("Todos los campos son obligatorios")

    onCreate({ name, email, role, active })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo usuario</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <Label>Rol</Label>
            <select
              className="border rounded-md p-2 w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Administrador</option>
              <option value="usuario">Lector</option>
            </select>
          </div>

          <div>
            <Label>Estado</Label>
            <select
              className="border rounded-md p-2 w-full"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="si">Activo</option>
              <option value="no">Inactivo</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button className="bg-black text-white" onClick={handleSubmit}>Crear usuario</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
