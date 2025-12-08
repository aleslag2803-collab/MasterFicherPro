"use client"

import { useState } from "react"
import { Mail, MoreVertical, Trash2, UserCog, CheckCircle, XCircle } from "lucide-react"
import { Button } from "../ui/button"

interface User {
  idUsuario: string
  initials: string
  name: string
  email: string
  role: string
  status: string
  lastAccess: string
}

interface UsersTableProps {
  users: User[]
}

export default function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [showStatusSubmenu, setShowStatusSubmenu] = useState<string | null>(null)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador":
        return "bg-blue-100 text-blue-800"
      case "Editor":
        return "bg-green-100 text-green-800"
      case "Visor":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    if (status === "Activo") {
      return "bg-green-100 text-green-800"
    } else if (status === "Inactivo") {
      return "bg-red-100 text-red-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  // Función para eliminar usuario
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`¿Estás seguro de eliminar al usuario "${userName}"?`)) {
      return
    }

    setLoadingId(userId)
    setOpenMenuId(null)
    setShowStatusSubmenu(null)
    
    try {
      const response = await fetch(`/api/usuarios/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUsers(users.filter(user => user.idUsuario !== userId))
        alert(`Usuario "${userName}" eliminado correctamente`)
      } else {
        alert("Error al eliminar el usuario")
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      alert("Error al eliminar el usuario")
    } finally {
      setLoadingId(null)
    }
  }

  // Función para cambiar estado del usuario
  const handleStatusChange = async (userId: string, newStatus: "Activo" | "Inactivo") => {
    setLoadingId(userId)
    setOpenMenuId(null)
    setShowStatusSubmenu(null)
    
    try {
      const user = users.find(u => u.idUsuario === userId)
      if (!user) return

      const response = await fetch(`/api/usuarios/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setUsers(users.map(user => 
          user.idUsuario === userId 
            ? { ...user, status: newStatus } 
            : user
        ))
        alert(`Usuario ${newStatus === "Activo" ? "activado" : "desactivado"} correctamente`)
      } else {
        alert("Error al cambiar el estado")
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error)
      alert("Error al cambiar el estado")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left px-6 py-4 font-semibold text-foreground">Usuario</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Email</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Rol</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Estado</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Último acceso</th>
              <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.idUsuario || index} 
                className={index !== users.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.initials}
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{user.lastAccess}</td>
                <td className="px-6 py-4 text-center">
                  <div className="relative inline-block">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setOpenMenuId(openMenuId === user.idUsuario ? null : user.idUsuario)
                        setShowStatusSubmenu(null)
                      }}
                      disabled={loadingId === user.idUsuario}
                    >
                      {loadingId === user.idUsuario ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <MoreVertical className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Menú desplegable principal */}
                    {openMenuId === user.idUsuario && (
                      <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        {/* Opción Cambiar Estado con submenú */}
                        <div className="relative">
                          <button
                            onClick={() => setShowStatusSubmenu(showStatusSubmenu === user.idUsuario ? null : user.idUsuario)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center justify-between border-b border-gray-100"
                            disabled={loadingId === user.idUsuario}
                          >
                            <div className="flex items-center gap-2">
                              <UserCog className="h-4 w-4" />
                              <span>Cambiar estado</span>
                            </div>
                            <span className="text-gray-400">▶</span>
                          </button>

                          {/* Submenú de estados */}
                          {showStatusSubmenu === user.idUsuario && (
                            <div className="absolute left-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                              <button
                                onClick={() => handleStatusChange(user.idUsuario, "Activo")}
                                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-2 border-b border-gray-100"
                                disabled={loadingId === user.idUsuario}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Activar usuario</span>
                                {user.status === "Activo" && (
                                  <span className="ml-auto text-xs text-green-600">✓ Actual</span>
                                )}
                              </button>
                              <button
                                onClick={() => handleStatusChange(user.idUsuario, "Inactivo")}
                                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-2"
                                disabled={loadingId === user.idUsuario}
                              >
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span>Desactivar usuario</span>
                                {user.status === "Inactivo" && (
                                  <span className="ml-auto text-xs text-red-600">✓ Actual</span>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Opción Eliminar */}
                        <button
                          onClick={() => handleDeleteUser(user.idUsuario, user.name)}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          disabled={loadingId === user.idUsuario}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Eliminar usuario</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay para cerrar menú al hacer clic fuera */}
                  {openMenuId === user.idUsuario && (
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => {
                        setOpenMenuId(null)
                        setShowStatusSubmenu(null)
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
