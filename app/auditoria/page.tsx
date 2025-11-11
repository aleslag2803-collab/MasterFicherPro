"use client"

import { useState } from "react"
import AuditHeader from "@/components/auditoria/audit-header"
import AuditTable from "@/components/auditoria/audit-table"
import AuditFilters from "@/components/auditoria/audit-filters"

// Datos de ejemplo para auditoría
const MOCK_AUDIT_LOGS = [
  {
    id: 1,
    user: "Alessa Colorado",
    action: "Crear",
    resource: "Contrato de servicios",
    type: "Documento",
    timestamp: "2025-01-15 14:40",
    details: "Documento creado",
  },
  {
    id: 2,
    user: "Francisco Kantún",
    action: "Actualizar",
    resource: "Informe Financiero Q1",
    type: "Documento",
    timestamp: "2025-01-14 11:20",
    details: "Documento actualizado",
  },
  {
    id: 3,
    user: "Jose Quintal",
    action: "Ver",
    resource: "Documento Temporal",
    type: "Documento",
    timestamp: "2025-01-13 16:15",
    details: "Documento Eliminado",
  },
  {
    id: 4,
    user: "Diego Bacelis",
    action: "Eliminar",
    resource: "Tech Dept",
    type: "Organización",
    timestamp: "2025-01-12 11:10",
    details: "Documento Visualizado",
  },
]

export default function AuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLogs, setFilteredLogs] = useState(MOCK_AUDIT_LOGS)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = MOCK_AUDIT_LOGS.filter(
      (log) =>
        log.user.toLowerCase().includes(term.toLowerCase()) ||
        log.action.toLowerCase().includes(term.toLowerCase()) ||
        log.resource.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredLogs(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <AuditHeader />
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Auditoría</h1>
          <p className="text-muted-foreground">Registro de todas las acciones realizadas en el sistema</p>
        </div>

        <AuditFilters searchTerm={searchTerm} onSearch={handleSearch} logCount={filteredLogs.length} />

        <AuditTable logs={filteredLogs} />
      </div>
    </div>
  )
}
