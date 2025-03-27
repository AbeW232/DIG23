"use client"

import { memo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, MessageSquare, Clock, Image, Settings } from "lucide-react"

interface MemorialTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const MemorialTabs = memo(function MemorialTabs({ activeTab, onTabChange }: MemorialTabsProps) {
  const tabs = [
    { id: "stories", label: "Stories", icon: Book },
    { id: "guestbook", label: "Guestbook", icon: MessageSquare },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
})

