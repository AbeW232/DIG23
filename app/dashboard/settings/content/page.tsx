import { DashboardLayout } from "@/components/dashboard-layout"
import { ContentSettings } from "@/components/settings/content-settings"

export default function ContentSettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Content Settings</h1>
          <p className="text-muted-foreground">Configure settings for content creation and media handling</p>
        </div>

        <ContentSettings />
      </div>
    </DashboardLayout>
  )
}

