import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Upload, Edit, Trash2, Eye } from "lucide-react"

const auditLogs = [
  {
    id: "1",
    user: "Juan Pérez",
    action: "Crear",
    resource: "Contrato de Servicios 2025",
    resourceType: "Documento",
    timestamp: "2025-01-15 14:30:25",
    details: "Documento creado exitosamente",
    icon: Upload,
  },
  {
    id: "2",
    user: "María García",
    action: "Actualizar",
    resource: "Informe Financiero Q1",
    resourceType: "Documento",
    timestamp: "2025-01-15 13:15:10",
    details: "Documento actualizado",
    icon: Edit,
  },
  {
    id: "3",
    user: "Carlos López",
    action: "Ver",
    resource: "Política de Privacidad",
    resourceType: "Documento",
    timestamp: "2025-01-15 12:45:33",
    details: "Documento visualizado",
    icon: Eye,
  },
  {
    id: "4",
    user: "Juan Pérez",
    action: "Eliminar",
    resource: "Documento Temporal",
    resourceType: "Documento",
    timestamp: "2025-01-15 11:20:15",
    details: "Documento eliminado",
    icon: Trash2,
  },
  {
    id: "5",
    user: "María García",
    action: "Crear",
    resource: "Tech Dept",
    resourceType: "Organización",
    timestamp: "2025-01-15 10:05:42",
    details: "Organización creada",
    icon: Upload,
  },
  {
    id: "6",
    user: "Carlos López",
    action: "Actualizar",
    resource: "Manual de Usuario v2.0",
    resourceType: "Documento",
    timestamp: "2025-01-15 09:30:18",
    details: "Documento actualizado",
    icon: Edit,
  },
  {
    id: "7",
    user: "Juan Pérez",
    action: "Ver",
    resource: "Acuerdo de Confidencialidad",
    resourceType: "Documento",
    timestamp: "2025-01-14 16:45:55",
    details: "Documento visualizado",
    icon: Eye,
  },
]

const actionColors: Record<string, string> = {
  Crear: "default",
  Actualizar: "secondary",
  Ver: "outline",
  Eliminar: "destructive",
}

export function AuditTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Acción</TableHead>
            <TableHead>Recurso</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.user}</TableCell>
              <TableCell>
                <Badge variant={actionColors[log.action] as any}>{log.action}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <log.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{log.resource}</span>
                </div>
              </TableCell>
              <TableCell>{log.resourceType}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
