import { NewOrganizationForm } from "@/components/organizaciones/new-organization-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewOrganizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/Dashboard/organizaciones">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Nueva Organización</h2>
          <p className="text-muted-foreground">Crear una nueva organización en el sistema</p>
        </div>
      </div>
      <NewOrganizationForm />
    </div>
  )
}
