"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AnalyticsAudienceInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
        <CardDescription>Age and location breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Age Groups</h3>
            <div className="space-y-2">
              {[
                { group: "18-24", percentage: 5 },
                { group: "25-34", percentage: 15 },
                { group: "35-44", percentage: 25 },
                { group: "45-54", percentage: 30 },
                { group: "55-64", percentage: 15 },
                { group: "65+", percentage: 10 },
              ].map((age, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{age.group}</span>
                    <span className="text-sm">{age.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${age.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Top Locations</h3>
            <div className="space-y-2">
              {[
                { location: "United States", percentage: 45 },
                { location: "United Kingdom", percentage: 20 },
                { location: "Canada", percentage: 15 },
                { location: "Australia", percentage: 10 },
                { location: "Germany", percentage: 5 },
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{location.location}</span>
                  <Badge variant="outline">{location.percentage}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

