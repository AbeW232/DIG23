import { DashboardLayout } from "@/components/dashboard-layout"
import { NotificationSettings } from "@/components/settings/notification-settings"

export default function NotificationsSettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground">Configure how and when you receive notifications</p>
        </div>

        <NotificationSettings />
      </div>
    </DashboardLayout>
  )
}

