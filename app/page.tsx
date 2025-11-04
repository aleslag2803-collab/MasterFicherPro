"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm tracking-tight">
          MASTERFICHER
        </h1>
        <p className="text-lg text-gray-600">
          Sistema moderno de gestión documental — organiza, controla y accede a tu información fácilmente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
        <Card className="shadow-md border-blue-200 hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">📄 Documentos</h3>
            <p className="text-gray-500 text-sm">Gestiona tus archivos y registros fácilmente.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-blue-200 hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">👥 Usuarios</h3>
            <p className="text-gray-500 text-sm">Administra permisos y roles del sistema.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-blue-200 hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">📊 Reportes</h3>
            <p className="text-gray-500 text-sm">Visualiza estadísticas y actividad reciente.</p>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} MasterFicher — Todos los derechos reservados.
      </footer>
    </main>
  )
}
