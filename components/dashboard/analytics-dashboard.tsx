"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  LineChart,
  PieChart,
  Settings,
  Share2,
  Star,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const viewsData = [
  { name: "Jan", views: 1200 },
  { name: "Feb", views: 1900 },
  { name: "Mar", views: 1500 },
  { name: "Apr", views: 2400 },
  { name: "May", views: 2800 },
  { name: "Jun", views: 3200 },
  { name: "Jul", views: 3800 },
]

const engagementData = [
  { name: "Jan", comments: 240, shares: 80, likes: 320 },
  { name: "Feb", comments: 300, shares: 100, likes: 380 },
  { name: "Mar", comments: 280, shares: 90, likes: 350 },
  { name: "Apr", comments: 320, shares: 120, likes: 480 },
  { name: "May", comments: 380, shares: 150, likes: 520 },
  { name: "Jun", comments: 420, shares: 180, likes: 580 },
  { name: "Jul", comments: 480, shares: 220, likes: 650 },
]

const deviceData = [
  { name: "Mobile", value: 68 },
  { name: "Desktop", value: 24 },
  { name: "Tablet", value: 8 },
]

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#d946ef"]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track and analyze engagement with your digital legacy content</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] shadow-sm">
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
          <Button variant="outline" className="shadow-sm transition-all hover:shadow">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="shadow-sm transition-all hover:shadow">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,827</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+12.5%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+3.2%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5:32</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+0:45</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500 font-medium">+8</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Views Over Time Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Views Over Time</CardTitle>
                  <CardDescription>Daily view count for the selected period</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="shadow-sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Options
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LineChart className="mr-2 h-4 w-4" />
                      <span>Line Chart</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Bar Chart</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download Data</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={viewsData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-muted-foreground">Total Views: 14,800</span>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardFooter>
          </Card>

          {/* Engagement Metrics Chart */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Comments, shares, and likes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="comments" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="shares" stackId="a" fill="#6366f1" />
                      <Bar dataKey="likes" stackId="a" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-muted-foreground">Comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-muted-foreground">Shares</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs text-muted-foreground">Likes</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>How users access your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap items-center gap-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-xs text-muted-foreground">
                        {device.name}: {device.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Popular Stories</CardTitle>
              <CardDescription>Your top performing stories based on views and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Family Vacation Memories", date: "March 15, 2024", views: 1245, comments: 32, rating: 4.8 },
                  { title: "Wedding Day Celebration", date: "February 8, 2024", views: 987, comments: 28, rating: 4.7 },
                  { title: "Graduation Ceremony", date: "April 2, 2024", views: 856, comments: 24, rating: 4.6 },
                  { title: "First Home Purchase", date: "January 20, 2024", views: 742, comments: 18, rating: 4.5 },
                  { title: "Family Reunion", date: "March 28, 2024", views: 685, comments: 22, rating: 4.4 },
                ].map((story, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{story.title}</h3>
                        <div className="text-sm text-muted-foreground">Published on {story.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{story.views}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{story.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(story.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                        <span className="ml-1 text-xs">{story.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full shadow-sm">
                View All Stories
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Content Performance by Type</CardTitle>
                <CardDescription>View metrics for different content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stories</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Photos</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Videos</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Audio</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Documents</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full shadow-sm">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>Performance by content category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Family Events", value: 42 },
                          { name: "Personal Milestones", value: 28 },
                          { name: "Travel Memories", value: 18 },
                          { name: "Childhood Stories", value: 12 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full shadow-sm">
                  View Category Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Track new user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={[
                        { name: "Jan", users: 120 },
                        { name: "Feb", users: 140 },
                        { name: "Mar", users: 160 },
                        { name: "Apr", users: 180 },
                        { name: "May", users: 210 },
                        { name: "Jun", users: 250 },
                        { name: "Jul", users: 280 },
                      ]}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full shadow-sm">
                  View User Growth Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Age and location distribution of your users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>18-24</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>25-34</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>35-44</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>45-54</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>55+</span>
                        <span className="font-medium">14%</span>
                      </div>
                      <Progress value={14} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Top Locations</h4>
                    <div className="space-y-2">
                      {[
                        { location: "United States", percentage: 42 },
                        { location: "United Kingdom", percentage: 18 },
                        { location: "Canada", percentage: 12 },
                        { location: "Australia", percentage: 8 },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{item.location}</span>
                          <Badge>{item.percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full shadow-sm">
                  View Demographics Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
              <CardDescription>How users interact with your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Session Duration</h4>
                  <div className="text-2xl font-bold">5:32</div>
                  <div className="flex items-center text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+0:45</span>
                    <span className="text-muted-foreground ml-1">from last period</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Pages Per Session</h4>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="flex items-center text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">+0.6</span>
                    <span className="text-muted-foreground ml-1">from last period</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Bounce Rate</h4>
                  <div className="text-2xl font-bold">24%</div>
                  <div className="flex items-center text-xs">
                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">-3.5%</span>
                    <span className="text-muted-foreground ml-1">from last period</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">User Activity</h4>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Story Reading</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Media Browsing</span>
                      <span className="font-medium">54%</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Commenting</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sharing</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full shadow-sm">
                View User Behavior Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              Download Reports
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-sm">
              <Settings className="mr-2 h-4 w-4" />
              Configure Alerts
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { insight: "Engagement increased by 12.5% this month", type: "positive" },
              { insight: "Mobile usage continues to grow, now at 68%", type: "neutral" },
              { insight: "Weekend traffic is 35% higher than weekdays", type: "positive" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.type === "positive" ? "bg-green-500" : item.type === "negative" ? "bg-red-500" : "bg-blue-500"
                  }`}
                ></div>
                <span>{item.insight}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full shadow-sm">
              View All Insights
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { report: "Monthly Performance Summary", date: "July 31, 2024" },
              { report: "Content Engagement Analysis", date: "August 5, 2024" },
              { report: "User Growth Report", date: "August 10, 2024" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{item.report}</span>
                <span className="text-muted-foreground ml-auto">{item.date}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full shadow-sm">
              <Calendar className="mr-2 h-4 w-4" />
              View Report Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

