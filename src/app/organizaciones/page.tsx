"use client"

import { OrganizationsGrid } from "@/src/components/organizaciones/organizations-grid"
import { OrganizationsHeader } from "@/src/components/organizaciones/organizations-header"
import { useState } from "react"

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <OrganizationsHeader onSearch={setSearchTerm} />
      <OrganizationsGrid searchTerm={searchTerm} />
    </div>
  )
}
