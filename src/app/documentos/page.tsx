import { DocumentsHeader } from "@/src/components/documentos/documentos-header";
import { DocumentsTable } from "@/src/components/documentos/documentos-table";


export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <DocumentsHeader />
      <DocumentsTable />
    </div>
  )
}
