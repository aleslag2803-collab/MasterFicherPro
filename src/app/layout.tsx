import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Sidebar from "../components/sidebar"
import { Toaster } from "../components/ui/toaster" // 👈 OK

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocManager - Gestión Documental",
  description: "Analiza y gestiona documentos con IA",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased`}>
        <div className="flex min-h-screen">
          {/* Menú lateral */}
          <Sidebar />

          {/* Contenido principal */}
          <main className="flex-1 bg-[#f7f8fc] p-6 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* 👇 AQUÍ, FUERA DEL WRAPPER PRINCIPAL */}
        <Toaster />

        <Analytics />
      </body>
    </html>
  )
}
