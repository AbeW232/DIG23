import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva("overflow-hidden transition-all duration-200", {
  variants: {
    variant: {
      default: "border bg-card text-card-foreground",
      primary: "border-primary/20 bg-primary/5 text-primary-foreground",
      secondary: "border-secondary/20 bg-secondary/5 text-secondary-foreground",
      destructive: "border-destructive/20 bg-destructive/5 text-destructive-foreground",
      outline: "border border-input bg-background",
      ghost: "border-none bg-transparent",
      elevated: "border bg-card text-card-foreground shadow-md",
      interactive: "border bg-card text-card-foreground hover:border-primary/50 hover:bg-muted/50 cursor-pointer",
    },
    size: {
      default: "",
      sm: "p-2",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  badge?: string
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"
  footer?: React.ReactNode
  loading?: boolean
  headerAction?: React.ReactNode
  noPadding?: boolean
}

export function EnhancedCard({
  className,
  variant,
  size,
  title,
  description,
  icon,
  badge,
  badgeVariant = "default",
  footer,
  loading = false,
  headerAction,
  noPadding = false,
  children,
  ...props
}: EnhancedCardProps) {
  return (
    <Card className={cn(cardVariants({ variant, size }), className)} {...props}>
      {(title || description || icon || badge || headerAction) && (
        <CardHeader
          className={cn(
            "flex flex-row items-start justify-between gap-4",
            size === "sm" ? "p-3" : "",
            size === "lg" ? "pb-4" : "",
          )}
        >
          <div className="space-y-1.5">
            {loading ? (
              <>
                <Skeleton className="h-6 w-24" />
                {description && <Skeleton className="h-4 w-32" />}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {icon && <div className="flex-shrink-0">{icon}</div>}
                  {typeof title === "string" ? (
                    <CardTitle className={size === "sm" ? "text-base" : ""}>{title}</CardTitle>
                  ) : (
                    title
                  )}
                  {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
                </div>
                {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
              </>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent
        className={cn(
          noPadding ? "p-0" : "",
          size === "sm" ? "p-3 pt-0" : "",
          size === "lg" ? "p-6 pt-0" : "",
          !title && !description && !icon && !badge && !headerAction && size === "sm" ? "p-3" : "",
          !title && !description && !icon && !badge && !headerAction && size === "lg" ? "p-6" : "",
        )}
      >
        {loading ? <Skeleton className="h-24 w-full" /> : children}
      </CardContent>
      {footer && (
        <CardFooter
          className={cn("flex justify-between border-t", size === "sm" ? "p-3" : "", size === "lg" ? "p-6" : "")}
        >
          {loading ? <Skeleton className="h-9 w-full" /> : footer}
        </CardFooter>
      )}
    </Card>
  )
}

