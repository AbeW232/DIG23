import { DashboardLayout } from "@/components/dashboard-layout"
import { TagsManagement } from "@/components/media-library/tags-management"

export default function MediaTagsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Tags Management</h1>
          <p className="text-muted-foreground">Create, edit, and organize your media tags</p>
        </div>

        <TagsManagement />
      </div>
    </DashboardLayout>
  )
}

