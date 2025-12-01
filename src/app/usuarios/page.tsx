"use client"


import UserFilters from "@/src/components/usuarios/users-filters"
import UsersHeader from "@/src/components/usuarios/users-header"
import UsersTable from "@/src/components/usuarios/users-table"
import { useState, useEffect } from "react"

interface Usuario {
  idUsuario: string
  nombre: string
  correo: string
  rol: string
  estado: boolean      // 👈 en Prisma es Boolean
  fechaRegistro: string // llega como string del JSON
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Obtener usuarios desde la API (que ya usa controller + service)
  useEffect(() => {
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("/api/usuarios", {
        method: "GET",
        cache: "no-store",
      })
      if (!res.ok) throw new Error("Error al cargar usuarios")
      const data = await res.json()
      console.log("USUARIOS DESDE API", data) // 👈 añade esto
      setUsuarios(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchUsuarios()
}, [])


  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = usuarios.filter(
      (user) =>
        user.nombre.toLowerCase().includes(term.toLowerCase()) ||
        user.correo.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Cargando usuarios...
      </div>
    )
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

        <UsersTable
          users={filteredUsers.map((u) => ({
            idUsuario: u.idUsuario,
            initials: u.nombre
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase(),
            name: u.nombre,
            email: u.correo,
            role: u.rol,
            status: u.estado ? "Activo" : "Inactivo",
            lastAccess: new Date(u.fechaRegistro).toLocaleString(),
          }))}
        />
      </div>
    </div>
  )
}
