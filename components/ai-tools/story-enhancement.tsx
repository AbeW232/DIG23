"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Wand2, Save, Copy, RotateCcw, Sparkles, BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StoryEnhancement() {
  const [originalStory, setOriginalStory] = useState("")
  const [enhancedStory, setEnhancedStory] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [enhancementType, setEnhancementType] = useState("improve")
  const [creativityLevel, setCreativityLevel] = useState([50])

  const handleEnhanceStory = () => {
    if (!originalStory.trim()) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      let result = ""

      switch (enhancementType) {
        case "improve":
          result = improveStory(originalStory)
          break
        case "expand":
          result = expandStory(originalStory)
          break
        case "polish":
          result = polishStory(originalStory)
          break
        default:
          result = originalStory
      }

      setEnhancedStory(result)
      setIsProcessing(false)
    }, 2000)
  }

  // Simulated AI enhancement functions
  const improveStory = (text: string) => {
    return (
      text +
      "\n\n[AI Enhanced Version]\n\nThe sun cast long shadows as we gathered on the porch that summer evening. Grandpa's stories always had a way of transporting us to different times and places. His voice, weathered by time but strong with conviction, painted vivid pictures of his youth and the adventures that shaped him. We sat mesmerized, the cicadas providing a rhythmic backdrop to his tales of triumph and tribulation. Those moments, simple yet profound, became the foundation of our family's shared history."
    )
  }

  const expandStory = (text: string) => {
    return (
      text +
      "\n\n[AI Expanded Version]\n\nThe family reunion of 1985 remains etched in our collective memory. It wasn't just the gathering itself, but the circumstances surrounding it that made it special. After years of separation due to work and distance, all seven siblings managed to return to the old farmhouse where they were raised. The weather cooperated beautifully, offering a perfect backdrop for reconnection. Children played in the same fields their parents once roamed, creating a beautiful continuity of experience across generations. The old oak table, which had witnessed countless family meals, once again groaned under the weight of potluck dishes prepared from handed-down recipes. As twilight descended, stories flowed as freely as laughter, bridging the gaps that time had created."
    )
  }

  const polishStory = (text: string) => {
    return (
      text +
      "\n\n[AI Polished Version]\n\nThe journey we undertook that autumn day led us through winding country roads and memories alike. Each mile revealed not just changing landscapes, but shifting perspectives on our shared past. The old family cabin, nestled among towering pines, stood as a testament to endurance—much like the relationships we had cultivated over decades. Inside, the scent of cedar and history intermingled, creating an atmosphere of timeless comfort. We gathered around the hearth, where countless stories had been shared before, adding our own chapters to the ongoing narrative of our family's legacy."
    )
  }

  const handleReset = () => {
    setEnhancedStory("")
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(enhancedStory)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Story Enhancement</CardTitle>
          <CardDescription>Use AI to enhance, expand, or polish your stories and memories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="enhancement-type">Enhancement Type</Label>
              <Select value={enhancementType} onValueChange={setEnhancementType}>
                <SelectTrigger id="enhancement-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="improve">Improve Writing</SelectItem>
                  <SelectItem value="expand">Expand Details</SelectItem>
                  <SelectItem value="polish">Polish Language</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select defaultValue="nostalgic">
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nostalgic">Nostalgic</SelectItem>
                  <SelectItem value="reflective">Reflective</SelectItem>
                  <SelectItem value="joyful">Joyful</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Creativity Level</Label>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Conservative</span>
                <Slider
                  value={creativityLevel}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={setCreativityLevel}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">Creative</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">
                <BookOpen className="h-4 w-4 mr-2" />
                Original Story
              </TabsTrigger>
              <TabsTrigger value="output" disabled={!enhancedStory}>
                <Sparkles className="h-4 w-4 mr-2" />
                Enhanced Story
              </TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="mt-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="story-title">Title (Optional)</Label>
                  <Input id="story-title" placeholder="Enter a title for your story" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="original-story">Your Story</Label>
                  <Textarea
                    id="original-story"
                    placeholder="Enter your story or memory here..."
                    rows={12}
                    value={originalStory}
                    onChange={(e) => setOriginalStory(e.target.value)}
                    className="resize-none"
                  />
                </div>
                <Button
                  onClick={handleEnhanceStory}
                  disabled={!originalStory.trim() || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Enhance Story
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="output" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  value={enhancedStory}
                  onChange={(e) => setEnhancedStory(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <Button className="ml-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save to Stories
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

