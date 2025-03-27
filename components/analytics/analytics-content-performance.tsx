"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

export function AnalyticsContentPerformance() {
  // Sample data for content performance
  const contentPerformanceData = {
    labels: ["Family Vacation", "Childhood Memories", "Wedding Day", "Graduation", "First Home"],
    datasets: [
      {
        label: "Views",
        data: [120, 90, 80, 60, 40],
        backgroundColor: "hsl(var(--primary) / 0.6)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>Detailed metrics for your stories and media</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Top Stories</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Family Vacation 2023",
                    views: 245,
                    engagement: "High",
                    avgTime: "4:12",
                    trend: "up",
                    change: "+12%",
                  },
                  {
                    title: "Childhood Memories",
                    views: 189,
                    engagement: "Medium",
                    avgTime: "3:45",
                    trend: "up",
                    change: "+8%",
                  },
                  {
                    title: "Wedding Day",
                    views: 156,
                    engagement: "High",
                    avgTime: "5:20",
                    trend: "up",
                    change: "+15%",
                  },
                  {
                    title: "Graduation",
                    views: 124,
                    engagement: "Medium",
                    avgTime: "2:50",
                    trend: "down",
                    change: "-3%",
                  },
                  {
                    title: "First Home",
                    views: 98,
                    engagement: "Low",
                    avgTime: "1:35",
                    trend: "neutral",
                    change: "0%",
                  },
                ].map((story, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{story.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <span>{story.views} views</span>
                        <span>•</span>
                        <span>{story.avgTime} avg. time</span>
                        <span>•</span>
                        <span className="flex items-center">
                          {story.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : story.trend === "down" ? (
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          ) : (
                            <ArrowRight className="h-3 w-3 text-gray-500 mr-1" />
                          )}
                          {story.change}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        story.engagement === "High"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : story.engagement === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {story.engagement} Engagement
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Content Type Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Stories</span>
                    <span className="font-medium">78% engagement</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Photos</span>
                    <span className="font-medium">92% engagement</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Videos</span>
                    <span className="font-medium">64% engagement</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Audio</span>
                    <span className="font-medium">45% engagement</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Documents</span>
                    <span className="font-medium">32% engagement</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Media Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Most Viewed Photos</p>
                  <div className="space-y-2">
                    {[
                      { title: "Family Portrait", views: 178, trend: "up", change: "+15%" },
                      { title: "Beach Sunset", views: 145, trend: "up", change: "+8%" },
                      { title: "Birthday Party", views: 112, trend: "down", change: "-3%" },
                    ].map((photo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm">{photo.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{photo.views} views</span>
                          <span className="ml-2 flex items-center">
                            {photo.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
                            )}
                            {photo.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Most Viewed Videos</p>
                  <div className="space-y-2">
                    {[
                      { title: "Wedding Dance", views: 203, trend: "up", change: "+22%" },
                      { title: "Graduation Speech", views: 167, trend: "up", change: "+12%" },
                      { title: "Baby's First Steps", views: 134, trend: "up", change: "+18%" },
                    ].map((video, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="text-sm">{video.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{video.views} views</span>
                          <span className="ml-2 flex items-center">
                            {video.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
                            )}
                            {video.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Engagement Over Time</CardTitle>
          <CardDescription>How user engagement has changed over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <BarChart
            data={contentPerformanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

