"use client"


import { Search, Bell, User } from "lucide-react"
import { Button } from "../ui/button"

export default function UsersHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <div className="font-bold text-foreground">DocManager</div>
            <div className="text-sm text-muted-foreground">Gestión Documental</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 ml-8">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-lg">▦</span>
            <span>Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-input px-4 py-2 rounded-lg">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar documentos...."
              className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground w-64"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
