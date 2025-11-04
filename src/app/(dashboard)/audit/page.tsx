import { AuditTable } from "@/components/audit/audit-table"
import { AuditFilters } from "@/components/audit/audit-filters"

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Auditoría</h2>
        <p className="text-muted-foreground">Registro de todas las acciones realizadas en el sistema</p>
      </div>
      <AuditFilters />
      <AuditTable />
    </div>
  )
}
