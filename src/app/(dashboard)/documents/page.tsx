import { DocumentsTable } from "@/components/documents/documents-table"
import { DocumentsHeader } from "@/components/documents/documents-header"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <DocumentsHeader />
      <DocumentsTable />
    </div>
  )
}
