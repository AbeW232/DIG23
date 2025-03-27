"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCommentModeration } from "@/components/comments/enhanced-comment-moderation"
import { EnhancedCommentSettings } from "@/components/comments/enhanced-comment-settings"
import { EnhancedCommentReporting } from "@/components/comments/enhanced-comment-reporting"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Settings, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function EnhancedCommentsTabs() {
  const [activeTab, setActiveTab] = useState("moderation")
  const [pendingCount, setPendingCount] = useState(5)
  const [reportedCount, setReportedCount] = useState(3)
  const { toast } = useToast()

  // Simulate receiving a new comment notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setPendingCount((prev) => prev + 1)
      toast({
        title: "New comment received",
        description: "A new comment is waiting for moderation",
        duration: 5000,
      })
    }, 45000) // Show notification after 45 seconds

    return () => clearTimeout(timer)
  }, [toast])

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="moderation" onValueChange={setActiveTab} value={activeTab} className="w-full">
        <div className="bg-background sticky top-0 z-10 pb-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="moderation" className="relative">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Comment Moderation</span>
                {pendingCount > 0 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge variant="destructive" className="ml-1">
                      {pendingCount}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Comment Settings</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="reports" className="relative">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Comment Reports</span>
                {reportedCount > 0 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge variant="destructive" className="ml-1">
                      {reportedCount}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
            <TabsContent value="moderation" className="mt-0">
              <EnhancedCommentModeration pendingCount={pendingCount} setPendingCount={setPendingCount} />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <EnhancedCommentSettings />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <EnhancedCommentReporting reportedCount={reportedCount} setReportedCount={setReportedCount} />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

