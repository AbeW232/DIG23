"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { DataCard } from "@/components/ui/data-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Image,
  MessageSquare,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Users,
} from "lucide-react"

export function OverviewDashboard() {
  const [loading, setLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState("week")
  const [activityFilter, setActivityFilter] = useState("all")
  const [progress, setProgress] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate progress animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  // Format date for last updated
  const formatLastUpdated = (date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.round((date - new Date()) / (1000 * 60)),
      "minute",
    )
  }

  // Handle refresh data
  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLastUpdated(new Date())
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">An easy way to manage your digital legacy with care and precision.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1 bg-accent text-brand hover:bg-accent/90"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Story
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex items-center rounded-md border border-border bg-background p-1 text-sm">
          <Button
            variant="ghost"
            size="sm"
            className={timeFilter === "day" ? "bg-accent text-brand" : ""}
            onClick={() => setTimeFilter("day")}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeFilter === "week" ? "bg-accent text-brand" : ""}
            onClick={() => setTimeFilter("week")}
          >
            This Week
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={timeFilter === "month" ? "bg-accent text-brand" : ""}
            onClick={() => setTimeFilter("month")}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DataCard
          title="Total Stories"
          value="193"
          icon={<FileText />}
          trend={{
            value: "+35%",
            direction: "up",
            label: "from last month",
          }}
          loading={loading}
        />

        <DataCard
          title="Active Users"
          value="32"
          icon={<Users />}
          trend={{
            value: "-24%",
            direction: "down",
            label: "from last month",
          }}
          loading={loading}
        />

        <DataCard
          title="Media Uploads"
          value="565"
          icon={<Image />}
          trend={{
            value: "+68%",
            direction: "up",
            label: "from last month",
          }}
          loading={loading}
        />

        <DataCard
          title="Engagement Rate"
          value="23%"
          icon={<BarChart3 />}
          trend={{
            value: "+16%",
            direction: "up",
            label: "from last month",
          }}
          loading={loading}
        />
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="stories">Stories</SelectItem>
                <SelectItem value="collaborators">Collaborators</SelectItem>
                <SelectItem value="comments">Comments</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Date</th>
                <th>Status</th>
                <th>ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Family Vacation Story</div>
                    <div className="text-sm text-muted-foreground">Jul 12th 2024</div>
                  </div>
                </td>
                <td>Jul 12th 2024</td>
                <td>
                  <StatusBadge status="completed">Completed</StatusBadge>
                </td>
                <td className="text-muted-foreground">0JWEJS7ISNC</td>
                <td className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                    <Image className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Photo Album Upload</div>
                    <div className="text-sm text-muted-foreground">Jul 10th 2024</div>
                  </div>
                </td>
                <td>Jul 10th 2024</td>
                <td>
                  <StatusBadge status="pending">Pending</StatusBadge>
                </td>
                <td className="text-muted-foreground">0JWEJS7ISNC</td>
                <td className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Comment on "Childhood Memories"</div>
                    <div className="text-sm text-muted-foreground">Jul 8th 2024</div>
                  </div>
                </td>
                <td>Jul 8th 2024</td>
                <td>
                  <StatusBadge status="completed">Completed</StatusBadge>
                </td>
                <td className="text-muted-foreground">0JWEJS7ISNC</td>
                <td className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Family Member Added</div>
                    <div className="text-sm text-muted-foreground">Jul 5th 2024</div>
                  </div>
                </td>
                <td>Jul 5th 2024</td>
                <td>
                  <StatusBadge status="completed">Completed</StatusBadge>
                </td>
                <td className="text-muted-foreground">0JWEJS7ISNC</td>
                <td className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
          <span>Showing recent activity from the past 7 days</span>
          <Button variant="ghost" size="sm" className="gap-1 h-8">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Progress Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals Progress</CardTitle>
            <CardDescription>Track your progress toward this month's targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">New Stories (24/30)</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} className="h-2 bg-muted" indicatorClassName="bg-accent" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Family Engagement (8/15)</span>
                <span className="text-sm text-muted-foreground">53%</span>
              </div>
              <Progress value={53} className="h-2 bg-muted" indicatorClassName="bg-accent" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Media Uploads (45/50)</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2 bg-muted" indicatorClassName="bg-accent" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              View All Goals
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Family events and important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-10 w-10 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Dad's Birthday</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>July 28, 2024 (2 weeks away)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Remind
              </Button>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-10 w-10 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Family Reunion</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>August 15, 2024 (1 month away)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Remind
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-accent/20 flex items-center justify-center text-brand">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Wedding Anniversary</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>September 3, 2024 (2 months away)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Remind
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upgrade Card */}
      <Card className="bg-brand/5 border-brand/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Level up your digital legacy</h3>
              <p className="text-muted-foreground mb-4">
                Unlock premium features to enhance your storytelling experience.
              </p>
              <Button className="bg-accent text-brand hover:bg-accent/90">Upgrade to Premium</Button>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#B4E94E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#B4E94E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#B4E94E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

