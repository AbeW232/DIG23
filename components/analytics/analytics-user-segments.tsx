"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

export function AnalyticsUserSegments() {
  // Sample data for user segments
  const userSegmentsData = {
    labels: ["New Users", "Returning Users", "Power Users", "Inactive Users"],
    datasets: [
      {
        data: [25, 45, 20, 10],
        backgroundColor: [
          "hsl(var(--primary) / 0.8)",
          "hsl(var(--primary) / 0.6)",
          "hsl(var(--primary) / 0.4)",
          "hsl(var(--primary) / 0.2)",
        ],
        borderColor: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Segments</CardTitle>
        <CardDescription>Breakdown of your user base by engagement level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <PieChart
              data={userSegmentsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 12,
                      padding: 20,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary/80 mr-2"></div>
                  <span>New Users</span>
                </div>
                <Badge>25%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                First-time visitors who registered within the last 30 days
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary/60 mr-2"></div>
                  <span>Returning Users</span>
                </div>
                <Badge>45%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Users who visit regularly but don't contribute heavily</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary/40 mr-2"></div>
                  <span>Power Users</span>
                </div>
                <Badge>20%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Highly engaged users who create and interact with content frequently
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary/20 mr-2"></div>
                  <span>Inactive Users</span>
                </div>
                <Badge>10%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Users who haven't logged in for more than 30 days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

