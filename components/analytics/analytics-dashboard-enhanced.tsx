"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { AnalyticsMetricCard } from "@/components/analytics/analytics-metric-card"
import { AnalyticsChartContainer } from "@/components/analytics/analytics-chart-container"
import { AnalyticsFilters } from "@/components/analytics/analytics-filters"
import { AnalyticsInsightCard } from "@/components/analytics/analytics-insight-card"
import { AnalyticsExportMenu } from "@/components/analytics/analytics-export-menu"
import { AnalyticsCustomizeMenu } from "@/components/analytics/analytics-customize-menu"
import { AnalyticsDateRangeSelector } from "@/components/analytics/analytics-date-range-selector"
import { AnalyticsRealTimeIndicator } from "@/components/analytics/analytics-real-time-indicator"
import { AnalyticsLoadingState } from "@/components/analytics/analytics-loading-state"
import { AnalyticsBookmarkMenu } from "@/components/analytics/analytics-bookmark-menu"
import { AnalyticsShareMenu } from "@/components/analytics/analytics-share-menu"
import { AnalyticsHelpMenu } from "@/components/analytics/analytics-help-menu"
import { AnalyticsNotifications } from "@/components/analytics/analytics-notifications"
import { AnalyticsUserSegments } from "@/components/analytics/analytics-user-segments"
import { AnalyticsContentPerformance } from "@/components/analytics/analytics-content-performance"
import { AnalyticsEngagementMetrics } from "@/components/analytics/analytics-engagement-metrics"
import { AnalyticsAudienceInsights } from "@/components/analytics/analytics-audience-insights"
import { AnalyticsConversionFunnel } from "@/components/analytics/analytics-conversion-funnel"
import { AnalyticsRetentionChart } from "@/components/analytics/analytics-retention-chart"
import { AnalyticsGeographicMap } from "@/components/analytics/analytics-geographic-map"
import { AnalyticsDetailPanel } from "@/components/analytics/analytics-detail-panel"
import { AnalyticsPredictiveInsights } from "@/components/analytics/analytics-predictive-insights"
import { AnalyticsAnomalyDetection } from "@/components/analytics/analytics-anomaly-detection"
import { AnalyticsCorrelationFinder } from "@/components/analytics/analytics-correlation-finder"
import { AnalyticsDataExplorer } from "@/components/analytics/analytics-data-explorer"
import { Download, Users, TrendingUp, Clock, Eye } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { Line } from "react-chartjs-2"
import { Pie } from "react-chartjs-2"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
)

export function AnalyticsDashboardEnhanced() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [selectedContentType, setSelectedContentType] = useState("all")
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false)
  const [showDetailPanel, setShowDetailPanel] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [dashboardLayout, setDashboardLayout] = useState("grid")
  const [notifications, setNotifications] = useState([])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Sample data for charts
  const visitorData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [150, 230, 180, 290, 200, 300, 250],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Last Week",
        data: [120, 190, 150, 250, 180, 280, 220],
        borderColor: "hsl(var(--muted-foreground))",
        backgroundColor: "transparent",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  }

  const engagementData = {
    labels: ["Stories", "Media", "Comments", "Shares"],
    datasets: [
      {
        label: "Engagement",
        data: [65, 40, 35, 20],
        backgroundColor: [
          "hsl(var(--primary) / 0.8)",
          "hsl(var(--primary) / 0.6)",
          "hsl(var(--primary) / 0.4)",
          "hsl(var(--primary) / 0.2)",
        ],
        borderColor: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"],
        borderWidth: 1,
      },
    ],
  }

  const contentPerformanceData = {
    labels: ["Family Vacation", "Childhood Memories", "Wedding Day", "Graduation", "First Home"],
    datasets: [
      {
        label: "Views",
        data: [120, 90, 80, 60, 40],
        backgroundColor: "hsl(var(--primary) / 0.6)",
      },
    ],
  }

  const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: ["hsl(var(--primary) / 0.8)", "hsl(var(--primary) / 0.5)", "hsl(var(--primary) / 0.3)"],
        borderColor: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"],
        borderWidth: 1,
      },
    ],
  }

  const timeOfDayData = {
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    datasets: [
      {
        label: "User Activity",
        data: [10, 5, 8, 25, 35, 45, 60, 40],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const retentionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    datasets: [
      {
        label: "User Retention",
        data: [100, 85, 70, 60, 55, 50, 48, 45],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)

    // Update date range based on selected time range
    const now = new Date()
    let from = now

    switch (range) {
      case "7d":
        from = subDays(now, 7)
        break
      case "30d":
        from = subDays(now, 30)
        break
      case "90d":
        from = subDays(now, 90)
        break
      case "1y":
        from = subDays(now, 365)
        break
      default:
        from = subDays(now, 30)
    }

    setDateRange({ from, to: now })
  }

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric)
    setShowDetailPanel(true)
  }

  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false)
    setSelectedMetric(null)
  }

  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled)
  }

  if (isLoading) {
    return <AnalyticsLoadingState />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        description="Comprehensive insights into your digital legacy platform"
        actions={
          <div className="flex items-center gap-2">
            <AnalyticsDateRangeSelector
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <AnalyticsRealTimeIndicator isEnabled={isRealTimeEnabled} onToggle={toggleRealTime} />
            <AnalyticsExportMenu />
            <AnalyticsCustomizeMenu />
            <AnalyticsBookmarkMenu />
            <AnalyticsShareMenu />
            <AnalyticsHelpMenu />
            <AnalyticsNotifications />
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsMetricCard
          title="Total Visitors"
          value="1,248"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: "+12%", direction: "up", label: "vs. previous period" }}
          onClick={() => handleMetricClick("visitors")}
        />
        <AnalyticsMetricCard
          title="Engagement Rate"
          value="32%"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: "+5%", direction: "up", label: "vs. previous period" }}
          onClick={() => handleMetricClick("engagement")}
        />
        <AnalyticsMetricCard
          title="Avg. Time on Page"
          value="3:24"
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: "+0:42", direction: "up", label: "vs. previous period" }}
          onClick={() => handleMetricClick("time")}
        />
        <AnalyticsMetricCard
          title="Story Views"
          value="3,856"
          icon={<Eye className="h-4 w-4" />}
          trend={{ value: "+24%", direction: "up", label: "vs. previous period" }}
          onClick={() => handleMetricClick("views")}
        />
      </div>

      <AnalyticsFilters
        selectedSegment={selectedSegment}
        onSegmentChange={setSelectedSegment}
        selectedContentType={selectedContentType}
        onContentTypeChange={setSelectedContentType}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsChartContainer
              title="Visitor Trends"
              description="Daily visitors over time with comparison"
              chart={
                <Line
                  data={visitorData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                      },
                    },
                    interaction: {
                      mode: "nearest",
                      axis: "x",
                      intersect: false,
                    },
                  }}
                />
              }
              actions={
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
            />

            <AnalyticsChartContainer
              title="Engagement Breakdown"
              description="How users interact with your content"
              chart={
                <Pie
                  data={engagementData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          boxWidth: 12,
                          padding: 20,
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.label}: ${context.raw}%`,
                        },
                      },
                    },
                  }}
                />
              }
              actions={
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
            />
          </div>

          <AnalyticsChartContainer
            title="Top Performing Content"
            description="Stories with the most views"
            chart={
              <Bar
                data={contentPerformanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            }
            actions={
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsInsightCard
              title="Key Insight"
              description="Your engagement rate has increased by 15% since you started posting more family photos."
              icon={<TrendingUp className="h-5 w-5 text-green-500" />}
              actions={
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              }
            />

            <AnalyticsInsightCard
              title="Recommendation"
              description="Try posting content between 6-8pm to reach more of your audience based on activity patterns."
              icon={<Clock className="h-5 w-5 text-primary" />}
              actions={
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <AnalyticsContentPerformance />
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsChartContainer
              title="Device Breakdown"
              description="How users access your content"
              chart={
                <Pie
                  data={deviceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                />
              }
              actions={
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
            />

            <AnalyticsChartContainer
              title="Time of Day Activity"
              description="When your users are most active"
              chart={
                <Line
                  data={timeOfDayData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              }
              actions={
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              }
            />
          </div>

          <AnalyticsAudienceInsights />
          <AnalyticsGeographicMap />
          <AnalyticsUserSegments />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <AnalyticsEngagementMetrics />
          <AnalyticsRetentionChart
            data={retentionData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  min: 0,
                  max: 100,
                  ticks: {
                    callback: (value) => value + "%",
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => context.raw + "% retention",
                  },
                },
              },
            }}
          />
          <AnalyticsConversionFunnel />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <AnalyticsDataExplorer />
          <AnalyticsPredictiveInsights />
          <AnalyticsAnomalyDetection />
          <AnalyticsCorrelationFinder />
        </TabsContent>
      </Tabs>

      {showDetailPanel && selectedMetric && (
        <AnalyticsDetailPanel metric={selectedMetric} onClose={handleCloseDetailPanel} dateRange={dateRange} />
      )}
    </div>
  )
}

