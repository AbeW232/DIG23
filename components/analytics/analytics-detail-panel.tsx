"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { LineChart, BarChart } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"
import { format, subDays, addDays } from "date-fns"

interface AnalyticsDetailPanelProps {
  metric: string
  onClose: () => void
  dateRange: DateRange | undefined
}

export function AnalyticsDetailPanel({ metric, onClose, dateRange }: AnalyticsDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [currentPeriod, setCurrentPeriod] = useState<DateRange | undefined>(dateRange)

  const metricTitles = {
    visitors: "Visitor Analytics",
    engagement: "Engagement Analytics",
    time: "Time on Page Analytics",
    views: "View Count Analytics",
  }

  const metricDescriptions = {
    visitors: "Detailed analysis of visitor patterns and behaviors",
    engagement: "In-depth engagement metrics and user interactions",
    time: "Comprehensive time-based analytics and session durations",
    views: "Detailed view count statistics and content performance",
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handlePreviousPeriod = () => {
    if (!currentPeriod?.from || !currentPeriod?.to) return

    const periodLength = Math.floor((currentPeriod.to.getTime() - currentPeriod.from.getTime()) / (1000 * 60 * 60 * 24))

    setCurrentPeriod({
      from: subDays(currentPeriod.from, periodLength),
      to: subDays(currentPeriod.to, periodLength),
    })
  }

  const handleNextPeriod = () => {
    if (!currentPeriod?.from || !currentPeriod?.to) return

    const periodLength = Math.floor((currentPeriod.to.getTime() - currentPeriod.from.getTime()) / (1000 * 60 * 60 * 24))
    const newTo = addDays(currentPeriod.to, periodLength)

    // Don't allow going into the future
    if (newTo > new Date()) return

    setCurrentPeriod({
      from: addDays(currentPeriod.from, periodLength),
      to: newTo,
    })
  }

  // Sample data for the detail view
  const detailData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
      "Day 29",
      "Day 30",
    ],
    datasets: [
      {
        label: "Current Period",
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Previous Period",
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 30),
        borderColor: "hsl(var(--muted-foreground))",
        backgroundColor: "transparent",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  }

  const comparisonData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Current Period",
        data: [65, 78, 82, 91],
        backgroundColor: "hsl(var(--primary) / 0.8)",
      },
      {
        label: "Previous Period",
        data: [54, 65, 73, 81],
        backgroundColor: "hsl(var(--muted-foreground) / 0.5)",
      },
    ],
  }

  return (
    <Card className="mt-6 border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{metricTitles[metric as keyof typeof metricTitles] || "Detailed Analytics"}</CardTitle>
            <CardDescription>
              {metricDescriptions[metric as keyof typeof metricDescriptions] || "Detailed analytics view"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousPeriod}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              {currentPeriod?.from && currentPeriod?.to ? (
                <>
                  {format(currentPeriod.from, "MMM d, yyyy")} - {format(currentPeriod.to, "MMM d, yyyy")}
                </>
              ) : (
                "Current Period"
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleNextPeriod}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="h-[400px]" style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}>
              <LineChart
                data={detailData}
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
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.5</div>
                  <p className="text-xs text-muted-foreground">+12.3% vs previous</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Peak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+8.7% vs previous</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+15.2%</div>
                  <p className="text-xs text-muted-foreground">+3.1% vs previous</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="h-[400px]">
              <BarChart
                data={comparisonData}
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
                  },
                }}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Period Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Current Period</span>
                      <span className="font-medium">79.0 avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Previous Period</span>
                      <span className="font-medium">68.3 avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Difference</span>
                      <span className="font-medium text-green-500">+15.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Weekly Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Week 1 to 2</span>
                      <span className="font-medium text-green-500">+20.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Week 2 to 3</span>
                      <span className="font-medium text-green-500">+5.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Week 3 to 4</span>
                      <span className="font-medium text-green-500">+11.0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {/* Placeholder for device breakdown chart */}
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Device breakdown chart would appear here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Source Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {/* Placeholder for source breakdown chart */}
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Traffic source breakdown chart would appear here
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Placeholder for geographic map */}
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Geographic distribution map would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Growth Trend Detected</p>
                        <p className="text-muted-foreground">
                          Consistent 15% week-over-week growth indicates strong user adoption.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Peak Usage Pattern</p>
                        <p className="text-muted-foreground">
                          Highest activity occurs between 6-8pm, suggesting evening engagement preference.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-yellow-500/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Mobile Shift</p>
                        <p className="text-muted-foreground">
                          10% increase in mobile usage compared to previous period.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Optimize for Evening Users</p>
                        <p className="text-muted-foreground">
                          Schedule content releases and notifications during peak evening hours.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Enhance Mobile Experience</p>
                        <p className="text-muted-foreground">
                          Prioritize mobile UI improvements to capitalize on growing mobile usage.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Leverage Growth Momentum</p>
                        <p className="text-muted-foreground">
                          Implement referral programs to capitalize on positive growth trends.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-md">
                    <div className="rounded-full bg-yellow-500/10 p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Traffic Spike Detected</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Unusual 85% traffic increase on March 18th correlates with your family reunion story
                        publication. This suggests high interest in this content type.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-md">
                    <div className="rounded-full bg-blue-500/10 p-1 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Engagement Pattern Shift</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Weekend engagement has increased by 32% compared to weekdays, reversing previous patterns.
                        Consider optimizing weekend content strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

