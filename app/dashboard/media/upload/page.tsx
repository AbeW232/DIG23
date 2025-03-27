import { DashboardLayout } from "@/components/dashboard-layout"
import { UploadInterface } from "@/components/media-library/upload-interface"

export default function MediaUploadPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Media Upload</h1>
          <p className="text-muted-foreground">Upload and manage media files for your digital legacy</p>
        </div>

        <UploadInterface />
      </div>
    </DashboardLayout>
  )
}

