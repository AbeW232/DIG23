"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function AnalyticsCorrelationFinder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Correlation Finder</CardTitle>
        <CardDescription>Discover relationships between different metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Content Length vs. Engagement</p>
              <Badge variant="outline">Strong Correlation (0.87)</Badge>
            </div>
            <Progress value={87} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Longer stories (800+ words) receive 2.3x more engagement than shorter ones.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Image Count vs. Time on Page</p>
              <Badge variant="outline">Strong Correlation (0.82)</Badge>
            </div>
            <Progress value={82} className="h-2" />
            <p className="text-xs text-muted-foreground">Stories with 5+ images have 78% longer average view times.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Video Content vs. Sharing Rate</p>
              <Badge variant="outline">Moderate Correlation (0.65)</Badge>
            </div>
            <Progress value={65} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Stories with embedded videos are shared 1.5x more frequently.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Publishing Time vs. Initial Views</p>
              <Badge variant="outline">Moderate Correlation (0.58)</Badge>
            </div>
            <Progress value={58} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Content published between 6-8pm receives 42% more initial views.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Comment Count vs. Return Visits</p>
              <Badge variant="outline">Weak Correlation (0.32)</Badge>
            </div>
            <Progress value={32} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Stories with more comments show a slight increase in return visits.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

