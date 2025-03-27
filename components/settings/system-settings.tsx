"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StorageSettings } from "@/components/settings/storage-settings"
import { BackupSettings } from "@/components/settings/backup-settings"
import { PerformanceSettings } from "@/components/settings/performance-settings"
import { Database, Save, Zap } from "lucide-react"

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("storage")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="storage" className="flex items-center gap-2 py-2 h-auto">
            <Database className="h-4 w-4" />
            <span>Storage</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2 py-2 h-auto">
            <Save className="h-4 w-4" />
            <span>Backup</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2 py-2 h-auto">
            <Zap className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage">
          <StorageSettings />
        </TabsContent>

        <TabsContent value="backup">
          <BackupSettings />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

