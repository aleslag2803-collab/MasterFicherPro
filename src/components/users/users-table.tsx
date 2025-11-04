import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreVertical, Mail, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

const users = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    role: "Administrador",
    status: "Activo",
    lastLogin: "2025-01-15 14:30",
    initials: "JP",
  },
  {
    id: "2",
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    role: "Editor",
    status: "Activo",
    lastLogin: "2025-01-15 13:15",
    initials: "MG",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    role: "Visor",
    status: "Activo",
    lastLogin: "2025-01-15 12:45",
    initials: "CL",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    role: "Editor",
    status: "Activo",
    lastLogin: "2025-01-14 16:20",
    initials: "AM",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@ejemplo.com",
    role: "Visor",
    status: "Inactivo",
    lastLogin: "2025-01-10 09:15",
    initials: "PS",
  },
]

const roleColors: Record<string, string> = {
  Administrador: "default",
  Editor: "secondary",
  Visor: "outline",
}

export function UsersTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Último Acceso</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={roleColors[user.role] as any}>{user.role}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Cambiar Rol</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Desactivar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
