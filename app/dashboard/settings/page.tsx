import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsManagement } from "@/components/settings/settings-management"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <SettingsManagement />
      </div>
    </DashboardLayout>
  )
}

