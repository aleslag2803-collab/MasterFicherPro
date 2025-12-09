"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Building } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

export function NewOrganizationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [nombreCarpeta, setNombreCarpeta] = useState("")
  const [nivelJerarquico, setNivelJerarquico] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre es obligatorio")
      setIsLoading(false)
      return
    }

    if (!nombreCarpeta.trim()) {
      setError("El nombre de la carpeta es obligatorio")
      setIsLoading(false)
      return
    }

    const usuarioRaw = sessionStorage.getItem("usuario")
    if (!usuarioRaw) {
      setError("No hay usuario autenticado")
      setIsLoading(false)
      return
    }

    try {
      const usuario = JSON.parse(usuarioRaw)

      const res = await fetch("/api/organizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: usuario.idUsuario,
          nombre: nombre.trim(),
          descripcion: descripcion || undefined,
          emailContacto: email || undefined,
          telefono: telefono || undefined,
          direccion: direccion || undefined,
          nombreCarpeta: nombreCarpeta.trim(),
          nivelJerarquico,
          padreId: null,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Error al crear la organización")
      }

      router.push("/organizaciones")
    } catch (err: any) {
      setError(err.message || "Error al crear la organización")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Organización</CardTitle>
        <CardDescription>
          Completa los detalles de la nueva organización
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Organización *</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Ej: Acme Corp"
                className="pl-10"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          {/* Nombre Carpeta */}
          <div className="space-y-2">
            <Label htmlFor="folder">Nombre de Carpeta *</Label>
            <Input
              id="folder"
              placeholder="Ej: acme_corp"
              required
              value={nombreCarpeta}
              onChange={(e) => setNombreCarpeta(e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe la organización..."
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {/* Nivel Jerárquico */}
          <div className="space-y-2">
            <Label htmlFor="level">Nivel Jerárquico *</Label>
            <Input
              id="level"
              type="number"
              min="1"
              max="10"
              value={nivelJerarquico}
              onChange={(e) => setNivelJerarquico(parseInt(e.target.value) || 1)}
            />
          </div>

          {/* Email / Teléfono */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email de Contacto</Label>
              <Input
                id="email"
                type="email"
                placeholder="contacto@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              placeholder="Calle Principal 123, Ciudad"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Creando..." : "Crear Organización"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
