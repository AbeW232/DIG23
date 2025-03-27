"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Smartphone, Laptop, Tablet } from "lucide-react"

export function AnalyticsDeviceBreakdown() {
  // Sample data for device breakdown
  const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: ["hsl(var(--primary) / 0.8)", "hsl(var(--primary) / 0.5)", "hsl(var(--primary) / 0.3)"],
        borderColor: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Breakdown</CardTitle>
        <CardDescription>How users access your content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <PieChart
              data={deviceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Laptop className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Desktop</span>
                </div>
                <span className="font-medium">55%</span>
              </div>
              <Progress value={55} className="h-2" />
              <p className="text-xs text-muted-foreground">Primary usage for longer sessions and content creation</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Mobile</span>
                </div>
                <span className="font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
              <p className="text-xs text-muted-foreground">Growing segment, primarily for content consumption</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tablet className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Tablet</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
              <Progress value={10} className="h-2" />
              <p className="text-xs text-muted-foreground">Used primarily for media viewing and browsing</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

