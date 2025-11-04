import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Building2, Users, FileText } from "lucide-react"

const actions = [
  {
    title: "Subir Documento",
    icon: Upload,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Nueva Organización",
    icon: Building2,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Asistente IA",
    icon: FileText,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Gestionar Usuarios",
    icon: Users,
    color: "bg-blue-600 hover:bg-blue-700",
  },
]

export function QuickActions() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
        <p className="text-sm text-muted-foreground">Accesos directos a funciones principales</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="default"
                className={`h-auto py-6 flex flex-col items-center gap-2 ${action.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
