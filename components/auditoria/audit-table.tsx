"use client"

import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuditLog {
  id: number
  user: string
  action: string
  resource: string
  type: string
  timestamp: string
  details: string
}

interface AuditTableProps {
  logs: AuditLog[]
}

export default function AuditTable({ logs }: AuditTableProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "Crear":
        return "bg-blue-100 text-blue-800"
      case "Actualizar":
        return "bg-green-100 text-green-800"
      case "Ver":
        return "bg-gray-100 text-gray-800"
      case "Eliminar":
        return "bg-red-100 text-red-800"
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
              <th className="text-left px-6 py-4 font-semibold text-foreground">Acción</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Recurso</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Tipo</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Fecha y Hora</th>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Detalles</th>
              <th className="text-center px-6 py-4 font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id} className={index !== logs.length - 1 ? "border-b border-border" : ""}>
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{log.user}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{log.resource}</td>
                <td className="px-6 py-4 text-sm text-foreground">{log.type}</td>
                <td className="px-6 py-4 text-sm text-foreground">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm text-foreground">{log.details}</td>
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
