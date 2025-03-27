"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  User,
  FileText,
  Bell,
  Shield,
  Search,
  Home,
  ChevronRight,
  Clock,
  Save,
  Zap,
  Sliders,
  Database,
  Lock,
  Palette,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SystemSettings } from "@/components/settings/system-settings"
import { UserDefaults } from "@/components/settings/user-defaults"
import { ContentSettings } from "@/components/settings/content-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySecuritySettings } from "@/components/settings/privacy-security-settings"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    id: "system",
    name: "System Settings",
    icon: Settings,
    description: "Configure platform-wide system settings",
    component: SystemSettings,
    color: "bg-blue-500",
    subsections: [
      { id: "general", name: "General", icon: Sliders },
      { id: "storage", name: "Storage", icon: Database },
      { id: "advanced", name: "Advanced", icon: Zap },
    ],
  },
  {
    id: "user",
    name: "User Defaults",
    icon: User,
    description: "Set default preferences for all users",
    component: UserDefaults,
    color: "bg-purple-500",
    subsections: [
      { id: "appearance", name: "Appearance", icon: Palette },
      { id: "accessibility", name: "Accessibility", icon: Eye },
      { id: "behavior", name: "Behavior", icon: Sliders },
    ],
  },
  {
    id: "content",
    name: "Content Settings",
    icon: FileText,
    description: "Manage content creation and organization",
    component: ContentSettings,
    color: "bg-emerald-500",
    subsections: [
      { id: "creation", name: "Content Creation", icon: FileText },
      { id: "media", name: "Media Settings", icon: Image },
      { id: "templates", name: "Templates", icon: Copy },
    ],
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
    description: "Configure notification preferences",
    component: NotificationSettings,
    color: "bg-amber-500",
    subsections: [
      { id: "email", name: "Email Notifications", icon: Mail },
      { id: "push", name: "Push Notifications", icon: Bell },
      { id: "activity", name: "Activity Alerts", icon: Activity },
    ],
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    icon: Shield,
    description: "Manage security and privacy settings",
    component: PrivacySecuritySettings,
    color: "bg-red-500",
    subsections: [
      { id: "profile", name: "Profile Visibility", icon: Eye },
      { id: "story", name: "Story Privacy", icon: FileText },
      { id: "security", name: "Security Settings", icon: Lock },
    ],
  },
]

// Import these from lucide-react
import { Eye, Mail, Image, Copy, Activity, Sparkles } from "lucide-react"

export function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState("system")
  const [activeSubsection, setActiveSubsection] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSettings, setRecentSettings] = useState([
    {
      id: "two-factor",
      name: "Two-Factor Authentication",
      section: "privacy",
      subsection: "security",
      time: "2 hours ago",
      icon: Lock,
    },
    {
      id: "story-privacy",
      name: "Default Story Privacy",
      section: "content",
      subsection: "creation",
      time: "Yesterday",
      icon: FileText,
    },
    {
      id: "email-notifications",
      name: "Email Notifications",
      section: "notifications",
      subsection: "email",
      time: "3 days ago",
      icon: Mail,
    },
  ])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle URL hash for direct section access
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const [section, subsection] = hash.split("-")
      if (section && settingsSections.some((s) => s.id === section)) {
        setActiveSection(section)
        if (subsection) {
          setActiveSubsection(subsection)
        }
      }
    }
  }, [])

  // Update URL when section changes
  useEffect(() => {
    const hash = activeSubsection ? `#${activeSection}-${activeSubsection}` : `#${activeSection}`
    window.history.pushState(null, "", hash)
  }, [activeSection, activeSubsection])

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    setActiveSubsection("")
    setIsMobileMenuOpen(false)
  }

  const handleSubsectionChange = (subsectionId) => {
    setActiveSubsection(subsectionId)
  }

  const currentSection = settingsSections.find((s) => s.id === activeSection)
  const ActiveComponent = currentSection?.component || SystemSettings

  return (
    <div className="container mx-auto py-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto font-normal hover:bg-transparent hover:text-primary"
              asChild
            >
              <a href="/dashboard">
                <Home className="h-3.5 w-3.5 mr-1" />
                Dashboard
              </a>
            </Button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Settings</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Settings Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search settings..."
              className="pl-10 pr-4 py-2 h-10 rounded-full border-muted bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="rounded-full shadow-md hover:shadow-lg transition-all">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="flex items-center">
            <currentSection.icon className="h-4 w-4 mr-2" />
            {currentSection.name}
          </span>
          <ChevronRight className={`h-4 w-4 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mb-6 bg-card rounded-lg border shadow-sm overflow-hidden">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeSection === section.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
              }`}
              onClick={() => handleSectionChange(section.id)}
            >
              <div className={`p-2 rounded-full ${section.color} text-white`}>
                <section.icon className="h-4 w-4" />
              </div>
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden sticky top-6">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold">Settings Menu</h2>
            </div>
            <div className="p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-3 transition-colors ${
                    activeSection === section.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSectionChange(section.id)}
                >
                  <div className={`p-1.5 rounded-full ${section.color} text-white`}>
                    <section.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
            <div className="p-4 border-t mt-2 bg-muted/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                  <AvatarFallback>DL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Digital Legacy</p>
                  <p className="text-xs text-muted-foreground">Admin Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 lg:col-span-7">
          {/* Recent Settings */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recently Changed
              </h2>
              <Badge variant="outline" className="font-normal">
                Last 7 days
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recentSettings.map((setting) => {
                const section = settingsSections.find((s) => s.id === setting.section)
                return (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-card hover:bg-accent/10 border rounded-lg p-4 cursor-pointer group transition-colors"
                    onClick={() => {
                      setActiveSection(setting.section)
                      setActiveSubsection(setting.subsection)
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${section?.color || "bg-primary"} text-white shrink-0`}>
                        <setting.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                          {setting.name}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center justify-between mt-1">
                          <span className="capitalize">{setting.section}</span>
                          <span>{setting.time}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Section Header */}
          <div className="bg-card rounded-lg border shadow-sm mb-6 overflow-hidden">
            <div className="p-5 border-b bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-full ${currentSection?.color || "bg-primary"} text-white`}>
                    <currentSection.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{currentSection?.name}</h2>
                    <p className="text-sm text-muted-foreground">{currentSection?.description}</p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Recommendations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Subsection Tabs */}
            {currentSection?.subsections && (
              <div className="px-5 py-2 border-b bg-background flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {currentSection.subsections.map((subsection) => (
                  <Button
                    key={subsection.id}
                    variant={activeSubsection === subsection.id ? "default" : "ghost"}
                    size="sm"
                    className={cn("rounded-full", activeSubsection === subsection.id ? "" : "hover:bg-muted/50")}
                    onClick={() => handleSubsectionChange(subsection.id)}
                  >
                    <subsection.icon className="h-3.5 w-3.5 mr-1.5" />
                    {subsection.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Settings Content */}
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <ScrollArea className="h-[calc(100vh-24rem)] md:h-auto">
              <div className="p-6">
                <ActiveComponent />
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden sticky top-6">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">System Status</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="outline" className="font-normal">
                    35% used
                  </Badge>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quick Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="maintenance-mode" className="text-sm cursor-pointer">
                      Maintenance Mode
                    </label>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="auto-backup" className="text-sm cursor-pointer">
                      Auto Backups
                    </label>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="api-access" className="text-sm cursor-pointer">
                      API Access
                    </label>
                    <Switch id="api-access" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Shortcuts</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    Profile
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Bell className="h-3.5 w-3.5 mr-1.5" />
                    Alerts
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Database className="h-3.5 w-3.5 mr-1.5" />
                    Storage
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Shield className="h-3.5 w-3.5 mr-1.5" />
                    Security
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Help & Support</h3>
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground">Need help with settings?</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import this component
import { Switch } from "@/components/ui/switch"

