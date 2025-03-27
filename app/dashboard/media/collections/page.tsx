import { DashboardLayout } from "@/components/dashboard-layout"
import { CollectionsManagement } from "@/components/media-library/collections-management"

export default function MediaCollectionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Collections Management</h1>
          <p className="text-muted-foreground">Create, edit, and organize your media collections</p>
        </div>

        <CollectionsManagement />
      </div>
    </DashboardLayout>
  )
}

