import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FolderPlus, Sparkles, Users } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Subir Documento",
    description: "Agregar nuevo documento al sistema",
    icon: Upload,
    href: "/documents/upload",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "Nueva Organización",
    description: "Crear una nueva organización",
    icon: FolderPlus,
    href: "/organizations/new",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    title: "Asistente IA",
    description: "Analizar documentos con IA",
    icon: Sparkles,
    href: "/ai-assistant",
    color: "bg-accent text-accent-foreground",
  },
  {
    title: "Gestionar Usuarios",
    description: "Administrar usuarios del sistema",
    icon: Users,
    href: "/users",
    color: "bg-chart-2 text-primary-foreground",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accesos directos a funciones principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button variant="outline" className="h-auto w-full justify-start p-4 text-left bg-transparent">
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${action.color}`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
