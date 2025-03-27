import { DashboardLayout } from "@/components/dashboard-layout"
import { UserAnalytics } from "@/components/analytics/user-analytics"

export default function AnalyticsUsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">User Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into user behavior and demographics</p>
        </div>

        <UserAnalytics />
      </div>
    </DashboardLayout>
  )
}

