"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, MessageSquare, Share2, ThumbsUp, Clock } from "lucide-react"

export function AnalyticsEngagementMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Comments</p>
              <p className="text-2xl font-bold">124</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
            <span>12% increase vs. previous period</span>
          </div>
        </Card>

        <Card className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Shares</p>
              <p className="text-2xl font-bold">56</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Share2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
            <span>8% increase vs. previous period</span>
          </div>
        </Card>

        <Card className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Reactions</p>
              <p className="text-2xl font-bold">287</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <ThumbsUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
            <span>15% increase vs. previous period</span>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Breakdown</CardTitle>
          <CardDescription>How users interact with your content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Time Spent</span>
                </div>
                <Badge variant="outline">Avg. 3:24 per session</Badge>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">68% of users spend more than 2 minutes per session</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Comment Rate</span>
                </div>
                <Badge variant="outline">12% of visitors</Badge>
              </div>
              <Progress value={12} className="h-2" />
              <p className="text-xs text-muted-foreground">12% of visitors leave comments on content</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Share Rate</span>
                </div>
                <Badge variant="outline">8% of visitors</Badge>
              </div>
              <Progress value={8} className="h-2" />
              <p className="text-xs text-muted-foreground">8% of visitors share content with others</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Reaction Rate</span>
                </div>
                <Badge variant="outline">24% of visitors</Badge>
              </div>
              <Progress value={24} className="h-2" />
              <p className="text-xs text-muted-foreground">24% of visitors react to content</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

