"use client"

import { useEffect, useState } from "react"
import AuditFilters from "@/src/components/auditoria/audit-filters"
import AuditTable, { AuditRow } from "@/src/components/auditoria/audit-table"

export default function AuditoriaPage() {
  const [audits, setAudits] = useState<AuditRow[]>([])
  const [filteredAudits, setFilteredAudits] = useState<AuditRow[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar procesos de auditoría desde el backend
  useEffect(() => {
    const loadAudits = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch("/api/audit")
        if (!res.ok) {
          throw new Error("No se pudieron obtener los procesos de auditoría")
        }

        const data = await res.json()

        const mapped: AuditRow[] = (data ?? []).map((item: any) => ({
          id: String(item.idProcesoAuditoria),
          nombreProceso:
            item.nombre ??
            (item.documento?.nombreArchivo
              ? `Auditoría de ${item.documento.nombreArchivo}`
              : "Proceso de auditoría"),
          nombreDocumento: item.documento?.nombreArchivo ?? "-",
          estadoProceso: item.estado,
          fechaLimite: item.fechaLimite ?? null,
        }))

        setAudits(mapped)
        setFilteredAudits(mapped)
      } catch (err: any) {
        console.error("Error al cargar procesos de auditoría", err)
        setError(err?.message ?? "Error desconocido al cargar auditorías")
      } finally {
        setIsLoading(false)
      }
    }

    loadAudits()
  }, [])

  // Búsqueda por nombre de proceso / documento / estado
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAudits(audits)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = audits.filter((audit) =>
      audit.nombreProceso.toLowerCase().includes(term) ||
      audit.nombreDocumento.toLowerCase().includes(term) ||
      audit.estadoProceso.toLowerCase().includes(term)
    )

    setFilteredAudits(filtered)
  }, [searchTerm, audits])

  const handleDelete = (id: string) => {
    // Aquí luego puedes abrir un modal de confirmación y hacer DELETE /api/audit/[id]
    console.log("Eliminar proceso de auditoría", id)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Auditoría</h1>
        <p className="text-sm text-muted-foreground">
          Registro de todos los procesos de auditoría configurados en el sistema.
        </p>
      </div>

      <AuditFilters
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        logCount={filteredAudits.length}
      />

      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Cargando procesos de auditoría...
        </p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-red-500">
          Error al cargar los procesos de auditoría: {error}
        </p>
      )}

      {!isLoading && !error && (
        <AuditTable audits={filteredAudits} onDelete={handleDelete} />
      )}
    </div>
  )
}
