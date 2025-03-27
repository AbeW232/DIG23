"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AnalyticsRetentionChartProps {
  data: any
  options: any
}

export function AnalyticsRetentionChart({ data, options }: AnalyticsRetentionChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>User Retention</CardTitle>
          <CardDescription>How well you're retaining users over time</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <LineChart data={data} options={options} />
      </CardContent>
    </Card>
  )
}

