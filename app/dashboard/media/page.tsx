import { DashboardLayout } from "@/components/dashboard-layout"
import { MediaDashboard } from "@/components/dashboard/media-dashboard"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Upload, Settings } from "lucide-react"

export default function MediaPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Media Library"
        description="Manage all your digital legacy media assets"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Media Library" }]}
        actions={
          <>
            <Button variant="outline" className="gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <Button className="gap-1">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload Media</span>
            </Button>
          </>
        }
      />
      <MediaDashboard />
    </DashboardLayout>
  )
}

