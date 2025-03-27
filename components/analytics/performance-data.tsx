"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Clock,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PerformanceData() {
  const [timeRange, setTimeRange] = useState("30days")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Data</h2>
          <p className="text-muted-foreground">Detailed analytics on content performance and platform usage</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="time">Time Analytics</TabsTrigger>
          <TabsTrigger value="platform">Platform Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Top Story Views"
              value="1,245"
              change="+18.2%"
              trend="up"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              description="Most viewed story"
            />
            <MetricCard
              title="Avg. Story Views"
              value="87"
              change="+5.3%"
              trend="up"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              description="Per story average"
            />
            <MetricCard
              title="Lowest Performing"
              value="12"
              change="-3.1%"
              trend="down"
              icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
              description="Least viewed story"
            />
            <MetricCard
              title="New Content Views"
              value="2,876"
              change="+22.4%"
              trend="up"
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              description="Last 30 days content"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Type</CardTitle>
                <CardDescription>View metrics across different content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Stories</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Photos</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Videos</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Audio</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Documents</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Content type distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Content performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Performance trend visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Avg. Session Time"
              value="5:32"
              change="+0:45"
              trend="up"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              description="Time per session"
            />
            <MetricCard
              title="Peak Usage Time"
              value="7-9 PM"
              change=""
              trend="neutral"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              description="Most active hours"
            />
            <MetricCard
              title="Weekday vs Weekend"
              value="65% / 35%"
              change=""
              trend="neutral"
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              description="Usage distribution"
            />
            <MetricCard
              title="Bounce Rate"
              value="24%"
              change="-3.5%"
              trend="up"
              icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
              description="Improved retention"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Time Spent by Content Type</CardTitle>
                <CardDescription>Average time users spend on different content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Stories</span>
                      <span className="font-medium">4:12 min</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Photos</span>
                      <span className="font-medium">2:45 min</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Videos</span>
                      <span className="font-medium">8:32 min</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Audio</span>
                      <span className="font-medium">6:18 min</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Documents</span>
                      <span className="font-medium">3:24 min</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Time spent visualization</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Usage Patterns</CardTitle>
                <CardDescription>When users are most active</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Daily usage pattern visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Mobile Usage"
              value="68%"
              change="+5.2%"
              trend="up"
              icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
              description="Of total traffic"
            />
            <MetricCard
              title="Desktop Usage"
              value="24%"
              change="-3.8%"
              trend="down"
              icon={<Monitor className="h-4 w-4 text-muted-foreground" />}
              description="Of total traffic"
            />
            <MetricCard
              title="Tablet Usage"
              value="8%"
              change="-1.4%"
              trend="down"
              icon={<Tablet className="h-4 w-4 text-muted-foreground" />}
              description="Of total traffic"
            />
            <MetricCard
              title="Browser Distribution"
              value="Chrome 62%"
              change=""
              trend="neutral"
              icon={<Laptop className="h-4 w-4 text-muted-foreground" />}
              description="Most used browser"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>Platform usage distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Device usage distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating System Distribution</CardTitle>
                <CardDescription>OS usage across your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>iOS</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Android</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Windows</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>macOS</span>
                      <span className="font-medium">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Other</span>
                      <span className="font-medium">1%</span>
                    </div>
                    <Progress value={1} className="h-2" />
                  </div>
                </div>
                <div className="h-[150px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">OS distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Export Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  description: string
}

function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">{icon}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center">
            {trend === "up" ? (
              <ArrowUpRight className="inline h-3 w-3 mr-1 text-green-500" />
            ) : trend === "down" ? (
              <ArrowDownRight className="inline h-3 w-3 mr-1 text-red-500" />
            ) : (
              <ArrowRight className="inline h-3 w-3 mr-1 text-gray-500" />
            )}
            {change} from last period
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

