"use client"

import React from "react"

import { useState, useCallback, useMemo, Suspense, lazy, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  BookOpen,
  ImageIcon,
  BarChart3,
  MessageSquare,
  Clock,
  User,
  Edit,
  Eye,
  Calendar,
  ChevronRight,
  Users,
  FileText,
  PlusCircle,
  Bell,
  ArrowUpRight,
  Heart,
  Star,
  FolderTree,
  Settings,
  PanelTop,
  Home,
  Search,
  MoreHorizontal,
} from "lucide-react"

// Dynamically import heavy components
const BarChart = dynamic(() => import("@/components/ui/chart").then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

const LineChart = dynamic(() => import("@/components/ui/chart").then((mod) => mod.LineChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

const PieChart = dynamic(() => import("@/components/ui/chart").then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

// Skeleton loaders
function ChartSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-[240px] bg-muted/30 rounded-md animate-pulse flex items-center justify-center">
        <BarChart3 className="h-10 w-10 text-muted-foreground/40" />
      </div>
    </div>
  )
}

// Lazy load below-the-fold content
const GoalsAndTrendsSection = lazy(() => import("./dashboard-sections/goals-trends-section"))
const PremiumFeaturesCard = lazy(() => import("./dashboard-sections/premium-features-card"))

export function EnhancedDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("week")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Memoize handlers to prevent unnecessary re-renders
  const handleCreateStory = useCallback(() => {
    setIsLoading(true)
    router.push("/dashboard/story/editor")
  }, [router])

  const handleUploadMedia = useCallback(() => {
    setIsLoading(true)
    router.push("/dashboard/media/upload")
  }, [router])

  const handleInviteFamily = useCallback(() => {
    toast({
      title: "Invite Family",
      description: "Family invitation feature initiated",
      duration: 3000,
    })
  }, [toast])

  const handleAIAssistant = useCallback(() => {
    setIsLoading(true)
    router.push("/dashboard/ai-tools")
  }, [router])

  const handleSettings = useCallback(() => {
    setIsLoading(true)
    router.push("/dashboard/settings")
  }, [router])

  const handleNotifications = useCallback(() => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
      duration: 3000,
    })
  }, [toast])

  // Memoize chart data to prevent recalculations on re-renders
  const chartData = useMemo(
    () => ({
      barChartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Stories",
            data: [12, 19, 8, 15, 12, 18, 9],
            backgroundColor: "rgba(10, 59, 44, 0.6)",
            borderColor: "rgba(10, 59, 44, 1)",
            borderWidth: 1,
          },
          {
            label: "Media",
            data: [8, 15, 12, 9, 7, 11, 15],
            backgroundColor: "rgba(180, 233, 78, 0.6)",
            borderColor: "rgba(180, 233, 78, 1)",
            borderWidth: 1,
          },
        ],
      },
      lineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Visitors",
            data: [65, 78, 90, 81, 95, 110],
            borderColor: "rgba(10, 59, 44, 1)",
            backgroundColor: "rgba(10, 59, 44, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      pieChartData: {
        labels: ["Stories", "Photos", "Videos", "Audio", "Documents"],
        datasets: [
          {
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              "rgba(10, 59, 44, 0.8)",
              "rgba(180, 233, 78, 0.8)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
            ],
            borderColor: [
              "rgba(10, 59, 44, 1)",
              "rgba(180, 233, 78, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    }),
    [],
  )

  // Memoize chart options to prevent recalculations
  const chartOptions = useMemo(
    () => ({
      pie: {
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              padding: 10,
            },
          },
        },
        maintainAspectRatio: false,
      },
      bar: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      line: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        elements: {
          line: {
            tension: 0.3,
          },
        },
      },
    }),
    [],
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Digital Legacy Dashboard</h1>
          <Badge variant="outline" className="ml-2">
            Admin
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="pl-9 bg-muted/40 border-none focus-visible:ring-1"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 transition-all hover:bg-primary/10"
            onClick={handleNotifications}
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            <Badge variant="secondary" className="ml-1">
              3
            </Badge>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1 transition-all hover:scale-105 bg-primary text-primary-foreground"
            onClick={handleCreateStory}
            aria-label="Create new story"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <PlusCircle className="h-4 w-4 mr-1" />
            )}
            New Story
          </Button>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            An easy way to manage your digital legacy with care and precision.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px] bg-white border shadow-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Time period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Update Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 bg-primary text-primary-foreground overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary-foreground/20 text-primary-foreground">
                Update
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-primary-foreground/80">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
            <h3 className="text-xl font-bold mt-1">Stories created increased</h3>
            <div className="text-3xl font-bold mt-1">
              40% <span className="text-base font-normal">in 1 week</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => router.push("/dashboard/analytics")}
            >
              See Statistics
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Key Metrics Cards */}
        <Card className="md:col-span-1 overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Total Stories</CardTitle>
              <CardDescription>All-time created stories</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">193</span>
              <span className="ml-2 text-sm flex items-center text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +35% from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Media Uploads</CardTitle>
              <CardDescription>Photos, videos & more</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">565</span>
              <span className="ml-2 text-sm flex items-center text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +68% from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Quick Access</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <QuickAccessButton icon={<Home />} label="Overview" href="/dashboard" active={true} />
          <QuickAccessButton icon={<BookOpen />} label="Story Management" href="/dashboard/story" />
          <QuickAccessButton icon={<ImageIcon />} label="Media Library" href="/dashboard/media" />
          <QuickAccessButton icon={<BarChart3 />} label="Analytics" href="/dashboard/analytics" />
          <QuickAccessButton icon={<PanelTop />} label="Exhibitions" href="/dashboard/exhibitions" />
          <QuickAccessButton icon={<MessageSquare />} label="Comments" href="/dashboard/comments" />
          <QuickAccessButton icon={<FolderTree />} label="Family Tree" href="/dashboard/family-tree" />
          <QuickAccessButton icon={<Users />} label="User Management" href="/dashboard/users" />
          <QuickAccessButton icon={<User />} label="Profile" href="/dashboard/profile" />
          <QuickAccessButton icon={<Settings />} label="Settings" href="/dashboard/settings" onClick={handleSettings} />
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row - Optimized with dynamic imports and skeleton loaders */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-1 overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Content Distribution</CardTitle>
                  <CardDescription>Breakdown by content type</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <PieChart data={chartData.pieChartData} options={chartOptions.pie} />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Weekly Activity</CardTitle>
                  <CardDescription>Content creation over time</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <BarChart data={chartData.barChartData} options={chartOptions.bar} />
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed and Upcoming Events - Optimized with virtualized scrolling */}
          <div className="grid gap-6 md:grid-cols-2">
            <ActivityFeedCard router={router} />
            <UpcomingEventsCard router={router} toast={toast} />
          </div>

          {/* Lazy loaded below-the-fold content */}
          <Suspense fallback={<SectionSkeleton />}>
            <GoalsAndTrendsSection
              router={router}
              chartData={chartData.lineChartData}
              chartOptions={chartOptions.line}
            />
          </Suspense>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentManagementTab router={router} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityLogTab router={router} />
        </TabsContent>
      </Tabs>

      {/* Premium Features Card */}
      <Suspense fallback={<SectionSkeleton />}>
        <PremiumFeaturesCard router={router} />
      </Suspense>
    </div>
  )
}

// Content Management Tab
function ContentManagementTab({ router }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Stories</CardTitle>
          <CardDescription>Your recently created and edited stories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Family Vacation Memories {i}</h4>
                    <p className="text-sm text-muted-foreground">Last edited: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={i === 1 ? "default" : "outline"}>{i === 1 ? "Draft" : "Published"}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/story/editor/${i}`)}>
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard/story")}>
            View All Stories
          </Button>
          <Button variant="default" onClick={() => router.push("/dashboard/story/editor")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Story
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>Recently uploaded media files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative aspect-square rounded-md bg-muted/50 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-white">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard/media/browse")}>
            Browse Media
          </Button>
          <Button variant="default" onClick={() => router.push("/dashboard/media/upload")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Activity Log Tab
function ActivityLogTab({ router }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Recent actions and system events</CardDescription>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="story">Story Activities</SelectItem>
            <SelectItem value="media">Media Activities</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
            <SelectItem value="system">System Events</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <ActivityItem
                key={i}
                icon={
                  i % 4 === 0 ? (
                    <Edit className="h-5 w-5 text-primary" />
                  ) : i % 4 === 1 ? (
                    <ImageIcon className="h-5 w-5 text-primary" />
                  ) : i % 4 === 2 ? (
                    <MessageSquare className="h-5 w-5 text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary" />
                  )
                }
                iconBackground="bg-primary/10"
                title={
                  i % 4 === 0
                    ? "Story Updated"
                    : i % 4 === 1
                      ? "Media Uploaded"
                      : i % 4 === 2
                        ? "New Comment"
                        : "Story Viewed"
                }
                description={
                  i % 4 === 0
                    ? "You updated 'Family Vacation Memories'"
                    : i % 4 === 1
                      ? "You uploaded 12 new photos to 'Family Album'"
                      : i % 4 === 2
                        ? "Jane Doe commented on your story 'Childhood Memories'"
                        : "Your story 'Family History' received 24 new views"
                }
                timestamp={`${i + 1} ${i === 0 ? "hour" : "hours"} ago`}
                avatar={i % 4 === 2 ? { fallback: "JD" } : undefined}
                actions={
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                    View
                  </Button>
                }
                border={i < 14}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Activity Feed Card - Extracted as a separate component for better code splitting
function ActivityFeedCard({ router }) {
  const handleViewActivity = useCallback(() => {
    router.push("/dashboard/activity")
  }, [router])

  const handleViewStory = useCallback(() => {
    router.push("/dashboard/story/view/1")
  }, [router])

  const handleViewMedia = useCallback(() => {
    router.push("/dashboard/media/browse")
  }, [router])

  const handleViewComments = useCallback(() => {
    router.push("/dashboard/comments")
  }, [router])

  const handleViewAnalytics = useCallback(() => {
    router.push("/dashboard/analytics/content")
  }, [router])

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="px-4">
            <ActivityItem
              icon={<Edit className="h-5 w-5 text-primary" />}
              iconBackground="bg-primary/10"
              title="Story Updated"
              description="You updated 'Family Vacation Memories'"
              timestamp="2 hours ago"
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={handleViewStory}
                >
                  View
                </Button>
              }
            />
            <ActivityItem
              icon={<ImageIcon className="h-5 w-5 text-primary" />}
              iconBackground="bg-primary/10"
              title="Media Uploaded"
              description="You uploaded 12 new photos to 'Family Album'"
              timestamp="Yesterday"
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={handleViewMedia}
                >
                  View
                </Button>
              }
            />
            <ActivityItem
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
              iconBackground="bg-primary/10"
              title="New Comment"
              description="Jane Doe commented on your story 'Childhood Memories'"
              timestamp="2 days ago"
              avatar={{ fallback: "JD" }}
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={handleViewComments}
                >
                  Reply
                </Button>
              }
            />
            <ActivityItem
              icon={<Eye className="h-5 w-5 text-primary" />}
              iconBackground="bg-primary/10"
              title="Story Viewed"
              description="Your story 'Family History' received 24 new views"
              timestamp="3 days ago"
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={handleViewAnalytics}
                >
                  Stats
                </Button>
              }
              border={false}
            />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full group hover:bg-primary/10 transition-colors"
          size="sm"
          className="w-full group hover:bg-primary/10 transition-colors"
          onClick={handleViewActivity}
        >
          View All Activity
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Upcoming Events Card - Extracted as a separate component
function UpcomingEventsCard({ router, toast }) {
  const handleViewCalendar = useCallback(() => {
    router.push("/dashboard/calendar")
  }, [router])

  const handleSetReminder = useCallback(
    (eventName) => {
      toast({
        title: "Reminder Set",
        description: `You'll be reminded about ${eventName}`,
        duration: 3000,
      })
    },
    [toast],
  )

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-medium">Upcoming Events</CardTitle>
          <CardDescription>Family events and important dates</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/10"
          onClick={handleViewCalendar}
        >
          <Calendar className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="px-4">
            <EventItem
              title="Dad's Birthday"
              date="July 28, 2024"
              timeLeft="2 weeks away"
              type="birthday"
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={() => handleSetReminder("Dad's Birthday")}
                >
                  Remind
                </Button>
              }
            />
            <EventItem
              title="Family Reunion"
              date="August 15, 2024"
              timeLeft="1 month away"
              type="event"
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={() => handleSetReminder("Family Reunion")}
                >
                  Remind
                </Button>
              }
            />
            <EventItem
              title="Wedding Anniversary"
              date="September 3, 2024"
              timeLeft="2 months away"
              type="anniversary"
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={() => handleSetReminder("Wedding Anniversary")}
                >
                  Remind
                </Button>
              }
            />
            <EventItem
              title="Graduation Ceremony"
              date="October 12, 2024"
              timeLeft="3 months away"
              type="milestone"
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 transition-colors"
                  onClick={() => handleSetReminder("Graduation Ceremony")}
                >
                  Remind
                </Button>
              }
              border={false}
            />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full group hover:bg-primary/10 transition-colors"
          onClick={handleViewCalendar}
        >
          View Calendar
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Activity Item Component - Optimized with memoization
const ActivityItem = React.memo(function ActivityItem({
  icon,
  iconBackground,
  title,
  description,
  timestamp,
  avatar,
  actions,
  border = true,
}) {
  return (
    <div
      className={`flex items-start gap-4 p-4 group hover:bg-muted/50 rounded-md transition-colors ${
        border ? "border-b" : ""
      }`}
    >
      {icon && (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconBackground}`}>
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="text-sm font-medium truncate">{title}</h4>
            {avatar && (
              <Avatar className="h-5 w-5 flex-shrink-0">
                <AvatarImage alt="Avatar" />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            )}
          </div>
          {timestamp && (
            <span className="text-xs text-muted-foreground flex items-center flex-shrink-0">
              <Clock className="h-3 w-3 mr-1" />
              {timestamp}
            </span>
          )}
        </div>

        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>

      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  )
})

// Event Item Component - Optimized with memoization
const EventItem = React.memo(function EventItem({ title, date, timeLeft, type, actions, border = true }) {
  const getEventIcon = (type) => {
    switch (type) {
      case "birthday":
        return <Gift className="h-5 w-5 text-pink-500" />
      case "anniversary":
        return <Heart className="h-5 w-5 text-red-500" />
      case "milestone":
        return <Star className="h-5 w-5 text-amber-500" />
      default:
        return <Calendar className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 group hover:bg-muted/50 rounded-md transition-colors ${
        border ? "border-b" : ""
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {getEventIcon(type)}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Badge variant="outline" className="text-xs">
            {timeLeft}
          </Badge>
        </div>
      </div>

      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  )
})

// Quick Access Button Component - Optimized with Next.js Link and prefetching
function QuickAccessButton({ icon, label, href, active = false, onClick }) {
  const router = useRouter()

  const handleClick = useCallback(
    (e) => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    },
    [onClick],
  )

  // Prefetch the link when component mounts
  useEffect(() => {
    router.prefetch(href)
  }, [router, href])

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
        active ? "bg-primary text-primary-foreground" : "bg-white shadow-sm hover:bg-primary/10 text-foreground"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}

// Gift icon component for the EventItem
function Gift({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="8" width="18" height="4" rx="1"></rect>
      <path d="M12 8v13"></path>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
    </svg>
  )
}

// Compact Action Button Component - Optimized with loading state
function CompactActionButton({ icon, label, onClick, ariaLabel, isLoading }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      aria-label={ariaLabel || label}
      disabled={isLoading}
      className="flex items-center gap-2 px-3 py-1.5 h-auto bg-white shadow-sm hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all group"
    >
      <div className="rounded-full bg-primary/10 p-1 group-hover:bg-primary/20 transition-colors">
        {isLoading ? (
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          icon
        )}
      </div>
      <span className="font-medium text-xs">{label}</span>
    </Button>
  )
}

// Section skeleton for lazy-loaded components
function SectionSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  )
}

