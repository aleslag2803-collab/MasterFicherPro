
"use client"

import { Search, Upload, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface DocumentsHeaderProps {
  onSearchChange: (term: string) => void
}

export function DocumentsHeader({ onSearchChange }: DocumentsHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Documentos</h2>
          <p className="text-muted-foreground">Gestiona todos los documentos del sistema</p>
        </div>
        <Link href="/documentos/subir">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Subir Documento
          </Button>
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Buscar documentos..." 
            className="pl-10"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>
    </div>
  )
}
