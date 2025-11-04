"use client"

import { FileText, LayoutDashboard, FolderTree, Sparkles, History, Settings, Shield, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Documentos",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Organizaciones",
    url: "/organizations",
    icon: FolderTree,
  },
  {
    title: "Asistente IA",
    url: "/ai-assistant",
    icon: Sparkles,
  },
  {
    title: "Auditoría",
    url: "/audit",
    icon: History,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">DocManager</span>
            <span className="text-xs text-sidebar-foreground/60">Gestión Documental</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
          <Shield className="h-3 w-3" />
          <span>Sistema Seguro</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
