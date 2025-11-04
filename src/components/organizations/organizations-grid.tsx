import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, FileText, Users, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const organizations = [
  {
    id: "1",
    name: "Acme Corp",
    description: "Corporación principal de servicios",
    documents: 450,
    members: 25,
    status: "Activa",
  },
  {
    id: "2",
    name: "Finance Dept",
    description: "Departamento de finanzas",
    documents: 320,
    members: 12,
    status: "Activa",
  },
  {
    id: "3",
    name: "Legal Dept",
    description: "Departamento legal",
    documents: 180,
    members: 8,
    status: "Activa",
  },
  {
    id: "4",
    name: "Tech Dept",
    description: "Departamento de tecnología",
    documents: 150,
    members: 18,
    status: "Activa",
  },
  {
    id: "5",
    name: "HR Dept",
    description: "Recursos humanos",
    documents: 134,
    members: 6,
    status: "Activa",
  },
  {
    id: "6",
    name: "Marketing Dept",
    description: "Departamento de marketing",
    documents: 98,
    members: 10,
    status: "Inactiva",
  },
]

export function OrganizationsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <Card key={org.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                  <CardDescription className="text-xs">{org.description}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Documentos</span>
              </div>
              <span className="font-medium">{org.documents}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Miembros</span>
              </div>
              <span className="font-medium">{org.members}</span>
            </div>
            <div className="pt-2">
              <Badge variant={org.status === "Activa" ? "default" : "secondary"}>{org.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
