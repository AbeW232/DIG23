"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Clock, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "comment" | "story" | "family" | "system"
  actionUrl?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Sample notifications data
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        title: "New Comment",
        message: "John Smith commented on your story 'Family Vacation 2023'",
        timestamp: "2023-07-15T10:30:00Z",
        read: false,
        type: "comment",
        actionUrl: "/dashboard/comments",
      },
      {
        id: "2",
        title: "Story Published",
        message: "Your story 'Childhood Memories' has been published successfully",
        timestamp: "2023-07-14T15:45:00Z",
        read: false,
        type: "story",
        actionUrl: "/dashboard/story",
      },
      {
        id: "3",
        title: "Family Member Request",
        message: "Jane Doe has requested to join your family tree",
        timestamp: "2023-07-13T09:15:00Z",
        read: false,
        type: "family",
        actionUrl: "/dashboard/family-tree",
      },
      {
        id: "4",
        title: "System Update",
        message: "New features have been added to the platform",
        timestamp: "2023-07-12T14:20:00Z",
        read: true,
        type: "system",
      },
      {
        id: "5",
        title: "Comment Liked",
        message: "Mary Johnson liked your comment on 'Wedding Day'",
        timestamp: "2023-07-11T11:10:00Z",
        read: true,
        type: "comment",
        actionUrl: "/dashboard/comments",
      },
    ]

    setNotifications(sampleNotifications)
    setUnreadCount(sampleNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const deleteNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))

    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        )
      case "story":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
        )
      case "family":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        )
      case "system":
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        )
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
            <Bell className="h-4 w-4" />
          </div>
        )
    }
  }

  const renderNotification = (notification: Notification) => {
    return (
      <div
        key={notification.id}
        className={cn(
          "flex gap-3 p-3 border-b last:border-b-0 transition-colors",
          notification.read ? "opacity-70" : "bg-primary/5",
        )}
      >
        {getNotificationIcon(notification.type)}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={cn("font-medium text-sm", !notification.read && "font-semibold")}>{notification.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimestamp(notification.timestamp)}
                </span>

                {notification.actionUrl && (
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <a href={notification.actionUrl}>View</a>
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {!notification.read && (
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markAsRead(notification.id)}>
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Mark as read</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => deleteNotification(notification.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete notification</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Notification settings</span>
              </Button>
            </div>
          </div>
          <CardDescription>Stay updated with your digital legacy</CardDescription>
        </CardHeader>

        <Tabs defaultValue="all">
          <div className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[300px]">
              {notifications.length > 0 ? (
                notifications.map(renderNotification)
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                  <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground">You're all caught up!</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-[300px]">
              {notifications.filter((n) => !n.read).length > 0 ? (
                notifications.filter((n) => !n.read).map(renderNotification)
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                  <Check className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-medium">No unread notifications</p>
                  <p className="text-sm text-muted-foreground">You've read all your notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <CardFooter className="border-t p-4">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Notification Settings</span>
              <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                <a href="/dashboard/settings/notifications">Manage</a>
              </Button>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="comments" className="text-sm">
                  Comments
                </label>
                <Switch id="comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="stories" className="text-sm">
                  Story Updates
                </label>
                <Switch id="stories" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="family" className="text-sm">
                  Family Updates
                </label>
                <Switch id="family" defaultChecked />
              </div>
            </div>
          </div>
        </CardFooter>
      </PopoverContent>
    </Popover>
  )
}

