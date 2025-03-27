"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"

export function AnalyticsDataExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Explorer</CardTitle>
        <CardDescription>Create custom queries and explore your analytics data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="query" className="space-y-4">
          <TabsList>
            <TabsTrigger value="query">Query Builder</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="query" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center gap-2">
                  <Select defaultValue="metric">
                    <SelectTrigger>
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Select Metric</SelectItem>
                      <SelectItem value="visitors">Visitors</SelectItem>
                      <SelectItem value="pageviews">Page Views</SelectItem>
                      <SelectItem value="engagement">Engagement Rate</SelectItem>
                      <SelectItem value="time">Time on Page</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="dimension">
                    <SelectTrigger>
                      <SelectValue placeholder="Select dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dimension">Select Dimension</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="device">Device</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="content">Content Type</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search or enter SQL query" className="pl-8" />
                </div>
              </div>
              <Button>Run Query</Button>
            </div>

            <div className="rounded-md border h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Query results will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select defaultValue="chart">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chart">Select Chart Type</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Chart
              </Button>
            </div>

            <div className="rounded-md border h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Visualization will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Export Format</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">CSV</Button>
                <Button variant="outline">Excel</Button>
                <Button variant="outline">JSON</Button>
                <Button variant="outline">PDF</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Export Options</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="checkbox" className="w-4 h-4" id="include-headers" />
                  <label htmlFor="include-headers" className="text-sm">
                    Include Headers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="checkbox" className="w-4 h-4" id="include-metadata" />
                  <label htmlFor="include-metadata" className="text-sm">
                    Include Metadata
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

