"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

export function UploadDocumentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [nombreDocumento, setNombreDocumento] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [organizacion, setOrganizacion] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!file) {
      setError("Debes seleccionar un archivo")
      return
    }

    setIsLoading(true)

    try {

      const idUsuarioPropietario = "10ed8a97-ee90-4339-81c6-1e079273a0e1"

      const formData = new FormData()
      formData.append("file", file)
      formData.append("idUsuarioPropietario", idUsuarioPropietario)
      formData.append("estado", "ACTIVO")
      formData.append("version", "1.0")
      formData.append(
        "etiquetas",
        [tipoDocumento, organizacion].filter(Boolean).join(", ")
      )
      formData.append("resumen", descripcion || nombreDocumento)

      const res = await fetch("/api/documentos", {
        method: "POST",
        body: formData,
      })

      

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? "Error al subir el documento")
      }

      router.push("/documentos")
    } catch (err: any) {
      console.error("Error al subir documento", err)
      setError(err?.message ?? "Ocurrió un error al subir el documento")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Documento</CardTitle>
        <CardDescription>
          Completa los detalles del documento que deseas subir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Archivo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null
                  setFile(f)
                  setFileName(f?.name || "")
                }}
                className="flex-1"
                required
              />
              {fileName && (
                <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {fileName}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Documento</Label>
            <Input
              id="name"
              placeholder="Ej: Contrato de Servicios 2025"
              value={nombreDocumento}
              onChange={(e) => setNombreDocumento(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Documento</Label>
              <Select
                value={tipoDocumento}
                onValueChange={(value) => setTipoDocumento(value)}
                required
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contrato">Contrato</SelectItem>
                  <SelectItem value="informe">Informe</SelectItem>
                  <SelectItem value="politica">Política</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organización</Label>
              <Select
                value={organizacion}
                onValueChange={(value) => setOrganizacion(value)}
                required
              >
                <SelectTrigger id="organization">
                  <SelectValue placeholder="Seleccionar organización" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="finance">Finance Dept</SelectItem>
                  <SelectItem value="legal">Legal Dept</SelectItem>
                  <SelectItem value="tech">Tech Dept</SelectItem>
                  <SelectItem value="hr">HR Dept</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe brevemente el contenido del documento..."
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              {isLoading ? "Subiendo..." : "Subir Documento"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
