import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileSearch, Languages, FileCheck } from "lucide-react"

const features = [
  {
    title: "Análisis de Documentos",
    description: "Extrae información clave de tus documentos automáticamente",
    icon: FileSearch,
    color: "text-primary",
  },
  {
    title: "Resumen Inteligente",
    description: "Genera resúmenes concisos de documentos largos",
    icon: Sparkles,
    color: "text-secondary",
  },
  {
    title: "Traducción",
    description: "Traduce documentos a múltiples idiomas",
    icon: Languages,
    color: "text-accent",
  },
  {
    title: "Validación",
    description: "Verifica la integridad y cumplimiento de documentos",
    icon: FileCheck,
    color: "text-chart-1",
  },
]

export function AIFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacidades de IA</CardTitle>
        <CardDescription>Funciones disponibles del asistente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-3 rounded-lg border p-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ${feature.color}`}>
              <feature.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
