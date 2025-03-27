import { DashboardLayout } from "@/components/dashboard-layout"
import { AssetGridView } from "@/components/media-library/asset-grid-view"

export default function MediaBrowsePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Browse and manage your media assets</p>
        </div>

        <AssetGridView />
      </div>
    </DashboardLayout>
  )
}

