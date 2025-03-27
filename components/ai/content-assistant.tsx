"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Wand2, Sparkles, MessageSquare, Check, X, Lightbulb, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentAssistantProps {
  content?: string
  onContentChange?: (content: string) => void
  className?: string
}

export function ContentAssistant({ content = "", onContentChange, className }: ContentAssistantProps) {
  const [text, setText] = useState(content)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("improve")
  const [creativity, setCreativity] = useState([50])
  const [autoSuggest, setAutoSuggest] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  // Mock function to simulate AI suggestions
  const generateSuggestions = (type: string) => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      let newSuggestions: string[] = []

      switch (type) {
        case "improve":
          newSuggestions = [
            text.length > 10
              ? text.replace(/\b(\w+)\b/g, (match) =>
                  Math.random() > 0.8 ? match.charAt(0).toUpperCase() + match.slice(1) : match,
                )
              : "Your writing is clear and concise. Consider adding more descriptive elements to create a vivid picture for your readers.",
            "Consider restructuring some sentences for better flow and readability.",
            "Your tone is consistent. You might want to add more emotional elements to connect with readers.",
          ]
          break
        case "expand":
          newSuggestions = [
            text +
              " Additionally, this moment represents a significant milestone that deserves to be remembered and celebrated for generations to come.",
            text +
              " The impact of these memories extends beyond the individual, creating a tapestry of shared experiences that define our collective history.",
            text +
              " When we preserve these stories, we're not just documenting events—we're capturing the essence of what makes each life unique and meaningful.",
          ]
          break
        case "summarize":
          newSuggestions = [
            text.length > 50
              ? text.split(" ").slice(0, 15).join(" ") + "..."
              : "This passage captures key life moments with concise emotional resonance.",
            "A heartfelt reflection on life's meaningful connections and cherished memories.",
            "A poignant snapshot of personal history, highlighting pivotal moments and relationships.",
          ]
          break
        default:
          newSuggestions = ["No suggestions available."]
      }

      setSuggestions(newSuggestions)
      setIsGenerating(false)
    }, 1500)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)

    if (onContentChange) {
      onContentChange(newText)
    }

    // Auto-suggest if enabled and content is substantial
    if (autoSuggest && newText.length > 50 && newText.endsWith(".")) {
      generateSuggestions(activeTab)
    }
  }

  const applySuggestion = (suggestion: string) => {
    setText(suggestion)
    if (onContentChange) {
      onContentChange(suggestion)
    }
    setSuggestions([])
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              AI Content Assistant
            </CardTitle>
            <CardDescription>Enhance your writing with AI-powered suggestions</CardDescription>
          </div>
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Lightbulb className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">AI Assistant Tips</h4>
                <p className="text-sm text-muted-foreground">
                  • Use "Improve" for grammar and style suggestions
                  <br />• "Expand" adds detail to your existing content
                  <br />• "Summarize" creates concise versions of longer text
                  <br />• Adjust creativity slider for more varied suggestions
                  <br />• Enable auto-suggest for real-time assistance
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your content here..."
          className="min-h-[150px] resize-y"
          value={text}
          onChange={handleTextChange}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-suggest" className="text-sm">
              Auto-suggest
            </Label>
            <Switch id="auto-suggest" checked={autoSuggest} onCheckedChange={setAutoSuggest} />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="creativity" className="text-sm">
              Creativity
            </Label>
            <Slider
              id="creativity"
              className="w-[100px]"
              value={creativity}
              min={0}
              max={100}
              step={1}
              onValueChange={setCreativity}
            />
          </div>
        </div>

        <Tabs
          defaultValue="improve"
          onValueChange={(value) => {
            setActiveTab(value)
            setSuggestions([])
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="improve">
              <Pencil className="mr-2 h-4 w-4" />
              Improve
            </TabsTrigger>
            <TabsTrigger value="expand">
              <Sparkles className="mr-2 h-4 w-4" />
              Expand
            </TabsTrigger>
            <TabsTrigger value="summarize">
              <MessageSquare className="mr-2 h-4 w-4" />
              Summarize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="improve" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Enhance your writing with grammar, style, and clarity improvements.
            </p>
          </TabsContent>

          <TabsContent value="expand" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Add depth and detail to your content with AI-generated expansions.
            </p>
          </TabsContent>

          <TabsContent value="summarize" className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Create concise versions of your content while preserving key points.
            </p>
          </TabsContent>
        </Tabs>

        {suggestions.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-medium">Suggestions:</h4>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="relative rounded-md border p-3 text-sm">
                <p>{suggestion}</p>
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => applySuggestion(suggestion)}>
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setSuggestions(suggestions.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          {text.length > 0 ? `${text.split(" ").length} words, ${text.length} characters` : "No content yet"}
        </p>
        <Button onClick={() => generateSuggestions(activeTab)} disabled={isGenerating || text.length < 5}>
          {isGenerating ? (
            <>
              <span className="mr-2">Generating...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Suggestions
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

