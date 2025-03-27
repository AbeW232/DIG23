"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, ThumbsUp, Clock, Flag } from "lucide-react"
import { motion } from "framer-motion"

export function CommentsDashboardStats({ statistics, pendingCount, flaggedCount, spamCount, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[60px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!statistics) return null

  const statCards = [
    {
      title: "Total Comments",
      value: statistics.totalComments,
      change: "+12% from last month",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Pending Review",
      value: pendingCount,
      change: pendingCount === 0 ? "All caught up!" : `${pendingCount} need attention`,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-500/10",
    },
    {
      title: "Engagement Rate",
      value: `${statistics.engagementRate}%`,
      change: "+5% from last month",
      icon: <ThumbsUp className="h-5 w-5 text-green-500" />,
      color: "bg-green-500/10",
    },
    {
      title: "Flagged Content",
      value: flaggedCount + spamCount,
      change: flaggedCount + spamCount === 0 ? "No issues detected" : `${flaggedCount + spamCount} need review`,
      icon: <Flag className="h-5 w-5 text-red-500" />,
      color: "bg-red-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

