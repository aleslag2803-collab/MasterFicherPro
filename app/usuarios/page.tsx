"use client"

import { useState } from "react"
import UsersHeader from "@/components/usuarios/users-header"
import UserFilters from "@/components/usuarios/users-filters"
import UsersTable from "@/components/usuarios/users-table"

// Datos de ejemplo
const MOCK_USERS = [
  {
    id: 1,
    initials: "AC",
    name: "Alessa Colorado",
    email: "alessa.co@ejemplo.com",
    role: "Administrador",
    status: "Activo",
    lastAccess: "2025-10-19 9:15",
  },
  {
    id: 2,
    initials: "FK",
    name: "Francisco Kantún",
    email: "francis.kant@ejemplo.com",
    role: "Editor",
    status: "Activo",
    lastAccess: "2025-10-19 12:08",
  },
  {
    id: 3,
    initials: "JQ",
    name: "Jose Quintal",
    email: "jose.quintal@ejemplo.com",
    role: "Visor",
    status: "Activo",
    lastAccess: "2025-10-19 18:00",
  },
  {
    id: 4,
    initials: "DB",
    name: "Diego Bacelis",
    email: "diego.bace@ejemplo.com",
    role: "Editor",
    status: "Activo",
    lastAccess: "2025-10-19 15:40",
  },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = MOCK_USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) || user.email.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <UsersHeader />
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Usuarios</h1>
          <p className="text-muted-foreground">Administra los usuarios del sistema</p>
        </div>

        <UserFilters 
          searchTerm={searchTerm} 
          onSearch={handleSearch} 
          userCount={filteredUsers.length} 
        />

        <UsersTable users={filteredUsers} />
      </div>
    </div>
  )
}
