"use client"

import { useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle, Sparkles, ChevronRight } from "lucide-react"

export default function PremiumFeaturesCard({ router }) {
  const handleUpgrade = useCallback(() => {
    router.push("/dashboard/subscription")
  }, [router])

  return (
    <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20 overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Level up your digital legacy</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Unlock premium features to enhance your storytelling experience.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="secondary" className="bg-background/80">
                <CheckCircle className="h-3 w-3 mr-1" /> Unlimited Storage
              </Badge>
              <Badge variant="secondary" className="bg-background/80">
                <CheckCircle className="h-3 w-3 mr-1" /> AI Writing Assistant
              </Badge>
              <Badge variant="secondary" className="bg-background/80">
                <CheckCircle className="h-3 w-3 mr-1" /> Advanced Analytics
              </Badge>
              <Badge variant="secondary" className="bg-background/80">
                <CheckCircle className="h-3 w-3 mr-1" /> Priority Support
              </Badge>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
              onClick={handleUpgrade}
            >
              Upgrade to Premium
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative bg-primary/10 p-4 rounded-full">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

