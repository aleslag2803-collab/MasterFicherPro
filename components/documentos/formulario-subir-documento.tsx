"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText } from "lucide-react"

export function UploadDocumentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement document upload
    setTimeout(() => {
      router.push("/dashboard/documentos")
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Documento</CardTitle>
        <CardDescription>Completa los detalles del documento que deseas subir</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Archivo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="flex-1"
                required
              />
              {fileName && (
                <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{fileName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Documento</Label>
            <Input id="name" placeholder="Ej: Contrato de Servicios 2025" required />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Documento</Label>
              <Select required>
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
              <Select required>
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
            <Textarea id="description" placeholder="Describe brevemente el contenido del documento..." rows={4} />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              {isLoading ? "Subiendo..." : "Subir Documento"}
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
