import { DashboardLayout } from "@/components/dashboard-layout"
import { PerformanceData } from "@/components/analytics/performance-data"

export default function AnalyticsPerformancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">Detailed analytics on content performance and platform usage</p>
        </div>

        <PerformanceData />
      </div>
    </DashboardLayout>
  )
}

