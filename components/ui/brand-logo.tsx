import Link from "next/link"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BrandLogo({ variant = "default", size = "md", className }: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <Link href="/dashboard" className={cn("flex items-center gap-2 font-semibold", sizeClasses[size], className)}>
      <div className="h-full aspect-square rounded-md bg-bangladesh-green flex items-center justify-center">
        <span className="text-anti-flash-white font-bold text-lg">DL</span>
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-semibold leading-none",
            size === "sm" ? "text-base" : "",
            size === "md" ? "text-lg" : "",
            size === "lg" ? "text-xl" : "",
          )}
        >
          Digital Legacy
        </span>
        <span className="text-xs text-muted-foreground">Storytelling Platform</span>
      </div>
    </Link>
  )
}

