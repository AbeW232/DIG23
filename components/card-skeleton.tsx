import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface CardSkeletonProps extends React.ComponentProps<typeof Card> {}

export function CardSkeleton({ className, ...props }: CardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="h-10">
        <Skeleton className="h-full w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-[120px]" />
      </CardFooter>
    </Card>
  )
}

