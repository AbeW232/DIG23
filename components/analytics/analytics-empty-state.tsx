"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, PlusCircle } from "lucide-react"

export function AnalyticsEmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-muted-foreground" />
            No Analytics Data Yet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Start creating and sharing content to generate analytics data. Once you have some activity, you'll see
            insights and metrics here.
          </p>
          <Button className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Story
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

