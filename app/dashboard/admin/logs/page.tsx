import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminLogsManagement } from "@/components/admin/logs/admin-logs-management"

export default function AdminLogsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground">
            Monitor digital legacy activities, track asset transfers, and review system events.
          </p>
        </div>

        <AdminLogsManagement />
      </div>
    </DashboardLayout>
  )
}

