import { DashboardLayout } from "@/components/dashboard-layout"
import { SystemSettings } from "@/components/settings/system-settings"

export default function SystemSettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings for your digital legacy platform</p>
        </div>

        <SystemSettings />
      </div>
    </DashboardLayout>
  )
}

