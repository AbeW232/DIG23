"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import {
  BarChart,
  LineChart,
  PieChart,
  FileText,
  Image,
  Video,
  FileAudio,
  File,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ContentInsights() {
  const [timeRange, setTimeRange] = useState("30days")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Insights</h2>
          <p className="text-muted-foreground">Detailed analysis of your content performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="popular">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="popular">Popular Stories</TabsTrigger>
          <TabsTrigger value="media">Media Performance</TabsTrigger>
          <TabsTrigger value="interaction">Interaction Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Top Story Views"
              value="1,245"
              change="+18.2%"
              trend="up"
              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
              description="Most viewed story"
            />
            <MetricCard
              title="Avg. Story Views"
              value="87"
              change="+5.3%"
              trend="up"
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
              description="Per story average"
            />
            <MetricCard
              title="Most Commented"
              value="Family Trip"
              change="32 comments"
              trend="neutral"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="Most engaging story"
            />
            <MetricCard
              title="Most Shared"
              value="Wedding Day"
              change="24 shares"
              trend="neutral"
              icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
              description="Most shared story"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Stories</CardTitle>
              <CardDescription>Your most popular stories based on views and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Family Vacation Memories", date: "March 15, 2024", views: "1,245", comments: "32" },
                  { title: "Wedding Day Celebration", date: "February 8, 2024", views: "987", comments: "28" },
                  { title: "Graduation Ceremony", date: "April 2, 2024", views: "856", comments: "24" },
                  { title: "First Home Purchase", date: "January 20, 2024", views: "742", comments: "18" },
                  { title: "Family Reunion", date: "March 28, 2024", views: "685", comments: "22" },
                ].map((story, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="font-bold text-lg text-muted-foreground">{i + 1}.</div>
                      <div>
                        <div className="font-medium">{story.title}</div>
                        <div className="text-sm text-muted-foreground">Published on {story.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{story.views} views</div>
                      <div className="text-sm text-muted-foreground">{story.comments} comments</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Stories
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Story Performance Over Time</CardTitle>
                <CardDescription>View trends for your top stories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Story performance trend visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Categories</CardTitle>
                <CardDescription>Performance by story category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Family Events</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Personal Milestones</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Travel Memories</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Childhood Stories</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Other</span>
                      <span className="font-medium">4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>
                <div className="h-[150px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Category distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Photos"
              value="2,456"
              change="+324"
              trend="up"
              icon={<Image className="h-4 w-4 text-muted-foreground" />}
              description="Total photos"
            />
            <MetricCard
              title="Videos"
              value="342"
              change="+48"
              trend="up"
              icon={<Video className="h-4 w-4 text-muted-foreground" />}
              description="Total videos"
            />
            <MetricCard
              title="Audio"
              value="128"
              change="+16"
              trend="up"
              icon={<FileAudio className="h-4 w-4 text-muted-foreground" />}
              description="Total audio files"
            />
            <MetricCard
              title="Documents"
              value="86"
              change="+12"
              trend="up"
              icon={<File className="h-4 w-4 text-muted-foreground" />}
              description="Total documents"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Media Engagement</CardTitle>
                <CardDescription>How users interact with different media types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Photos</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          92% viewed
                        </Badge>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Videos</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          86% viewed
                        </Badge>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Audio</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          64% played
                        </Badge>
                        <span className="font-medium">Medium</span>
                      </div>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Documents</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          42% opened
                        </Badge>
                        <span className="font-medium">Low</span>
                      </div>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Media engagement visualization</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Media</CardTitle>
                <CardDescription>Your most viewed media assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Photo", title: "Family Reunion Group Photo", views: "845", format: "JPG" },
                    { type: "Video", title: "Wedding Ceremony", views: "732", format: "MP4" },
                    { type: "Photo", title: "Graduation Day", views: "624", format: "PNG" },
                    { type: "Audio", title: "Grandpa's Stories", views: "518", format: "MP3" },
                    { type: "Photo", title: "First Birthday Party", views: "492", format: "JPG" },
                  ].map((media, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="font-bold text-lg text-muted-foreground">{i + 1}.</div>
                        <div>
                          <div className="font-medium">{media.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {media.type} • {media.format}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{media.views} views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Media
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interaction" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Avg. Engagement"
              value="24.8%"
              change="+3.2%"
              trend="up"
              icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
              description="Overall engagement rate"
            />
            <MetricCard
              title="Comments"
              value="248"
              change="+32"
              trend="up"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="Total comments"
            />
            <MetricCard
              title="Shares"
              value="87"
              change="+15"
              trend="up"
              icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
              description="Social & email shares"
            />
            <MetricCard
              title="Avg. Time on Content"
              value="3:24"
              change="+0:32"
              trend="up"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              description="Time spent per item"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Interaction by Content Type</CardTitle>
                <CardDescription>How users interact with different content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Stories</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          32% engagement
                        </Badge>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Photos</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          28% engagement
                        </Badge>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Videos</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          24% engagement
                        </Badge>
                        <span className="font-medium">Medium</span>
                      </div>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Audio</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          18% engagement
                        </Badge>
                        <span className="font-medium">Medium</span>
                      </div>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Documents</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          12% engagement
                        </Badge>
                        <span className="font-medium">Low</span>
                      </div>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
                <div className="h-[150px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interaction rate visualization</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interaction Trends</CardTitle>
                <CardDescription>Engagement metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interaction trends visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  description: string
}

function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center">
            {trend === "up" ? (
              <ArrowUpRight className="inline h-3 w-3 mr-1 text-green-500" />
            ) : trend === "down" ? (
              <ArrowDownRight className="inline h-3 w-3 mr-1 text-red-500" />
            ) : (
              <ArrowRight className="inline h-3 w-3 mr-1 text-gray-500" />
            )}
            {change} from last period
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

