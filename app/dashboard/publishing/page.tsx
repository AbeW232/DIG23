import { DashboardLayout } from "@/components/dashboard-layout"
import { PublishingDashboard } from "@/components/publishing/publishing-dashboard"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Plus, Settings, FileText } from "lucide-react"

export default function PublishingPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Publishing Dashboard"
        description="Manage your publications, exports, and distribution channels"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Publishing" }]}
        actions={
          <>
            <Button variant="outline" className="gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" className="gap-1.5">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Publication</span>
            </Button>
          </>
        }
      />
      <PublishingDashboard />
    </DashboardLayout>
  )
}

