"use client"

import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface RelatedLink {
  title: string
  description?: string
  href: string
  icon?: React.ReactNode
}

interface RelatedLinksProps {
  title?: string
  description?: string
  links: RelatedLink[]
  className?: string
  variant?: "default" | "compact" | "grid"
}

export function RelatedLinks({
  title = "Related",
  description,
  links,
  className,
  variant = "default",
}: RelatedLinksProps) {
  if (!links.length) return null

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-4">
        <div className={cn("space-y-2", variant === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-0")}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "flex items-center p-3 rounded-md hover:bg-muted transition-colors",
                variant === "compact" && "p-2",
              )}
            >
              {link.icon && <div className="mr-3 text-muted-foreground">{link.icon}</div>}
              <div className="flex-1 min-w-0">
                <div className="font-medium">{link.title}</div>
                {link.description && variant !== "compact" && (
                  <div className="text-sm text-muted-foreground">{link.description}</div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

