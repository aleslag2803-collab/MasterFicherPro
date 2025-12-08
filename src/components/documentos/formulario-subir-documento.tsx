"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { useToast } from "@/src/hooks/use-toast"

export function UploadDocumentForm() {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [nombreDocumento, setNombreDocumento] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [organizacion, setOrganizacion] = useState("")
  const [descripcion, setDescripcion] = useState("")

  // Estados para auditoría
  const [esAuditoria, setEsAuditoria] = useState(false)
  const [auditoriaNombreProceso, setAuditoriaNombreProceso] = useState("")
  const [auditoriaUsuarioCreador, setAuditoriaUsuarioCreador] = useState("")
  const [auditoriaFechaLimite, setAuditoriaFechaLimite] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Archivo requerido",
        description: "Debes seleccionar un archivo",
      })
      return
    }

    // Validación básica de auditoría (solo UI)
    if (
      esAuditoria &&
      (!auditoriaNombreProceso ||
        !auditoriaUsuarioCreador ||
        !auditoriaFechaLimite)
    ) {
      toast({
        title: "Datos incompletos",
        description: "Completa todos los campos de la sección de auditoría",
      })
      return
    }

    setIsLoading(true)

    try {
      // 🔹 OJO: usa aquí el id del usuario logueado cuando tengas auth
      const idUsuarioPropietario = "061b75be-4f90-419f-9ead-506f0f6dbc30"

      const formData = new FormData()
      formData.append("file", file)
      formData.append("idUsuarioPropietario", idUsuarioPropietario)
      formData.append("estado", "ACTIVO")
      formData.append("version", "1.0")
      formData.append(
        "etiquetas",
        [tipoDocumento, organizacion].filter(Boolean).join(", "),
      )
      formData.append("resumen", descripcion || nombreDocumento)

      formData.append("esAuditoria", String(esAuditoria))
      if (esAuditoria) {
        formData.append("auditoriaNombreProceso", auditoriaNombreProceso)
        formData.append("auditoriaUsuarioCreador", auditoriaUsuarioCreador)
        formData.append("auditoriaFechaLimite", auditoriaFechaLimite)
      }

      // 1️⃣ Crear documento
      const res = await fetch("/api/documentos", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const backendMsg = data?.error ?? "Error al subir el documento"

        toast({
          title: "Error al subir",
          description: backendMsg,
        })
        return
      }

      const documento = await res.json()

      // 2️⃣ Si es auditoría, crear proceso llamando a /api/audit
      if (esAuditoria) {
        try {
          const auditRes = await fetch("/api/audit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              document_id: documento.idDocumento,          // viene del POST /api/documentos
              auditor_id: idUsuarioPropietario,           // por ahora usamos el mismo usuario
              name: auditoriaNombreProceso,               // nombre del proceso desde el form
              deadline: auditoriaFechaLimite,             // "YYYY-MM-DD"
            }),
          })

          if (!auditRes.ok) {
            const auditData = await auditRes.json().catch(() => ({}))
            const auditMsg =
              auditData?.error ?? "El documento se subió pero falló la auditoría"

            toast({
              title: "Proceso de auditoría",
              description: auditMsg,
            })
          } else {
            toast({
              title: "Documento y auditoría creados",
              description:
                "El documento se ha subido y el proceso de auditoría se creó correctamente.",
            })
          }
        } catch (err) {
          console.error("Error llamando a /api/audit", err)
          toast({
            title: "Proceso de auditoría",
            description:
              "El documento se subió, pero hubo un error al crear el proceso de auditoría.",
          })
        }
      } else {
        // ✅ Solo documento (sin auditoría)
        toast({
          title: "Documento subido",
          description: "El documento se ha subido correctamente.",
        })
      }

      router.push("/documentos")
    } catch (err) {
      console.error("Error al subir documento", err)
      toast({
        title: "Error de conexión",
        description: "Error de conexión al subir el documento",
      })
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
          {/* Archivo */}
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

          {/* Nombre */}
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

          {/* Tipo + Organización */}
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

          {/* Switch de auditoría */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div className="space-y-1">
              <Label htmlFor="esAuditoria">¿Es un documento para auditoría?</Label>
              <p className="text-xs text-muted-foreground">
                Activa esta opción si el documento forma parte de un proceso de
                auditoría.
              </p>
            </div>
            <Switch
              id="esAuditoria"
              checked={esAuditoria}
              onCheckedChange={setEsAuditoria}
            />
          </div>

          {/* Sección Auditoría condicional */}
          {esAuditoria && (
            <div className="space-y-4 rounded-md border bg-muted/40 p-4">
              <h3 className="text-sm font-medium">Auditoría</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="auditoriaNombreProceso">
                    Nombre del proceso
                  </Label>
                  <Input
                    id="auditoriaNombreProceso"
                    placeholder="Ej: Auditoría interna 2025"
                    value={auditoriaNombreProceso}
                    onChange={(e) => setAuditoriaNombreProceso(e.target.value)}
                    required={esAuditoria}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auditoriaUsuarioCreador">
                    Usuario que crea el proceso
                  </Label>
                  <Input
                    id="auditoriaUsuarioCreador"
                    placeholder="Ej: Juan Pérez"
                    value={auditoriaUsuarioCreador}
                    onChange={(e) =>
                      setAuditoriaUsuarioCreador(e.target.value)
                    }
                    required={esAuditoria}
                  />
                </div>
              </div>

              <div className="space-y-2 md:w-1/3">
                <Label htmlFor="auditoriaFechaLimite">
                  Fecha límite del proceso
                </Label>
                <Input
                  id="auditoriaFechaLimite"
                  type="date"
                  value={auditoriaFechaLimite}
                  onChange={(e) => setAuditoriaFechaLimite(e.target.value)}
                  required={esAuditoria}
                />
              </div>
            </div>
          )}

          {/* Descripción */}
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

          {/* Botones */}
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
