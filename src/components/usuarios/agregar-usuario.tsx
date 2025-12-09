"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../ui/dialog"
import { useToast } from "@/src/hooks/use-toast"

interface CreateUserModalProps {
  open: boolean
  onClose: () => void
  onCreate: (user: any) => void
}

export default function CreateUserModal({ open, onClose, onCreate }: CreateUserModalProps) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("lector")
  const [active, setActive] = useState("si")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setError("")

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios")
      toast({
        title: "Campos incompletos",
        description: "Todos los campos son obligatorios.",
      })
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      toast({
        title: "Contraseña inválida",
        description: "La contraseña debe tener al menos 6 caracteres.",
      })
      return
    }

    setLoading(true)

    try {
      const success = await onCreate({
        name,
        email,
        passwordHash: password,
        role: role === "administrador" ? "administrador" : "lector",
        active: active === "si",
      })

      if (success) {
        setName("")
        setEmail("")
        setPassword("")
        setRole("lector")
        setActive("si")
        onClose()
        toast({
          title: "Usuario creado",
          description: "El usuario se ha creado correctamente.",
        })
            try {
              const createdUser = typeof success === "object" ? success : {
                nombre: name,
                correo: email,
                rol: role === "administrador" ? "Administrador" : "Lector",
                estado: active === "si",
              }
              // emitir evento global para que tablas/listados se actualicen
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("usuarios:created", { detail: createdUser }))
              }
            } catch (e) {
              // no bloquear si falla el dispatch
              console.error("Error dispatching usuarios:created event", e)
            }
      } else {
        toast({
          title: "No se pudo crear",
          description: "Ocurrió un problema al crear el usuario.",
        })
      }
    } catch (err: any) {
      setError(err.message || "Error al crear el usuario")
      console.error("Error al crear usuario", err)
      toast({
        title: "Error al crear usuario",
        description: err?.message || "Ocurrió un error al crear el usuario.",
      })
    } finally {
      setLoading(false)
    }
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
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Perez"
            />
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
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label>Rol</Label>
            <select
              className="border rounded-md p-2 w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="administrador">Administrador</option>
              <option value="lector">Lector</option>
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

          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button className="bg-black text-white" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creando..." : "Crear usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}