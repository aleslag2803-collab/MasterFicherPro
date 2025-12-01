import { OrganizationsGrid } from "@/src/components/organizaciones/organizations-grid";
import { OrganizationsHeader } from "@/src/components/organizaciones/organizations-header";

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <OrganizationsHeader />
      <OrganizationsGrid />
    </div>
  )
}
