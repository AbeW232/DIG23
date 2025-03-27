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
  Users,
  UserPlus,
  UserMinus,
  Map,
  Globe,
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Layers,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function UserAnalytics() {
  const [timeRange, setTimeRange] = useState("30days")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Analytics</h2>
          <p className="text-muted-foreground">Detailed insights into user behavior and demographics</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="behavior">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Users"
              value="1,248"
              change="+12.5%"
              trend="up"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              description="Monthly active users"
            />
            <MetricCard
              title="New Users"
              value="324"
              change="+8.3%"
              trend="up"
              icon={<UserPlus className="h-4 w-4 text-muted-foreground" />}
              description="Last 30 days"
            />
            <MetricCard
              title="Returning Users"
              value="76%"
              change="+4.2%"
              trend="up"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              description="Return rate"
            />
            <MetricCard
              title="Churn Rate"
              value="5.2%"
              change="-1.8%"
              trend="up"
              icon={<UserMinus className="h-4 w-4 text-muted-foreground" />}
              description="User retention improved"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Patterns</CardTitle>
                <CardDescription>How users interact with your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Story Reading</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Media Browsing</span>
                      <span className="font-medium">54%</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Commenting</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Sharing</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Content Creation</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">User activity distribution chart</p>
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
                <CardTitle>Session Behavior</CardTitle>
                <CardDescription>User session patterns and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Avg. Session Duration</div>
                    <div className="text-2xl font-bold">5:32</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                      <span>+0:45 from last period</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Pages Per Session</div>
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                      <span>+0.6 from last period</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Bounce Rate</div>
                    <div className="text-2xl font-bold">24%</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ArrowDownRight className="h-3 w-3 text-green-500 mr-1" />
                      <span>-3.5% from last period</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground mb-1">Return Frequency</div>
                    <div className="text-2xl font-bold">3.2 days</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ArrowDownRight className="h-3 w-3 text-green-500 mr-1" />
                      <span>-0.8 days from last period</span>
                    </div>
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Session behavior trends chart</p>
                  </div>
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

        <TabsContent value="demographics" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Age Distribution"
              value="35-44"
              change=""
              trend="neutral"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              description="Largest age group"
            />
            <MetricCard
              title="Gender Ratio"
              value="54% / 46%"
              change=""
              trend="neutral"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              description="Female / Male"
            />
            <MetricCard
              title="Top Location"
              value="New York"
              change=""
              trend="neutral"
              icon={<Map className="h-4 w-4 text-muted-foreground" />}
              description="Most active city"
            />
            <MetricCard
              title="Languages"
              value="English 78%"
              change=""
              trend="neutral"
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
              description="Primary language"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>User age distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>18-24</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>25-34</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>35-44</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>45-54</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>55+</span>
                      <span className="font-medium">14%</span>
                    </div>
                    <Progress value={14} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Age distribution chart</p>
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
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your users are located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Geographic distribution map</p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">United States</span>
                    <Badge>42%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">United Kingdom</span>
                    <Badge>18%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Canada</span>
                    <Badge>12%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Australia</span>
                    <Badge>8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other</span>
                    <Badge>20%</Badge>
                  </div>
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

        <TabsContent value="journey" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Map</CardTitle>
              <CardDescription>How users navigate through your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">User journey flow visualization</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Report
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Entry Points</CardTitle>
                <CardDescription>How users discover your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Direct</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Search</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Social Media</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Email</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Referral</span>
                      <span className="font-medium">4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Entry points distribution chart</p>
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
                <CardTitle>User Pathways</CardTitle>
                <CardDescription>Common navigation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm font-medium mb-2">Most Common Path</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Home</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Stories</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Media</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Comments</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">28% of users follow this path</div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm font-medium mb-2">Second Common Path</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Home</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Media</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Stories</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">22% of users follow this path</div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="text-sm font-medium mb-2">Third Common Path</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Home</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Family Tree</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>Stories</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">18% of users follow this path</div>
                  </div>
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

