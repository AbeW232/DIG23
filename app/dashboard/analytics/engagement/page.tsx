import { DashboardLayout } from "@/components/dashboard-layout"
import { EngagementAnalysis } from "@/components/analytics/engagement-analysis"

export default function AnalyticsEngagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Engagement Analysis</h1>
          <p className="text-muted-foreground">Detailed analysis of user engagement with your content</p>
        </div>

        <EngagementAnalysis />
      </div>
    </DashboardLayout>
  )
}

