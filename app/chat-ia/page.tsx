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
          <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-y-auto">
            <div className="text-gray-600 bg-white border border-gray-200 rounded-lg p-3 inline-block shadow-sm">
              <span className="text-gray-800 font-medium">💬 Hola, soy tu asistente de IA.</span> ¿En qué puedo ayudarte con tus documentos el día de hoy?
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              ✈️
            </button>
          </div>
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
