"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Save,
  Image,
  FileText,
  Layout,
  Eye,
  Settings,
  Clock,
  Calendar,
  Users,
  Sparkles,
  PanelLeft,
  PanelRight,
  MoreHorizontal,
  X,
  ArrowUpRight,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Heading1,
  Heading2,
  Map,
  Plus,
} from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LoadingState } from "@/components/ui/loading-state"
import { cn } from "@/lib/utils"

// Mock data for the editor
const MOCK_CATEGORIES = [
  { id: "1", name: "Memories" },
  { id: "2", name: "Family History" },
  { id: "3", name: "Childhood" },
  { id: "4", name: "Travel" },
  { id: "5", name: "Milestones" },
  { id: "6", name: "Recipes" },
]

const MOCK_TAGS = [
  { id: "1", name: "Summer" },
  { id: "2", name: "Vacation" },
  { id: "3", name: "Wedding" },
  { id: "4", name: "Birthday" },
  { id: "5", name: "Holiday" },
  { id: "6", name: "Anniversary" },
]

const MOCK_TEMPLATES = [
  {
    id: "1",
    title: "Life Journey",
    description: "A chronological template for documenting life events",
    thumbnail: "/placeholder.svg?height=120&width=200",
    color: "#3B82F6",
  },
  {
    id: "2",
    title: "Family Recipe",
    description: "Perfect for preserving cherished family recipes",
    thumbnail: "/placeholder.svg?height=120&width=200",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Travel Memoir",
    description: "Document your adventures and experiences",
    thumbnail: "/placeholder.svg?height=120&width=200",
    color: "#F59E0B",
  },
  {
    id: "4",
    title: "Photo Story",
    description: "Image-focused template with minimal text",
    thumbnail: "/placeholder.svg?height=120&width=200",
    color: "#8B5CF6",
  },
]

const MOCK_MEDIA = [
  { id: "1", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Family Photo" },
  { id: "2", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Vacation Beach" },
  { id: "3", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Wedding Day" },
  { id: "4", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Birthday Party" },
  { id: "5", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Graduation" },
  { id: "6", type: "image", url: "/placeholder.svg?height=100&width=100", name: "Anniversary" },
]

const MOCK_COLLABORATORS = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Michael Smith", email: "michael@example.com", avatar: "/placeholder.svg?height=40&width=40" },
]

export function StoryEditorEnhanced() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const isNew = searchParams?.get("new") === "true"

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [aiAssistOpen, setAiAssistOpen] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [storyData, setStoryData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    tags: [] as string[],
    isPublic: false,
    allowComments: true,
    featuredImage: null as string | null,
    lastSaved: new Date().toISOString(),
  })

  // Calculate word count when content changes
  useEffect(() => {
    if (storyData.content) {
      const words = storyData.content.trim().split(/\s+/).length
      setWordCount(words)
    } else {
      setWordCount(0)
    }
  }, [storyData.content])

  // Simulate loading state
  useEffect(() => {
    if (isNew) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (storyData.title || storyData.content) {
        handleAutoSave()
      }
    }, 60000) // Auto-save every minute

    return () => clearInterval(autoSaveInterval)
  }, [storyData])

  const handleAutoSave = () => {
    // In a real app, this would save to an API
    setStoryData({
      ...storyData,
      lastSaved: new Date().toISOString(),
    })
  }

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setStoryData({
        ...storyData,
        lastSaved: new Date().toISOString(),
      })
      toast({
        title: "Story saved",
        description: "Your story has been saved successfully.",
      })
    }, 1500)
  }

  const handlePublish = () => {
    if (!storyData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title before publishing.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Story published",
        description: "Your story has been published successfully.",
        variant: "success",
      })
      router.push("/dashboard/story")
    }, 1500)
  }

  const handlePreview = () => {
    toast({
      title: "Preview mode",
      description: "Opening preview in a new tab.",
    })
    // In a real app, this would open a new tab with the preview
  }

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id)
    const template = MOCK_TEMPLATES.find((t) => t.id === id)

    toast({
      title: "Template applied",
      description: `The "${template?.title}" template has been applied to your story.`,
    })

    // In a real app, this would load template content
    if (id === "1") {
      // Life Journey template
      setStoryData({
        ...storyData,
        subtitle: "My Life's Journey",
        content:
          storyData.content ||
          "# Early Years\n\nBegin your life story here...\n\n# Growing Up\n\nShare memories from your childhood and adolescence...\n\n# Adult Life\n\nDescribe your experiences, career, and relationships...",
      })
    } else if (id === "2") {
      // Family Recipe template
      setStoryData({
        ...storyData,
        subtitle: "A Cherished Family Recipe",
        content:
          storyData.content ||
          "# Ingredients\n\n- Ingredient 1\n- Ingredient 2\n- Ingredient 3\n\n# Instructions\n\n1. First step\n2. Second step\n3. Third step\n\n# History\n\nShare the story behind this recipe...",
      })
    }
  }

  const handleAddTag = (tagId: string) => {
    if (!storyData.tags.includes(tagId)) {
      setStoryData({
        ...storyData,
        tags: [...storyData.tags, tagId],
      })
    }
  }

  const handleRemoveTag = (tagId: string) => {
    setStoryData({
      ...storyData,
      tags: storyData.tags.filter((id) => id !== tagId),
    })
  }

  const formatLastSaved = () => {
    const lastSaved = new Date(storyData.lastSaved)
    const now = new Date()
    const diffMs = now.getTime() - lastSaved.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 1) {
      return "Just now"
    } else if (diffMins === 1) {
      return "1 minute ago"
    } else if (diffMins < 60) {
      return `${diffMins} minutes ago`
    } else {
      const hours = Math.floor(diffMins / 60)
      if (hours === 1) {
        return "1 hour ago"
      } else if (hours < 24) {
        return `${hours} hours ago`
      } else {
        return lastSaved.toLocaleString()
      }
    }
  }

  const handleAIAssist = (prompt: string) => {
    // In a real app, this would call an AI API
    setAiAssistOpen(false)
    toast({
      title: "AI Assistant",
      description: "Generating content based on your prompt...",
    })

    // Simulate AI response
    setTimeout(() => {
      const currentContent = storyData.content
      setStoryData({
        ...storyData,
        content: currentContent + "\n\n" + "AI-generated content would appear here based on your prompt: " + prompt,
      })

      toast({
        title: "AI Content Generated",
        description: "Content has been added to your story.",
        variant: "success",
      })
    }, 2000)
  }

  const insertElement = (elementType: string) => {
    let elementContent = ""

    switch (elementType) {
      case "heading1":
        elementContent = "\n# Heading 1\n"
        break
      case "heading2":
        elementContent = "\n## Heading 2\n"
        break
      case "paragraph":
        elementContent = "\n\nNew paragraph text here...\n\n"
        break
      case "image":
        elementContent = "\n\n![Image description](/placeholder.svg?height=300&width=500)\n\n"
        break
      case "list":
        elementContent = "\n\n- List item 1\n- List item 2\n- List item 3\n\n"
        break
      case "numbered-list":
        elementContent = "\n\n1. First item\n2. Second item\n3. Third item\n\n"
        break
      case "timeline":
        elementContent = "\n\n## Timeline Event - [Date]\n\nDescribe what happened...\n\n"
        break
      case "people":
        elementContent =
          "\n\n## Person: [Name]\n\nRelationship: [Relationship]\nBorn: [Birth date]\n\nWrite about this person...\n\n"
        break
      case "location":
        elementContent =
          "\n\n## Location: [Place Name]\n\nCoordinates: [Latitude, Longitude]\nVisited: [Date]\n\nDescribe this place...\n\n"
        break
      case "date":
        elementContent = "\n\n## Date: [Month Day, Year]\n\nDescribe what happened on this date...\n\n"
        break
    }

    setStoryData({
      ...storyData,
      content: storyData.content + elementContent,
    })

    toast({
      title: "Element Added",
      description: `A new ${elementType} element has been added to your story.`,
    })
  }

  if (loading) {
    return <LoadingState text="Loading editor..." size="lg" fullPage />
  }

  return (
    <div className="content-container flex flex-col min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/story")}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Input
              value={storyData.title || ""}
              onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
              className="h-9 w-[300px] font-medium border-transparent focus:border-slate-200 focus:ring-0"
              placeholder="Enter story title..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <LoadingState size="sm" text="" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            <Button onClick={handlePublish} size="sm" disabled={saving}>
              {saving ? (
                <>
                  <LoadingState size="sm" text="" className="mr-2" />
                  Publishing...
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Publish
                </>
              )}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export as Word
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export as Markdown
                  </Button>
                  <Separator className="my-1" />
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Editor Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Discard Changes
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <motion.div
          className={cn(
            "bg-white border-r border-slate-200 w-64 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
            !sidebarOpen && "w-0 border-r-0",
          )}
          animate={{ width: sidebarOpen ? 256 : 0 }}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-medium text-slate-900">Story Elements</h3>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-slate-500 uppercase">Basic Elements</h4>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("heading1")}
                  >
                    <Heading1 className="w-4 h-4 mr-2" />
                    Heading 1
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("heading2")}
                  >
                    <Heading2 className="w-4 h-4 mr-2" />
                    Heading 2
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("paragraph")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Paragraph
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("image")}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Image
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("list")}
                  >
                    <List className="w-4 h-4 mr-2" />
                    List
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("numbered-list")}
                  >
                    <ListOrdered className="w-4 h-4 mr-2" />
                    Numbered List
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-slate-500 uppercase">Advanced Elements</h4>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("timeline")}
                  >
                    <Layout className="w-4 h-4 mr-2" />
                    Timeline
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("people")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    People
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("location")}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Location
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700"
                    onClick={() => insertElement("date")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-slate-500 uppercase">Templates</h4>
                  {MOCK_TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "p-2 rounded-md cursor-pointer hover:bg-slate-100 transition-colors",
                        selectedTemplate === template.id && "bg-slate-100 ring-2 ring-primary ring-offset-1",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.color }} />
                        <span className="text-sm font-medium text-slate-700">{template.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-5">{template.description}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-slate-500 uppercase">AI Assistance</h4>
                  <Popover open={aiAssistOpen} onOpenChange={setAiAssistOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                        AI Writing Assistant
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm">AI Writing Assistant</h4>
                          <p className="text-xs text-slate-500 mt-1">Let AI help you generate content for your story</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ai-prompt">What would you like to write about?</Label>
                          <Textarea
                            id="ai-prompt"
                            placeholder="E.g., Write a paragraph about my grandmother's cooking"
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => setAiAssistOpen(false)}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleAIAssist("Sample prompt text")}>
                            <Sparkles className="w-3 h-3 mr-2" />
                            Generate
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-slate-700"
                      onClick={() => handleAIAssist("Improve writing")}
                    >
                      <Sparkles className="w-3 h-3 mr-2 text-amber-500" />
                      Improve Writing
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-slate-700"
                      onClick={() => handleAIAssist("Expand on this")}
                    >
                      <Sparkles className="w-3 h-3 mr-2 text-amber-500" />
                      Expand on This
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-slate-700"
                      onClick={() => handleAIAssist("Summarize")}
                    >
                      <Sparkles className="w-3 h-3 mr-2 text-amber-500" />
                      Summarize
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-slate-200">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSidebarOpen(false)}>
                <PanelLeft className="w-4 h-4 mr-2" />
                Hide Panel
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Editor */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="relative">
            {!sidebarOpen && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-4 z-10"
                onClick={() => setSidebarOpen(true)}
              >
                <PanelLeft className="w-4 h-4" />
              </Button>
            )}

            {!rightPanelOpen && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-4 z-10"
                onClick={() => setRightPanelOpen(true)}
              >
                <PanelRight className="w-4 h-4" />
              </Button>
            )}

            <div className="max-w-4xl mx-auto px-8 py-6">
              {/* Editor Toolbar */}
              <Card className="mb-6 border border-slate-200">
                <CardContent className="p-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Undo className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Redo className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Redo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <Select defaultValue="paragraph">
                      <SelectTrigger className="h-8 w-[130px] border-none">
                        <SelectValue placeholder="Paragraph" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="h1">Heading 1</SelectItem>
                        <SelectItem value="h2">Heading 2</SelectItem>
                        <SelectItem value="h3">Heading 3</SelectItem>
                        <SelectItem value="quote">Quote</SelectItem>
                      </SelectContent>
                    </Select>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bold className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bold</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Italic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Underline className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Underline</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Align Left</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Align Center</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Align Right</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Link className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Insert Link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Image className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Insert Image</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Separator orientation="vertical" className="h-6 mx-1" />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>AI Assist</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>

              {/* Subtitle Field */}
              <div className="mb-8">
                <Input
                  value={storyData.subtitle}
                  onChange={(e) => setStoryData({ ...storyData, subtitle: e.target.value })}
                  className="text-lg border-none shadow-none focus-visible:ring-0 p-0 h-auto font-medium text-slate-600"
                  placeholder="Add a subtitle (optional)"
                />
              </div>

              {/* Main Content Area */}
              <div className="min-h-[500px] mb-8">
                <Textarea
                  value={storyData.content}
                  onChange={(e) => setStoryData({ ...storyData, content: e.target.value })}
                  className="w-full min-h-[500px] border-none shadow-none focus-visible:ring-0 p-0 text-slate-800 resize-none"
                  placeholder="Begin your story here..."
                />
              </div>

              {/* Word Count & Auto-save Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div>
                  {wordCount} {wordCount === 1 ? "word" : "words"}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Last saved {formatLastSaved()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <motion.div
          className={cn(
            "bg-white border-l border-slate-200 w-80 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
            !rightPanelOpen && "w-0 border-l-0",
          )}
          animate={{ width: rightPanelOpen ? 320 : 0 }}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-medium text-slate-900">Story Settings</h3>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                <Tabs defaultValue="settings">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="settings" className="flex-1">
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="media" className="flex-1">
                      Media
                    </TabsTrigger>
                    <TabsTrigger value="collaborate" className="flex-1">
                      Collaborate
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="settings" className="space-y-6 mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={storyData.category}
                          onValueChange={(value) => setStoryData({ ...storyData, category: value })}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_CATEGORIES.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {storyData.tags.map((tagId) => {
                            const tag = MOCK_TAGS.find((t) => t.id === tagId)
                            return tag ? (
                              <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                                {tag.name}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 p-0 text-slate-500 hover:text-slate-700"
                                  onClick={() => handleRemoveTag(tag.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ) : null
                          })}
                        </div>
                        <Select onValueChange={handleAddTag}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a tag" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOCK_TAGS.filter((tag) => !storyData.tags.includes(tag.id)).map((tag) => (
                              <SelectItem key={tag.id} value={tag.id}>
                                {tag.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="public-switch">Public Story</Label>
                            <p className="text-xs text-slate-500">Make this story visible to others</p>
                          </div>
                          <Switch
                            id="public-switch"
                            checked={storyData.isPublic}
                            onCheckedChange={(checked) => setStoryData({ ...storyData, isPublic: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="comments-switch">Allow Comments</Label>
                            <p className="text-xs text-slate-500">Let others comment on your story</p>
                          </div>
                          <Switch
                            id="comments-switch"
                            checked={storyData.allowComments}
                            onCheckedChange={(checked) => setStoryData({ ...storyData, allowComments: checked })}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Featured Image</Label>
                        {storyData.featuredImage ? (
                          <div className="relative rounded-md overflow-hidden">
                            <img
                              src={storyData.featuredImage || "/placeholder.svg?height=200&width=400"}
                              alt="Featured"
                              className="w-full h-40 object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setStoryData({ ...storyData, featuredImage: null })}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-slate-200 rounded-md p-6 text-center">
                            <Image className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="mt-2 text-sm text-slate-500">Drag an image or click to upload</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Choose Image
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 mt-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Media Library</h4>
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {MOCK_MEDIA.map((media) => (
                        <div
                          key={media.id}
                          className="relative group rounded-md overflow-hidden border border-slate-200"
                        >
                          <img
                            src={media.url || "/placeholder.svg?height=100&width=100"}
                            alt={media.name}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="secondary" size="sm" className="h-8">
                              <Plus className="h-3 w-3 mr-1" />
                              Insert
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="link" size="sm" className="w-full">
                      View All Media
                    </Button>
                  </TabsContent>

                  <TabsContent value="collaborate" className="space-y-4 mt-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Collaborators</h4>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {MOCK_COLLABORATORS.map((collaborator) => (
                        <div
                          key={collaborator.id}
                          className="flex items-center justify-between p-2 rounded-md border border-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                              <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{collaborator.name}</p>
                              <p className="text-xs text-slate-500">{collaborator.email}</p>
                            </div>
                          </div>
                          <Select defaultValue="editor">
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="viewer">Viewer</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-md bg-slate-50 p-3 border border-slate-200">
                      <h5 className="text-sm font-medium mb-1">Share Link</h5>
                      <div className="flex gap-2">
                        <Input value="https://legacy.app/share/story/abc123" readOnly className="h-8 text-xs" />
                        <Button variant="outline" size="sm" className="h-8 shrink-0">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-slate-200">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setRightPanelOpen(false)}>
                <PanelRight className="w-4 h-4 mr-2" />
                Hide Panel
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

