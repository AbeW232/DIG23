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
  MessageSquare,
  Share2,
  ThumbsUp,
  Star,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Facebook,
  Twitter,
  Mail,
  Link,
  Flag,
  CheckCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function EngagementAnalysis() {
  const [timeRange, setTimeRange] = useState("30days")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Engagement Analysis</h2>
          <p className="text-muted-foreground">Detailed analysis of user engagement with your content</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="comments">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="comments">Comment Analysis</TabsTrigger>
          <TabsTrigger value="shares">Share Metrics</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Comments"
              value="248"
              change="+32"
              trend="up"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="All comments"
            />
            <MetricCard
              title="Avg. per Story"
              value="12.4"
              change="+1.8"
              trend="up"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="Comments per story"
            />
            <MetricCard
              title="Response Rate"
              value="86%"
              change="+4.2%"
              trend="up"
              icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
              description="Comments with replies"
            />
            <MetricCard
              title="Flagged Comments"
              value="3"
              change="-2"
              trend="up"
              icon={<Flag className="h-4 w-4 text-muted-foreground" />}
              description="Reported comments"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Comment Activity</CardTitle>
                <CardDescription>Comment volume over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Comment activity trend visualization</p>
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
                <CardTitle>Comment Sentiment</CardTitle>
                <CardDescription>Analysis of comment tone and sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Positive</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Neutral</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2 bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Negative</span>
                      <span className="font-medium">4%</span>
                    </div>
                    <Progress value={4} className="h-2 bg-muted" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Comment sentiment distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Sentiment Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Most Commented Stories</CardTitle>
              <CardDescription>Stories with the highest comment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Family Vacation Memories", date: "March 15, 2024", comments: "32", sentiment: "Positive" },
                  { title: "Wedding Day Celebration", date: "February 8, 2024", comments: "28", sentiment: "Positive" },
                  { title: "Graduation Ceremony", date: "April 2, 2024", comments: "24", sentiment: "Positive" },
                  { title: "First Home Purchase", date: "January 20, 2024", comments: "18", sentiment: "Mixed" },
                  { title: "Family Reunion", date: "March 28, 2024", comments: "22", sentiment: "Positive" },
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
                      <div className="font-medium">{story.comments} comments</div>
                      <div className="text-sm text-muted-foreground">Sentiment: {story.sentiment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Comments
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shares" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Shares"
              value="87"
              change="+15"
              trend="up"
              icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
              description="All shares"
            />
            <MetricCard
              title="Social Media"
              value="45"
              change="+8"
              trend="up"
              icon={<Facebook className="h-4 w-4 text-muted-foreground" />}
              description="Social platform shares"
            />
            <MetricCard
              title="Email Shares"
              value="32"
              change="+5"
              trend="up"
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              description="Email shares"
            />
            <MetricCard
              title="Direct Links"
              value="10"
              change="+2"
              trend="up"
              icon={<Link className="h-4 w-4 text-muted-foreground" />}
              description="Direct link shares"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Share Distribution</CardTitle>
                <CardDescription>How content is shared across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                        Facebook
                      </span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-orange-500" />
                        Email
                      </span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                        Twitter
                      </span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <Link className="h-4 w-4 mr-2 text-gray-500" />
                        Direct Link
                      </span>
                      <span className="font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </div>
                <div className="h-[200px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Share distribution chart</p>
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
                <CardTitle>Share Activity</CardTitle>
                <CardDescription>Share volume over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Share activity trend visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Most Shared Stories</CardTitle>
              <CardDescription>Stories with the highest share counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Wedding Day Celebration", date: "February 8, 2024", shares: "24", platform: "Facebook" },
                  { title: "Family Vacation Memories", date: "March 15, 2024", shares: "18", platform: "Email" },
                  { title: "Graduation Ceremony", date: "April 2, 2024", shares: "15", platform: "Mixed" },
                  { title: "Family Reunion", date: "March 28, 2024", shares: "12", platform: "Twitter" },
                  { title: "First Home Purchase", date: "January 20, 2024", shares: "10", platform: "Email" },
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
                      <div className="font-medium">{story.shares} shares</div>
                      <div className="text-sm text-muted-foreground">Top platform: {story.platform}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Shares
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Average Rating"
              value="4.8/5"
              change="+0.2"
              trend="up"
              icon={<Star className="h-4 w-4 text-muted-foreground" />}
              description="Overall rating"
            />
            <MetricCard
              title="5-Star Ratings"
              value="85%"
              change="+3%"
              trend="up"
              icon={<Star className="h-4 w-4 text-muted-foreground" />}
              description="Highest rating"
            />
            <MetricCard
              title="Feedback Responses"
              value="124"
              change="+18"
              trend="up"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
              description="User feedback"
            />
            <MetricCard
              title="Satisfaction Score"
              value="92%"
              change="+4%"
              trend="up"
              icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
              description="User satisfaction"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of user ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <span className="mr-2">5 stars</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                        </div>
                      </span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <span className="mr-2">4 stars</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                          <Star className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <span className="mr-2">3 stars</span>
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-muted-foreground" />
                          ))}
                        </div>
                      </span>
                      <span className="font-medium">2%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <span className="mr-2">2 stars</span>
                        <div className="flex">
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-muted-foreground" />
                          ))}
                        </div>
                      </span>
                      <span className="font-medium">0.5%</span>
                    </div>
                    <Progress value={0.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center">
                        <span className="mr-2">1 star</span>
                        <div className="flex">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-muted-foreground" />
                          ))}
                        </div>
                      </span>
                      <span className="font-medium">0.5%</span>
                    </div>
                    <Progress value={0.5} className="h-2" />
                  </div>
                </div>
                <div className="h-[150px] flex items-center justify-center mt-6">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Rating distribution chart</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Ratings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest user feedback and comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      avatar: "SJ",
                      rating: 5,
                      comment: "Love how easy it is to organize family memories!",
                    },
                    {
                      name: "Michael Chen",
                      avatar: "MC",
                      rating: 5,
                      comment: "The interface is intuitive and beautiful.",
                    },
                    {
                      name: "Emily Davis",
                      avatar: "ED",
                      rating: 4,
                      comment: "Great platform, would love more export options.",
                    },
                    {
                      name: "Robert Wilson",
                      avatar: "RW",
                      rating: 5,
                      comment: "Perfect for preserving our family history.",
                    },
                  ].map((feedback, i) => (
                    <div key={i} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{feedback.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{feedback.name}</div>
                          <div className="flex">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                            ))}
                            {[...Array(5 - feedback.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-muted-foreground" />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{feedback.comment}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Feedback
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

