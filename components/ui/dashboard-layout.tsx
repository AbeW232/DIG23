"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardTab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface DashboardLayoutProps {
  title: string
  description?: string
  helpText?: string
  tabs?: DashboardTab[]
  defaultTab?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function DashboardLayout({
  title,
  description,
  helpText,
  tabs,
  defaultTab,
  action,
  children,
  className,
  contentClassName,
}: DashboardLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <SectionHeader title={title} description={description} helpText={helpText} action={action} />

      {tabs ? (
        <Tabs defaultValue={defaultTab || tabs[0].id} className="space-y-6">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className={contentClassName}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className={contentClassName}>{children}</div>
      )}
    </div>
  )
}

