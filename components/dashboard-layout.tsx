"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { Sidebar } from "@/components/ui/sidebar"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { AutoBreadcrumb } from "@/components/auto-breadcrumb"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useMobile()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Close sidebar on mobile when route changes
  const pathname = usePathname()
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [pathname, isMobile])

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn("flex-1 transition-all duration-300 ease-in-out focus:outline-none", isMobile ? "p-4" : "p-6")}
        style={{
          marginLeft: isMobile ? 0 : sidebarCollapsed ? "4rem" : "16rem",
          width: isMobile ? "100%" : sidebarCollapsed ? "calc(100% - 4rem)" : "calc(100% - 16rem)",
        }}
      >
        <div className="mb-6">
          <AutoBreadcrumb />
        </div>
        <div className="w-full">{children}</div>
      </main>
    </div>
  )
}

