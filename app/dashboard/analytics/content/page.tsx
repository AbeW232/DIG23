import { DashboardLayout } from "@/components/dashboard-layout"
import { ContentInsights } from "@/components/analytics/content-insights"

export default function AnalyticsContentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Content Insights</h1>
          <p className="text-muted-foreground">Detailed analysis of your content performance</p>
        </div>

        <ContentInsights />
      </div>
    </DashboardLayout>
  )
}

