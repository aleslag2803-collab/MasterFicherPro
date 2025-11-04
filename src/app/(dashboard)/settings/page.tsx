import { SettingsForm } from "@/components/settings/settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configuración</h2>
        <p className="text-muted-foreground">Administra las preferencias del sistema</p>
      </div>
      <SettingsForm />
    </div>
  )
}
