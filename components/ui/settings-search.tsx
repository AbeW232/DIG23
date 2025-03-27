"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, Settings, User, FileText, Bell, Shield } from "lucide-react"

type SettingItem = {
  id: string
  name: string
  description: string
  category: string
  tab: string
  section?: string
}

export function SettingsSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Sample settings data - in a real app, this would be more comprehensive
  const settingsData: SettingItem[] = [
    {
      id: "platform-name",
      name: "Platform Name",
      description: "Change the name of your digital legacy platform",
      category: "System",
      tab: "system",
      section: "Platform Information",
    },
    {
      id: "theme-mode",
      name: "Default Theme Mode",
      description: "Set the default theme appearance (light/dark/system)",
      category: "User Defaults",
      tab: "user",
      section: "Theme Settings",
    },
    {
      id: "story-privacy",
      name: "Default Story Privacy",
      description: "Control who can see your stories by default",
      category: "Content",
      tab: "content",
      section: "Content Creation",
    },
    {
      id: "email-notifications",
      name: "Email Notifications",
      description: "Configure email notification preferences",
      category: "Notifications",
      tab: "notifications",
      section: "Email Notifications",
    },
    {
      id: "two-factor",
      name: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      category: "Privacy & Security",
      tab: "privacy",
      section: "Security Settings",
    },
    {
      id: "storage-provider",
      name: "Storage Provider",
      description: "Configure where your media and content is stored",
      category: "System",
      tab: "system",
      section: "Storage Settings",
    },
    {
      id: "auto-save",
      name: "Auto-Save Drafts",
      description: "Automatically save story drafts while editing",
      category: "Content",
      tab: "content",
      section: "Content Creation",
    },
    {
      id: "login-alerts",
      name: "Login Alerts",
      description: "Get notified of new logins to your account",
      category: "Privacy & Security",
      tab: "privacy",
      section: "Login Security",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "System":
        return <Settings className="h-4 w-4 mr-2" />
      case "User Defaults":
        return <User className="h-4 w-4 mr-2" />
      case "Content":
        return <FileText className="h-4 w-4 mr-2" />
      case "Notifications":
        return <Bell className="h-4 w-4 mr-2" />
      case "Privacy & Security":
        return <Shield className="h-4 w-4 mr-2" />
      default:
        return <Settings className="h-4 w-4 mr-2" />
    }
  }

  const handleSelect = (item: SettingItem) => {
    setOpen(false)
    // Navigate to the specific tab
    window.location.href = `/dashboard/settings#${item.tab}`

    // In a real implementation, you would also scroll to the specific section
    setTimeout(() => {
      const sectionElement = document.getElementById(item.id)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" })
        // Highlight the element temporarily
        sectionElement.classList.add("highlight-setting")
        setTimeout(() => {
          sectionElement.classList.remove("highlight-setting")
        }, 2000)
      }
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search settings..."
            className="w-full pl-8 bg-background"
            onClick={() => setOpen(true)}
            readOnly
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogHeader className="px-4 pt-4 pb-0">
          <DialogTitle>Search Settings</DialogTitle>
        </DialogHeader>
        <Command className="rounded-t-none border-none">
          <CommandInput
            placeholder="Type a setting name..."
            value={search}
            onValueChange={setSearch}
            className="border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>No settings found.</CommandEmpty>
            <CommandGroup>
              {settingsData.map((item) => (
                <CommandItem key={item.id} onSelect={() => handleSelect(item)} className="flex items-start py-2">
                  <div className="flex items-center">
                    {getCategoryIcon(item.category)}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <span>{item.category}</span>
                        {item.section && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{item.section}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

