"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import {
  BookOpen,
  Image,
  BarChart3,
  UsersIcon,
  SettingsIcon,
  Menu,
  MessageSquare,
  Home,
  User,
  FolderTree,
  PanelTop,
  LogOut,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Flower,
  Sparkles,
  BookType,
  ChevronLeft,
  FileText,
  Settings,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

type NavItem = {
  label: string
  icon: React.ElementType
  href?: string
  active?: boolean
  children?: NavItem[]
}

export function Sidebar({ className, collapsed = false, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)

  // Sync collapsed state with parent component
  useEffect(() => {
    setIsCollapsed(collapsed)
  }, [collapsed])

  // Notify parent component when collapsed state changes
  const toggleCollapsed = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState)
    }
  }

  // Initialize with Content menu open by default for better UX
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Content: true,
    Family: true,
    Engagement: true,
    Administration: true,
  })

  // Improved toggle function with event prevention
  const toggleGroup = (label: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  // Check if any child route is active
  const isGroupActive = (items: NavItem[]) => {
    return items.some((item) => {
      // Check if the current path starts with the item's href (for parent routes)
      if (
        item.href &&
        pathname.startsWith(item.href) &&
        // Special case for dashboard to avoid matching all routes
        (item.href !== "/dashboard" || pathname === "/dashboard")
      ) {
        return true
      }
      // Check children recursively
      return item.children && isGroupActive(item.children)
    })
  }

  // Auto-expand groups with active children
  useEffect(() => {
    const newOpenGroups: Record<string, boolean> = {}

    routes.forEach((route) => {
      if (route.children && isGroupActive(route.children)) {
        newOpenGroups[route.label] = true
      }
    })

    setOpenGroups((prev) => ({ ...prev, ...newOpenGroups }))
  }, [pathname])

  const routes: NavItem[] = [
    {
      label: "Overview",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Content",
      icon: BookOpen,
      children: [
        {
          label: "Story Management",
          icon: BookOpen,
          href: "/dashboard/story",
          active: pathname.startsWith("/dashboard/story"),
        },
        {
          label: "Media Library",
          icon: Image,
          href: "/dashboard/media",
          active: pathname.startsWith("/dashboard/media"),
        },
        {
          label: "Exhibitions",
          icon: PanelTop,
          href: "/dashboard/exhibitions",
          active: pathname.startsWith("/dashboard/exhibitions"),
        },
        {
          label: "Publishing",
          icon: BookType,
          href: "/dashboard/publishing",
          active: pathname.startsWith("/dashboard/publishing"),
        },
      ],
    },
    {
      label: "Family",
      icon: FolderTree,
      children: [
        {
          label: "Family Tree",
          icon: FolderTree,
          href: "/dashboard/family-tree",
          active: pathname.startsWith("/dashboard/family-tree"),
        },
        {
          label: "Memorial",
          icon: Flower,
          href: "/dashboard/memorial",
          active: pathname.startsWith("/dashboard/memorial"),
        },
      ],
    },
    {
      label: "Engagement",
      icon: MessageSquare,
      children: [
        {
          label: "Comments",
          icon: MessageSquare,
          href: "/dashboard/comments",
          active: pathname.startsWith("/dashboard/comments"),
        },
        {
          label: "Analytics",
          icon: BarChart3,
          href: "/dashboard/analytics",
          active: pathname.startsWith("/dashboard/analytics"),
        },
      ],
    },
    {
      label: "Marketplace",
      icon: ShoppingBag,
      href: "/dashboard/marketplace",
      active: pathname.startsWith("/dashboard/marketplace"),
    },
    {
      label: "Subscription",
      icon: CreditCard,
      href: "/dashboard/subscription",
      active: pathname.startsWith("/dashboard/subscription"),
    },
    {
      label: "AI Tools",
      icon: Sparkles,
      href: "/dashboard/ai-tools",
      active: pathname.startsWith("/dashboard/ai-tools"),
    },
    {
      label: "Administration",
      icon: SettingsIcon,
      children: [
        {
          label: "User Management",
          icon: UsersIcon,
          href: "/dashboard/users",
          active: pathname.startsWith("/dashboard/users"),
        },
        {
          label: "Settings",
          icon: SettingsIcon,
          href: "/dashboard/settings",
          active: pathname.startsWith("/dashboard/settings"),
        },
      ],
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname.startsWith("/dashboard/profile"),
    },
    {
      label: "Digital Legacy",
      icon: BookOpen,
      href: "/dashboard/story/editor?new=true",
      active: pathname.startsWith("/dashboard/story/editor"),
    },
  ]

  // Simplified rendering of nav items with direct DOM manipulation
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      // If the item has children, render a collapsible section
      if (item.children) {
        const isActive = isGroupActive(item.children)
        const isOpen = openGroups[item.label] || false

        return (
          <div key={item.label} className="w-full mb-1">
            <button
              onClick={(e) => toggleGroup(item.label, e)}
              className={cn(
                "sidebar-menu-item group flex w-full items-center justify-between",
                isActive && "text-white font-medium bg-emerald-700",
              )}
              aria-expanded={isOpen}
              aria-controls={`${item.label}-submenu`}
            >
              <div className="flex items-center">
                <item.icon className="sidebar-menu-item-icon" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center justify-center">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform" />
                )}
              </div>
            </button>

            {/* Direct DOM rendering of submenu with conditional display */}
            <div
              id={`${item.label}-submenu`}
              className={cn(
                "pl-9 space-y-1 pt-1 overflow-hidden transition-all duration-200 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              {item.children.map((child) => (
                <Link key={child.href} href={child.href || "#"} onClick={() => setOpen(false)} className="block">
                  <div
                    className={cn("sidebar-menu-item", child.active && "active bg-emerald-700 text-white font-medium")}
                  >
                    <child.icon className="mr-2 h-4 w-4" />
                    <span>{child.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      }

      // Otherwise render a regular nav item
      return (
        <Link key={item.href} href={item.href || "#"} onClick={() => setOpen(false)} className="block mb-1">
          <div className={cn("sidebar-menu-item", item.active && "active bg-emerald-700 text-white font-medium")}>
            <item.icon className="sidebar-menu-item-icon" />
            <span>{item.label}</span>
          </div>
        </Link>
      )
    })
  }

  const renderCollapsedNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      // If the item has children, render a collapsible section
      if (item.children) {
        const isActive = isGroupActive(item.children)

        return (
          <div key={item.label} className="w-full mb-1 flex justify-center" title={item.label}>
            <button
              onClick={(e) => toggleGroup(item.label, e)}
              className={cn(
                "sidebar-menu-item-collapsed group flex items-center justify-center",
                isActive && "text-white font-medium bg-emerald-700",
              )}
              aria-expanded={openGroups[item.label] || false}
              aria-controls={`${item.label}-submenu`}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </button>
          </div>
        )
      }

      // Otherwise render a regular nav item
      return (
        <Link
          key={item.href}
          href={item.href || "#"}
          onClick={() => setOpen(false)}
          className="block mb-1"
          title={item.label}
        >
          <div
            className={cn(
              "sidebar-menu-item-collapsed flex justify-center",
              item.active && "active bg-emerald-700 text-white font-medium",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="sr-only">{item.label}</span>
          </div>
        </Link>
      )
    })
  }

  // Update the SidebarContent function to include a more prominent toggle button in the header
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="sidebar-header flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#4ADE80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#4ADE80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#4ADE80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {!isCollapsed && <span className="text-xl font-semibold">Digital Legacy</span>}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="h-8 w-8 rounded-full bg-emerald-700 text-white hover:bg-emerald-600"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="px-3 py-4">
          <button
            onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
            className="w-full flex items-center justify-between bg-emerald-700 rounded-md px-3 py-2 text-sm hover:bg-emerald-600 transition-colors"
            aria-expanded={isAdminMenuOpen}
            aria-controls="admin-dropdown"
          >
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Admin</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isAdminMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isAdminMenuOpen && (
            <div id="admin-dropdown" className="mt-1 pl-2 py-1 space-y-1">
              <Link
                href="/dashboard/admin/users"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <UsersIcon className="h-4 w-4" />
                <span>User Management</span>
              </Link>
              <Link
                href="/dashboard/admin/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>System Settings</span>
              </Link>
              <Link
                href="/dashboard/admin/logs"
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Activity Logs</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {isCollapsed ? (
        <div className="sidebar-menu-label flex justify-center">
          <span className="sr-only">MENU</span>
        </div>
      ) : (
        <div className="sidebar-menu-label">MENU</div>
      )}

      <ScrollArea className="sidebar-menu">
        <div className="space-y-1">{isCollapsed ? renderCollapsedNavItems(routes) : renderNavItems(routes)}</div>
      </ScrollArea>

      <div className="mt-auto pt-4 px-3 border-t border-emerald-700">
        <Link href="/dashboard">
          <div className={cn("sidebar-menu-item text-white/80 hover:text-white", isCollapsed && "justify-center")}>
            <LogOut className="sidebar-menu-item-icon" />
            {!isCollapsed && <span>Logout</span>}
          </div>
        </Link>
      </div>

      <SidebarFooter collapsed={isCollapsed} />
    </div>
  )

  const SidebarFooter = ({ collapsed }: { collapsed?: boolean }) => (
    <div className="sidebar-footer">
      {collapsed ? (
        <div className="flex justify-center">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
            DL
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
            DL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Digital Legacy</p>
            <p className="text-xs text-white/60 truncate">Storytelling Platform</p>
          </div>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 h-10 w-10 rounded-full bg-background shadow-md"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-emerald-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-emerald-800 text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <SidebarContent />
    </div>
  )
}

export const SidebarHeader = () => null
export const SidebarContent = () => null
export const SidebarFooter = () => null
export const SidebarGroup = () => null
export const SidebarGroupAction = () => null
export const SidebarGroupContent = () => null
export const SidebarGroupLabel = () => null
export const SidebarInput = () => null
export const SidebarInset = () => null
export const SidebarMenu = () => null
export const SidebarMenuAction = () => null
export const SidebarMenuBadge = () => null
export const SidebarMenuButton = () => null
export const SidebarMenuItem = () => null
export const SidebarMenuSkeleton = () => null
export const SidebarMenuSub = () => null
export const SidebarMenuSubButton = () => null
export const SidebarMenuSubItem = () => null
export const SidebarProvider = () => null
export const SidebarRail = () => null
export const SidebarSeparator = () => null
export const SidebarTrigger = () => null

