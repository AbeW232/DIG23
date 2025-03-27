"use client"

import { useCallback } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart } from "@/components/ui/chart"
import { BookOpen, Users, ImageIcon, MessageSquare, Settings, BarChart3, MoreHorizontal } from "lucide-react"
import { GoalItem } from "../dashboard-components/goal-item"

export default function GoalsAndTrendsSection({ router, chartData, chartOptions }) {
  const handleManageGoals = useCallback(() => {
    router.push("/dashboard/goals")
  }, [router])

  const handleViewAnalytics = useCallback(() => {
    router.push("/dashboard/analytics")
  }, [router])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="overflow-hidden transition-all hover:shadow-md bg-white">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Monthly Goals</CardTitle>
            <CardDescription>Track your progress toward this month's targets</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoalItem
            title="New Stories"
            current={24}
            target={30}
            percentage={80}
            icon={<BookOpen className="h-4 w-4 text-primary" />}
          />
          <GoalItem
            title="Family Engagement"
            current={8}
            target={15}
            percentage={53}
            icon={<Users className="h-4 w-4 text-primary" />}
          />
          <GoalItem
            title="Media Uploads"
            current={45}
            target={50}
            percentage={90}
            icon={<ImageIcon className="h-4 w-4 text-primary" />}
          />
          <GoalItem
            title="Comments & Interactions"
            current={32}
            target={60}
            percentage={53}
            icon={<MessageSquare className="h-4 w-4 text-primary" />}
          />
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-primary/10 transition-colors"
            onClick={handleManageGoals}
          >
            Manage Goals
            <Settings className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden transition-all hover:shadow-md bg-white">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Visitor Trends</CardTitle>
            <CardDescription>How your audience is growing</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <LineChart data={chartData} options={chartOptions} />
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-primary/10 transition-colors"
            onClick={handleViewAnalytics}
          >
            View Analytics
            <BarChart3 className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

