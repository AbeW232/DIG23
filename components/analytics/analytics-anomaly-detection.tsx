"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export function AnalyticsAnomalyDetection() {
  // Sample data for anomaly detection
  const anomalyData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
      "Day 29",
      "Day 30",
    ],
    datasets: [
      {
        label: "Traffic",
        data: [
          65, 70, 68, 72, 75, 70, 68, 75, 80, 78, 82, 85, 80, 78, 82, 85, 88, 90, 85, 88, 92, 95, 90, 88, 92, 180, 95,
          98, 95, 100,
        ],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: (context) => {
          // Highlight the anomaly point (Day 26)
          return context.dataIndex === 25 ? "hsl(var(--destructive))" : "hsl(var(--primary))"
        },
        pointBorderColor: (context) => {
          return context.dataIndex === 25 ? "hsl(var(--destructive))" : "hsl(var(--primary))"
        },
        pointBorderWidth: (context) => {
          return context.dataIndex === 25 ? 2 : 1
        },
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Anomaly Detection</CardTitle>
            <CardDescription>Automatic detection of unusual patterns in your data</CardDescription>
          </div>
          <Badge variant="destructive" className="flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />1 Anomaly Detected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[300px]">
          <LineChart
            data={anomalyData}
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
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || ""
                      const value = context.parsed.y
                      if (context.dataIndex === 25) {
                        return `${label}: ${value} (ANOMALY)`
                      }
                      return `${label}: ${value}`
                    },
                  },
                },
                annotation: {
                  annotations: {
                    box1: {
                      type: "box",
                      xMin: 24.5,
                      xMax: 25.5,
                      yMin: 0,
                      yMax: 200,
                      backgroundColor: "rgba(255, 99, 132, 0.05)",
                      borderColor: "rgba(255, 99, 132, 0.3)",
                      borderWidth: 1,
                      borderDash: [5, 5],
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/10 rounded-md">
            <div className="rounded-full bg-destructive/10 p-1 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-sm">Traffic Spike Detected</p>
              <p className="text-sm text-muted-foreground mt-1">
                Unusual 125% traffic increase detected on Day 26. This is significantly above the normal pattern.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Day 26
                </Badge>
                <Badge variant="outline" className="text-xs">
                  180 visits
                </Badge>
                <Badge variant="outline" className="text-xs">
                  +125% vs average
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-3 bg-muted/30 rounded-md">
            <p className="text-sm font-medium">Possible Causes</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• External link from a popular website</li>
              <li>• Social media post going viral</li>
              <li>• Mention in newsletter or publication</li>
              <li>• Seasonal event or holiday</li>
            </ul>
            <p className="text-sm mt-2">
              <span className="font-medium">Recommendation:</span>
              <span className="text-muted-foreground">
                {" "}
                Investigate the source of this traffic to capitalize on the interest.
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

