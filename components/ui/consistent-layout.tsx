"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/ui/sidebar"
import { AutoBreadcrumb } from "@/components/auto-breadcrumb"
import { NotificationCenter } from "@/components/ui/notification-center"
import { HelpCenter } from "@/components/ui/help-center"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConsistentLayoutProps {
  children: React.ReactNode
  showBreadcrumbs?: boolean
  showHelp?: boolean
  showNotifications?: boolean
  showThemeSwitcher?: boolean
  showUserMenu?: boolean
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function ConsistentLayout({
  children,
  showBreadcrumbs = true,
  showHelp = true,
  showNotifications = true,
  showThemeSwitcher = true,
  showUserMenu = true,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  header,
  footer,
}: ConsistentLayoutProps) {
  const [notifications, setNotifications] = React.useState([])

  return (
    <div className={cn("min-h-screen flex", className)}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className={cn(
            "h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 flex items-center justify-between px-4",
            headerClassName,
          )}
        >
          <div className="flex items-center gap-4">
            {showBreadcrumbs && <AutoBreadcrumb />}
            {header}
          </div>

          <div className="flex items-center gap-2">
            {showHelp && <HelpCenter articles={[]} />}

            {showNotifications && <NotificationCenter notifications={notifications} />}

            {showThemeSwitcher && <ThemeSwitcher iconOnly />}

            {showUserMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">User Name</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        <main className={cn("flex-1 p-6", contentClassName)}>{children}</main>

        {(footer || footerClassName) && (
          <footer className={cn("border-t p-4", footerClassName)}>
            {footer || (
              <div className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Digital Legacy Platform. All rights reserved.
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}

