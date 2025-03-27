"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export function AnalyticsErrorState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Loading Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We encountered an error while loading your analytics data. This could be due to a temporary service
            disruption or connectivity issue.
          </p>
          <Button className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Loading
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

