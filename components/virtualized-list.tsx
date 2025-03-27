"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, RefreshCw } from "lucide-react"

interface Item {
  id: number
  name: string
  type: string
  size: string
  lastModified: string
}

export function VirtualizedList() {
  const [items, setItems] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Generate mock data
  useEffect(() => {
    generateItems()
  }, [])

  const generateItems = () => {
    setIsLoading(true)

    const types = ["Document", "Image", "Video", "Audio", "Archive"]
    const sizes = ["12KB", "1.5MB", "4.2MB", "820KB", "15.7MB", "2.3MB"]
    const dates = ["2 hours ago", "Yesterday", "3 days ago", "Last week", "2 weeks ago", "Last month"]

    const newItems: Item[] = []

    for (let i = 1; i <= 1000; i++) {
      newItems.push({
        id: i,
        name: `Item ${i}`,
        type: types[Math.floor(Math.random() * types.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        lastModified: dates[Math.floor(Math.random() * dates.length)],
      })
    }

    setTimeout(() => {
      setItems(newItems)
      setIsLoading(false)
    }, 500)
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Virtualized List</CardTitle>
        <CardDescription>Efficiently rendering large lists with virtualization.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={generateItems} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-2 text-sm font-medium">
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Modified</div>
            </div>

            <ScrollArea className="h-[400px]">
              {isLoading ? (
                <div className="flex h-[400px] items-center justify-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex h-[400px] items-center justify-center text-muted-foreground">No items found</div>
              ) : (
                <div>
                  {filteredItems.slice(0, 100).map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 border-b p-2 text-sm last:border-0 hover:bg-muted/50"
                    >
                      <div className="col-span-5 truncate">{item.name}</div>
                      <div className="col-span-3">{item.type}</div>
                      <div className="col-span-2">{item.size}</div>
                      <div className="col-span-2">{item.lastModified}</div>
                    </div>
                  ))}
                  {filteredItems.length > 100 && (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      {filteredItems.length - 100} more items (scroll to load)
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {Math.min(filteredItems.length, 100)} of {filteredItems.length} items
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

