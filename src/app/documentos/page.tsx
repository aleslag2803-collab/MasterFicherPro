"use client"

import { useState } from "react"
import { DocumentsHeader } from "@/src/components/documentos/documentos-header"
import { DocumentsTable } from "@/src/components/documentos/documentos-table"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <DocumentsHeader onSearchChange={setSearchTerm} />
      <DocumentsTable searchTerm={searchTerm} />
    </div>
  )
}
