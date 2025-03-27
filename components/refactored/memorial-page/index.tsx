"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MemorialHeader } from "./memorial-header"
import { MemorialTabs } from "./memorial-tabs"
import { MemorialStories } from "./memorial-stories"
import { MemorialGuestbook } from "./memorial-guestbook"
import { MemorialTimeline } from "./memorial-timeline"
import { MemorialGallery } from "./memorial-gallery"
import { MemorialSettings } from "./memorial-settings"
import { fetchMemorial } from "@/lib/api/memorial"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

type MemorialTab = "stories" | "guestbook" | "timeline" | "gallery" | "settings"

export function MemorialPage() {
  const [activeTab, setActiveTab] = useState<MemorialTab>("stories")

  const {
    data: memorial,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memorial"],
    queryFn: fetchMemorial,
  })

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error || !memorial) {
    return <div className="p-4 text-red-500">Failed to load memorial page. Please try again.</div>
  }

  return (
    <div className="space-y-6">
      <MemorialHeader memorial={memorial} />

      <MemorialTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as MemorialTab)} />

      <div className="mt-6">
        {activeTab === "stories" && <MemorialStories memorialId={memorial.id} />}
        {activeTab === "guestbook" && <MemorialGuestbook memorialId={memorial.id} />}
        {activeTab === "timeline" && <MemorialTimeline memorialId={memorial.id} />}
        {activeTab === "gallery" && <MemorialGallery memorialId={memorial.id} />}
        {activeTab === "settings" && <MemorialSettings memorial={memorial} />}
      </div>
    </div>
  )
}

