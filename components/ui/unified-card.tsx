import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define card variants using CVA
const cardVariants = cva("rounded-lg transition-all duration-200 overflow-hidden", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border border-border shadow-sm",
      primary: "bg-primary-50 text-primary-900 border border-primary-100",
      secondary: "bg-secondary-50 text-secondary-900 border border-secondary-100",
      outline: "bg-transparent border border-border",
      ghost: "border-none bg-transparent shadow-none",
      destructive: "bg-destructive-50 text-destructive-900 border border-destructive-100",
      success: "bg-success-50 text-success-900 border border-success-100",
      warning: "bg-warning-50 text-warning-900 border border-warning-100",
      info: "bg-info-50 text-info-900 border border-info-100",
      elevated: "bg-card text-card-foreground border border-border shadow-md",
      interactive:
        "bg-card text-card-foreground border border-border shadow-sm hover:shadow-md hover:border-primary/50 cursor-pointer",
    },
    size: {
      sm: "p-3",
      default: "p-5",
      lg: "p-7",
      xl: "p-9",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-3xl",
    },
    withDividers: {
      true: "divide-y divide-border",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
    withDividers: false,
  },
})

// Card container component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, radius, withDividers, isLoading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, radius, withDividers }),
          isLoading && "animate-pulse pointer-events-none",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = "Card"

// Card header component
const cardHeaderVariants = cva("", {
  variants: {
    size: {
      sm: "p-3",
      default: "p-5",
      lg: "p-7",
      xl: "p-9",
    },
    withSeparator: {
      true: "border-b border-border",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    withSeparator: false,
  },
})

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderVariants> {
  asChild?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, withSeparator, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", cardHeaderVariants({ size, withSeparator }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CardHeader.displayName = "CardHeader"

// Card title component
const cardTitleVariants = cva("", {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-base",
      default: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof cardTitleVariants> {
  asChild?: boolean
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", cardTitleVariants({ size }), className)}
        {...props}
      >
        {children}
      </h3>
    )
  },
)
CardTitle.displayName = "CardTitle"

// Card description component
const cardDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {
  asChild?: boolean
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn(cardDescriptionVariants({ size }), className)} {...props}>
        {children}
      </p>
    )
  },
)
CardDescription.displayName = "CardDescription"

// Card content component
const cardContentVariants = cva("", {
  variants: {
    size: {
      sm: "p-3",
      default: "p-5",
      lg: "p-7",
      xl: "p-9",
    },
    padded: {
      true: "",
      false: "p-0",
    },
  },
  defaultVariants: {
    size: "default",
    padded: true,
  },
})

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardContentVariants> {
  asChild?: boolean
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, padded, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardContentVariants({ size, padded }), className)} {...props}>
        {children}
      </div>
    )
  },
)
CardContent.displayName = "CardContent"

// Card footer component
const cardFooterVariants = cva("", {
  variants: {
    size: {
      sm: "p-3",
      default: "p-5",
      lg: "p-7",
      xl: "p-9",
    },
    withSeparator: {
      true: "border-t border-border",
      false: "",
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    size: "default",
    withSeparator: false,
    align: "between",
  },
})

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardFooterVariants> {
  asChild?: boolean
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, withSeparator, align, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center", cardFooterVariants({ size, withSeparator, align }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CardFooter.displayName = "CardFooter"

// Card image component
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide"
  overlay?: React.ReactNode
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt = "", aspectRatio = "auto", overlay, ...props }, ref) => {
    const aspectRatioClass = {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      wide: "aspect-[2/1]",
    }[aspectRatio]

    return (
      <div ref={ref} className={cn("relative overflow-hidden", aspectRatioClass, className)}>
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" {...props} />
        {overlay && <div className="absolute inset-0 flex items-center justify-center">{overlay}</div>}
      </div>
    )
  },
)
CardImage.displayName = "CardImage"

// Card actions component
interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right"
  spacing?: "default" | "sm" | "lg"
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, align = "right", spacing = "default", children, ...props }, ref) => {
    const alignClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[align]

    const spacingClass = {
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
    }[spacing]

    return (
      <div ref={ref} className={cn("flex items-center", alignClass, spacingClass, className)} {...props}>
        {children}
      </div>
    )
  },
)
CardActions.displayName = "CardActions"

// Card badge component
interface CardBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info"
}

const CardBadge = React.forwardRef<HTMLDivElement, CardBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClass = {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary-100 text-primary-800",
      secondary: "bg-secondary-100 text-secondary-800",
      outline: "border border-border bg-transparent",
      destructive: "bg-destructive-100 text-destructive-800",
      success: "bg-success-100 text-success-800",
      warning: "bg-warning-100 text-warning-800",
      info: "bg-info-100 text-info-800",
    }[variant]

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variantClass,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CardBadge.displayName = "CardBadge"

// Card icon component
interface CardIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info"
  size?: "sm" | "default" | "lg"
}

const CardIcon = React.forwardRef<HTMLDivElement, CardIconProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const variantClass = {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary-100 text-primary-800",
      secondary: "bg-secondary-100 text-secondary-800",
      outline: "border border-border bg-transparent",
      destructive: "bg-destructive-100 text-destructive-800",
      success: "bg-success-100 text-success-800",
      warning: "bg-warning-100 text-warning-800",
      info: "bg-info-100 text-info-800",
    }[variant]

    const sizeClass = {
      sm: "p-1.5 rounded-md",
      default: "p-2 rounded-lg",
      lg: "p-3 rounded-xl",
    }[size]

    return (
      <div ref={ref} className={cn("flex items-center justify-center", sizeClass, variantClass, className)} {...props}>
        {children}
      </div>
    )
  },
)
CardIcon.displayName = "CardIcon"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardActions,
  CardBadge,
  CardIcon,
}

