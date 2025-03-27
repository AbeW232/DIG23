"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BrandCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  image?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: "default" | "outline" | "accent" | "brand"
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
}

export function BrandCard({
  title,
  description,
  icon,
  image,
  action,
  variant = "default",
  size = "md",
  className,
  children,
}: BrandCardProps) {
  const variantClasses = React.useMemo(() => {
    switch (variant) {
      case "outline":
        return "border-2 border-primary/20"
      case "accent":
        return "bg-accent text-accent-foreground"
      case "brand":
        return "bg-primary text-primary-foreground"
      default:
        return ""
    }
  }, [variant])

  const sizeClasses = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "p-4"
      case "lg":
        return "p-8"
      default:
        return "p-6"
    }
  }, [size])

  return (
    <Card className={cn(variantClasses, className)}>
      {image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <CardHeader className={cn(sizeClasses, "pb-2")}>
        {icon && <div className="mb-4">{icon}</div>}
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      {children && <CardContent className={cn(sizeClasses, "pt-0 pb-2")}>{children}</CardContent>}

      {action && (
        <CardFooter className={cn(sizeClasses, "pt-2")}>
          <Button
            variant={variant === "brand" ? "secondary" : "default"}
            className="w-full"
            onClick={action.onClick}
            asChild={!!action.href}
          >
            {action.href ? (
              <a href={action.href}>
                {action.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            ) : (
              <>
                {action.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

