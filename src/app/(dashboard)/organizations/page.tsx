import { OrganizationsGrid } from "@/components/organizations/organizations-grid"
import { OrganizationsHeader } from "@/components/organizations/organizations-header"

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <OrganizationsHeader />
      <OrganizationsGrid />
    </div>
  )
}
