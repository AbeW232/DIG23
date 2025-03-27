"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeyMetrics } from "@/components/analytics/key-metrics"
import { PerformanceData } from "@/components/analytics/performance-data"
import { UserAnalytics } from "@/components/analytics/user-analytics"
import { ContentInsights } from "@/components/analytics/content-insights"
import { EngagementAnalysis } from "@/components/analytics/engagement-analysis"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useRouter } from "next/navigation"

export function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Navigate to the corresponding page for deeper analysis
    if (value !== "overview") {
      const paths: Record<string, string> = {
        performance: "/dashboard/analytics/performance",
        users: "/dashboard/analytics/users",
        content: "/dashboard/analytics/content",
        engagement: "/dashboard/analytics/engagement",
      }

      if (paths[value]) {
        router.push(paths[value])
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={handleTabChange} value={activeTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <KeyMetrics />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceData />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserAnalytics />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentInsights />
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <EngagementAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}

