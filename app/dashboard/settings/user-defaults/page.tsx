import { DashboardLayout } from "@/components/dashboard-layout"
import { UserDefaults } from "@/components/settings/user-defaults"

export default function UserDefaultsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">User Defaults</h1>
          <p className="text-muted-foreground">Configure default settings for new users</p>
        </div>

        <UserDefaults />
      </div>
    </DashboardLayout>
  )
}

