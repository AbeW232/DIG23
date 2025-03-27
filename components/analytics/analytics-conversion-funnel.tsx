"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDownRight } from "lucide-react"

export function AnalyticsConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User journey through your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Visitors</p>
                <p className="text-sm text-muted-foreground">Total unique visitors</p>
              </div>
              <p className="text-xl font-bold">1,248</p>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="flex items-center justify-center">
            <ArrowDownRight className="h-6 w-6 text-muted-foreground rotate-45" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Content Viewers</p>
                <p className="text-sm text-muted-foreground">Viewed at least one story</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">986</p>
                <p className="text-sm text-muted-foreground">79% of visitors</p>
              </div>
            </div>
            <Progress value={79} className="h-2" />
          </div>

          <div className="flex items-center justify-center">
            <ArrowDownRight className="h-6 w-6 text-muted-foreground rotate-45" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Engaged Users</p>
                <p className="text-sm text-muted-foreground">Commented, shared, or reacted</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">423</p>
                <p className="text-sm text-muted-foreground">34% of visitors</p>
              </div>
            </div>
            <Progress value={34} className="h-2" />
          </div>

          <div className="flex items-center justify-center">
            <ArrowDownRight className="h-6 w-6 text-muted-foreground rotate-45" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Return Visitors</p>
                <p className="text-sm text-muted-foreground">Came back within 7 days</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">312</p>
                <p className="text-sm text-muted-foreground">25% of visitors</p>
              </div>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

