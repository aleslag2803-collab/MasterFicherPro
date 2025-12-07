"use client"

import { useEffect, useState } from "react"
import AuditFilters from "@/src/components/auditoria/audit-filters"
import AuditTable, { AuditLog } from "@/src/components/auditoria/audit-table"

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await fetch("/api/historial")

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error ?? "Error al cargar el historial de acciones")
        }

        const data = (await res.json()) as AuditLog[]
        setLogs(data)
        setFilteredLogs(data)
      } catch (err: any) {
        console.error("Error al cargar el historial de acciones", err)
        setError(err?.message ?? "No se pudo cargar el historial de acciones")
      } finally {
        setIsLoading(false)
      }
    }

    loadLogs()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const lower = term.toLowerCase()

    const filtered = logs.filter((log) =>
      [log.user, log.action, log.resource, log.type, log.details]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(lower))
    )

    setFilteredLogs(filtered)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado igual que Documentos */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Auditoría</h2>
        <p className="text-muted-foreground">
          Registro de todas las acciones realizadas en el sistema
        </p>
      </div>

      {/* Filtros / buscador */}
      <AuditFilters
        searchTerm={searchTerm}
        onSearch={handleSearch}
        logCount={filteredLogs.length}
      />

      {/* Estados */}
      {isLoading && (
        <p className="text-sm text-muted-foreground">Cargando registros de auditoría...</p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-red-500">
          Error al cargar los registros de auditoría: {error}
        </p>
      )}

      {/* Tabla con datos reales */}
      {!isLoading && !error && <AuditTable logs={filteredLogs} />}
    </div>
  )
}
