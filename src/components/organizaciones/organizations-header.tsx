"use client"

import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"

interface OrganizationsHeaderProps {
  onSearch?: (term: string) => void
}

export function OrganizationsHeader({ onSearch }: OrganizationsHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Organizaciones</h2>
          <p className="text-muted-foreground">Gestiona las organizaciones del sistema</p>
        </div>
        <Link href="/organizaciones/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Organización
          </Button>
        </Link>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar organizaciones..."
          className="pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}
