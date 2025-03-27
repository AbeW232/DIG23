"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Calendar,
  Download,
  Eye,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  Clock,
  ThumbsUp,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  MessageSquare,
  Share2,
  Star,
} from "lucide-react"

export function KeyMetrics() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Key Metrics</h2>
          <p className="text-muted-foreground">Overview of your platform's performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stories">Story Views</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Views"
              value="4,827"
              change="+12.5%"
              trend="up"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
              description="Total story views"
            />

            <MetricCard
              title="Engagement Rate"
              value="24.8%"
              change="+3.2%"
              trend="up"
              icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
              description="Avg. interaction rate"
            />

            <MetricCard
              title="Avg. Time Spent"
              value="5:32"
              change="+0:45"
              trend="up"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              description="Time per session"
            />

            <MetricCard
              title="Active Users"
              value="128"
              change="+8"
              trend="up"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              description="Monthly active users"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Views Over Time</CardTitle>
                  <CardDescription>Daily view count for the selected period</CardDescription>
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Line chart visualization would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Bar chart visualization would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Stories"
              value="156"
              change="+12"
              trend="up"
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
              description="Published stories"
            />

            <MetricCard
              title="Avg. Views per Story"
              value="31"
              change="+5"
              trend="up"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
              description="Average views"
            />

            <MetricCard
              title="Most Viewed"
              value="342"
              change="+28"
              trend="up"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              description="Top story views"
            />

            <MetricCard
              title="New Stories"
              value="18"
              change="-2"
              trend="down"
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              description="Last 30 days"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Stories</CardTitle>
              <CardDescription>Stories with the highest view counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="font-bold text-lg text-muted-foreground">{i}.</div>
                      <div>
                        <div className="font-medium">Family Vacation Memories</div>
                        <div className="text-sm text-muted-foreground">Published on March 15, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">1,245 views</div>
                      <div className="text-sm text-muted-foreground">32 comments</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Stories
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Comments"
              value="248"
              change="+32"
              trend="up"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="Total comments"
            />

            <MetricCard
              title="Shares"
              value="87"
              change="+15"
              trend="up"
              icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
              description="Social & email shares"
            />

            <MetricCard
              title="Likes"
              value="523"
              change="+48"
              trend="up"
              icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
              description="Story likes"
            />

            <MetricCard
              title="Avg. Rating"
              value="4.8/5"
              change="+0.2"
              trend="up"
              icon={<Star className="h-4 w-4 text-muted-foreground" />}
              description="User ratings"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Engagement by Content Type</CardTitle>
                  <CardDescription>How users interact with different content</CardDescription>
                </div>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Pie chart visualization would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Engagement Trends</CardTitle>
                  <CardDescription>Engagement metrics over time</CardDescription>
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Line chart visualization would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
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
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
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
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

