"use client"

import { Mail, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface User {
  id: number
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

export default function UsersTable({ users }: UsersTableProps) {
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
              <tr key={user.id} className={index !== users.length - 1 ? "border-b border-border" : ""}>
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
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{user.lastAccess}</td>
                <td className="px-6 py-4 text-center">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
