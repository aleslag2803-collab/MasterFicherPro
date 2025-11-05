import { OrganizationsGrid } from "@/components/organizaciones/organizations-grid"
import { OrganizationsHeader } from "@/components/organizaciones/organizations-header"
import  TopBar  from "@/components/top-bar"
import Sidebar from "@/components/sidebar"

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <OrganizationsHeader />
      <OrganizationsGrid />
    </div>
  )
}
