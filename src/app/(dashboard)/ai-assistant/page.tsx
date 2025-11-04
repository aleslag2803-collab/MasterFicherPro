import { AIChat } from "@/components/ai-assistant/ai-chat"
import { AIFeatures } from "@/components/ai-assistant/ai-features"

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Asistente IA</h2>
        <p className="text-muted-foreground">Analiza y gestiona documentos con inteligencia artificial</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AIChat />
        </div>
        <div>
          <AIFeatures />
        </div>
      </div>
    </div>
  )
}
