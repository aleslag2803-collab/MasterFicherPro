import { AIChat } from "@/components/chat-ia/ai-chat"

export default function AIAssistantPage() {
  return (
    <div className="p-6 bg-[#f7f8fc] min-h-screen">
      {/* Encabezado */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Asistente IA</h2>
        <p className="text-muted-foreground">
          Analiza y gestiona documentos con IA
        </p>
      </div>

      {/* Contenido principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Panel de chat */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Chat con asistente IA</h3>

          {/* 🚀 Aquí insertamos tu componente de chat REAL */}
          <AIChat />
        </div>

        {/* Panel lateral derecho */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Capacidades de IA</h3>
          <p className="text-sm text-gray-500 mb-4">
            Funciones disponibles del asistente
          </p>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
              <p className="font-medium text-gray-800">📄 Análisis de Documentos</p>
              <p className="text-sm text-gray-500">Extrae información clave de tus documentos automáticamente.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
              <p className="font-medium text-gray-800">⭐ Resumen inteligente</p>
              <p className="text-sm text-gray-500">Resúmenes concisos de documentos largos.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
              <p className="font-medium text-gray-800">🌐 Traducción</p>
              <p className="text-sm text-gray-500">Traduce documentos a múltiples idiomas.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
              <p className="font-medium text-gray-800">✅ Validación</p>
              <p className="text-sm text-gray-500">Verifica la integridad y cumplimiento de documentos.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
