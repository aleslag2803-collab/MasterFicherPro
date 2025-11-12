"use client"

import { cn } from "@/src/lib/utils"
import { FileText, Building2, Brain, Shield, Users, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const menuItems = [
  { icon: FileText, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Documentos", href: "/documentos" },
  { icon: Building2, label: "Organizaciones", href: "/organizaciones" },
  { icon: Brain, label: "Herramienta IA", href: "/chat-ia" },
  { icon: Shield, label: "Auditoría", href: "/auditoria" },
  { icon: Users, label: "Usuarios", href: "/usuarios" },
  { icon: Settings, label: "Configuración", href: "/configuracion" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">DocManager</h2>
            <p className="text-xs text-muted-foreground">Gestión Documental</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 px-3">Menú principal</p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-muted-foreground hover:bg-gray-50 hover:text-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
