"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"

export function AnalyticsPredictiveInsights() {
  // Sample data for predictive insights
  const predictiveData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Historical",
        data: [65, 70, 75, 70, 75, 80, 85, 90, 95, 100, 105, 110],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "transparent",
        tension: 0.3,
      },
      {
        label: "Predicted",
        data: [110, 115, 120, 125, 130, 135],
        borderColor: "hsl(var(--primary) / 0.5)",
        backgroundColor: "transparent",
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Predictive Insights</CardTitle>
            <CardDescription>AI-powered predictions based on your historical data</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/5">
            <TrendingUp className="h-3 w-3 mr-1 text-primary" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[300px]">
          <LineChart
            data={predictiveData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                },
              },
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-md">
            <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Growth Prediction</p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on current trends, we predict a 25% increase in user engagement over the next 6 months.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-md">
            <div className="rounded-full bg-yellow-500/10 p-1 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Seasonal Pattern Detected</p>
              <p className="text-sm text-muted-foreground mt-1">
                We've detected a seasonal pattern in your content engagement. Consider planning special content for the
                upcoming holiday season.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-md">
            <div className="rounded-full bg-blue-500/10 p-1 mt-0.5">
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-sm">Recommendation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on user behavior analysis, we recommend focusing on video content to maximize engagement growth.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

