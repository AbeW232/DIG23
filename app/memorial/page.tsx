import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemorialSpace } from "@/components/memorial/memorial-space"
import { TributeCollection } from "@/components/memorial/tribute-collection"
import { Button } from "@/components/ui/button"
import { Share2, Heart, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Memorial | Digital Legacy Platform",
  description: "Create and manage memorial spaces for loved ones",
}

export default function MemorialPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Memorial Space</h1>
          <p className="text-muted-foreground">Honor and remember your loved ones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Event
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Add Tribute
          </Button>
        </div>
      </div>

      <Tabs defaultValue="memorial" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="memorial">Memorial Space</TabsTrigger>
          <TabsTrigger value="tributes">Tributes</TabsTrigger>
        </TabsList>
        <TabsContent value="memorial" className="mt-6">
          <MemorialSpace />
        </TabsContent>
        <TabsContent value="tributes" className="mt-6">
          <TributeCollection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

