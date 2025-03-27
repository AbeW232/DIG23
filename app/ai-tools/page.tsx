import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoryEnhancement } from "@/components/ai-tools/story-enhancement"
import { PhotoRestoration } from "@/components/ai-tools/photo-restoration"
import { VoiceRecreation } from "@/components/ai-tools/voice-recreation"
import { MemoryGeneration } from "@/components/ai-tools/memory-generation"

export const metadata: Metadata = {
  title: "AI Tools | Digital Legacy Platform",
  description: "Enhance your digital legacy with AI-powered tools",
}

export default function AIToolsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-muted-foreground">Enhance your digital legacy with AI-powered tools</p>
      </div>

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="story">Story Enhancement</TabsTrigger>
          <TabsTrigger value="photo">Photo Restoration</TabsTrigger>
          <TabsTrigger value="voice">Voice Recreation</TabsTrigger>
          <TabsTrigger value="memory">Memory Generation</TabsTrigger>
        </TabsList>
        <TabsContent value="story" className="mt-6">
          <StoryEnhancement />
        </TabsContent>
        <TabsContent value="photo" className="mt-6">
          <PhotoRestoration />
        </TabsContent>
        <TabsContent value="voice" className="mt-6">
          <VoiceRecreation />
        </TabsContent>
        <TabsContent value="memory" className="mt-6">
          <MemoryGeneration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

