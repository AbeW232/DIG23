"use client"

import { useState, useEffect } from "react"
import { SystemSettings } from "@/components/settings/system-settings"
import { UserDefaults } from "@/components/settings/user-defaults"
import { ContentSettings } from "@/components/settings/content-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySecuritySettings } from "@/components/settings/privacy-security-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Settings, User, FileText, Bell, Shield, Search, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("system")
  const [searchQuery, setSearchQuery] = useState("")
  const [recentlyChanged, setRecentlyChanged] = useState([
    {
      id: 1,
      setting: "Two-Factor Authentication",
      category: "Security",
      time: "2 hours ago",
      tab: "privacy",
    },
    {
      id: 2,
      setting: "Default Story Privacy",
      category: "Content",
      time: "Yesterday",
      tab: "content",
    },
    {
      id: 3,
      setting: "Email Notifications",
      category: "Notifications",
      time: "3 days ago",
      tab: "notifications",
    },
  ])

  // Handle URL hash for direct tab access
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && ["system", "user", "content", "notifications", "privacy"].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  // Update URL when tab changes
  const handleTabChange = (value) => {
    setActiveTab(value)
    window.history.pushState(null, "", `#${value}`)
  }

  const getTabIcon = (tab) => {
    switch (tab) {
      case "system":
        return <Settings className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "content":
        return <FileText className="h-4 w-4" />
      case "notifications":
        return <Bell className="h-4 w-4" />
      case "privacy":
        return <Shield className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getTabContent = () => {
    switch (activeTab) {
      case "system":
        return <SystemSettings />
      case "user":
        return <UserDefaults />
      case "content":
        return <ContentSettings />
      case "notifications":
        return <NotificationSettings />
      case "privacy":
        return <PrivacySecuritySettings />
      default:
        return <SystemSettings />
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search settings..."
          className="pl-10 bg-background border-muted"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Recently Changed Settings */}
      <Card className="border-none shadow-sm bg-muted/20 mb-6 overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Recently Changed Settings
            </CardTitle>
            <Badge variant="outline" className="font-normal">
              Last 7 days
            </Badge>
          </div>
          <CardDescription>Quick access to settings you've recently modified</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyChanged.map((item) => (
              <Card
                key={item.id}
                className="bg-card hover:bg-accent/10 transition-colors cursor-pointer group overflow-hidden"
                onClick={() => handleTabChange(item.tab)}
              >
                <CardContent className="p-4 relative">
                  <div className="flex flex-col space-y-1.5">
                    <div className="font-medium group-hover:text-primary transition-colors">{item.setting}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-between">
                      <span>{item.category}</span>
                      <span className="text-xs">{item.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="border-none shadow-sm md:row-span-2 h-fit">
          <CardHeader className="pb-3 bg-muted/30">
            <CardTitle className="text-base font-medium">Settings</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {["system", "user", "content", "notifications", "privacy"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50 ${
                    activeTab === tab ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${activeTab === tab ? "bg-primary/20" : "bg-muted"}`}>
                    {getTabIcon(tab)}
                  </div>
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3 bg-muted/30 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-primary/20`}>{getTabIcon(activeTab)}</div>
                  <CardTitle className="text-base font-medium capitalize">{activeTab} Settings</CardTitle>
                </div>
                <CardDescription>Manage your {activeTab} settings and preferences</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] md:h-auto">
                <div className="p-6">{getTabContent()}</div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

