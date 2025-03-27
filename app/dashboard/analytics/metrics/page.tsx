import { DashboardLayout } from "@/components/dashboard-layout"
import { KeyMetrics } from "@/components/analytics/key-metrics"

export default function AnalyticsMetricsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze engagement with your digital legacy content</p>
        </div>

        <KeyMetrics />
      </div>
    </DashboardLayout>
  )
}

