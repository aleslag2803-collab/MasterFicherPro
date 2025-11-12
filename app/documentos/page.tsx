import { DocumentsTable } from "@/components/documentos/documentos-table"
import { DocumentsHeader } from "@/components/documentos/documentos-header"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <DocumentsHeader />
      <DocumentsTable />
    </div>
  )
}
