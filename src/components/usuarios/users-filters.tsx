"use client"


import { Search, Filter } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import CreateUserModal from "./agregar-usuario"

interface UserFiltersProps {
  searchTerm: string
  onSearch: (term: string) => void
  userCount: number
  onCreateUser: (user: any) => void
}

export default function UserFilters({ searchTerm, onSearch, userCount, onCreateUser }: UserFiltersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <CreateUserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreateUser}
      />

      <div className="mb-6 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar usuarios...."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>

          <Button
            className="bg-black hover:bg-gray-800 text-white gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg">+</span>
            Nuevo Usuario
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {userCount} usuario{userCount !== 1 ? "s" : ""} encontrado{userCount !== 1 ? "s" : ""}
        </div>
      </div>
    </>
  )
}
