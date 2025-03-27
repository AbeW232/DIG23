"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Map } from "lucide-react"

export function AnalyticsGeographicMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <CardDescription>Where your users are located</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Interactive geographic map would appear here</p>
          <p className="text-xs text-muted-foreground mt-2">Showing user distribution across countries and regions</p>
        </div>
      </CardContent>
    </Card>
  )
}

