"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  ImageIcon,
  Layers,
  LayoutGrid,
  Move,
  Music,
  Plus,
  Save,
  Search,
  Trash2,
  Video,
} from "lucide-react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

// Sample data for stories
const stories = [
  {
    id: "story-1",
    title: "Family Vacation 1995",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1995-06-15",
  },
  {
    id: "story-2",
    title: "Grandma's 80th Birthday",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2010-03-22",
  },
  {
    id: "story-3",
    title: "Our Wedding Day",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1985-09-10",
  },
  {
    id: "story-4",
    title: "First Home Purchase",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1992-11-05",
  },
  {
    id: "story-5",
    title: "Family Reunion 2020",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2020-07-18",
  },
  {
    id: "story-6",
    title: "Childhood Memories",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1970-01-01",
  },
  {
    id: "story-7",
    title: "College Graduation",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1988-05-20",
  },
  {
    id: "story-8",
    title: "Family Recipes",
    selected: false,
    type: "story",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2015-12-10",
  },
]

// Sample data for media items
const mediaItems = [
  {
    id: "media-1",
    title: "Family Photo Album",
    selected: false,
    type: "image",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2018-08-15",
  },
  {
    id: "media-2",
    title: "Wedding Video",
    selected: false,
    type: "video",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "1985-09-10",
  },
  {
    id: "media-3",
    title: "Grandpa's Interview",
    selected: false,
    type: "audio",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2019-04-22",
  },
  {
    id: "media-4",
    title: "Family Tree Document",
    selected: false,
    type: "document",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2021-02-10",
  },
  {
    id: "media-5",
    title: "Holiday Photos",
    selected: false,
    type: "image",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2017-12-25",
  },
  {
    id: "media-6",
    title: "Birthday Celebration",
    selected: false,
    type: "video",
    thumbnail: "/placeholder.svg?height=60&width=80",
    date: "2020-06-30",
  },
]

// Sample data for exhibition sections
const initialSections = [
  { id: "section-1", title: "Introduction", description: "Welcome to our family history", items: [] },
  { id: "section-2", title: "Early Years", description: "The beginning of our journey", items: [] },
  { id: "section-3", title: "Family Milestones", description: "Important moments in our lives", items: [] },
]

export function CurationTools() {
  const [activeTab, setActiveTab] = useState("selection")
  const [storyList, setStoryList] = useState(stories)
  const [mediaList, setMediaList] = useState(mediaItems)
  const [sections, setSections] = useState(initialSections)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentSection, setCurrentSection] = useState<string | null>("section-1")
  
  // Filter stories and media based on search query
  const filteredStories = storyList.filter(story => 
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredMedia = mediaList.filter(media => 
    media.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  
  // Add selected items to current section
  const addToSection = () => {
    if (!currentSection) return
    
    const updatedSections = sections.map(section => {
      if (section.id === currentSection) {
        const selectedStories = storyList.filter(story => selectedItems.includes(story.id))
        const selectedMedia = mediaList.filter(media => selectedItems.includes(media.id))
        const itemsToAdd = [...selectedStories, ...selectedMedia]
        
        return {
          ...section,
          items: [...section.items, ...itemsToAdd]
        }
      }
      return section
    })
    
    setSections(updatedSections)
    setSelectedItems([])
  }
  
  // Remove item from section
  const removeFromSection = (sectionId: string, itemId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        }
      }
      return section
    })
    
    setSections(updatedSections)
  }
  
  // Add new section
  const addNewSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: `New Section ${sections.length + 1}`,
      description: "Add a description for this section",
      items: []
    }
    
    setSections([...sections, newSection])
  }
  
  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return
    
    const { source, destination } = result
    
    // Reordering sections
    if (source.droppableId === "sections" && destination.droppableId === "sections") {
      const reorderedSections = Array.from(sections)
      const [removed] = reorderedSections.splice(source.index, 1)
      reorderedSections.splice(destination.index, 0, removed)
      
      setSections(reorderedSections)
    }
    
    // Reordering items within a section
    if (source.droppableId.startsWith("section-items-") && destination.droppableId === source.droppableId) {
      const sectionId = source.droppableId.replace("section-items-", "")
      const section = sections.find(s => s.id === sectionId)
      
      if (section) {
        const reorderedItems = Array.from(section.items)
        const [removed] = reorderedItems.splice(source.index, 1)
        reorderedItems.splice(destination.index, 0, removed)
        
        const updatedSections = sections.map(s => 
          s.id === sectionId ? { ...s, items: reorderedItems } : s
        )
        
        setSections(updatedSections)
      }
    }
  }
  
  // Get icon based on item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "story":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      case "video":
        return <Video className="h-4 w-4 text-red-500" />
      case "audio":
        return <Music className="h-4 w-4 text-purple-500" />
      case "document":
        return <FileText className="h-4 w-4 text-yellow-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="selection" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="selection">Story Selection</TabsTrigger>
          <TabsTrigger value="arrangement">Media Arrangement</TabsTrigger>
          <TabsTrigger value="flow">Exhibition Flow</TabsTrigger>
        </TabsList>
        
        {/* Story Selection Tab */}
        <TabsContent value="selection" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Available Content</CardTitle>
                <CardDescription>Select stories and media to include in your exhibition</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search content..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Tabs defaultValue="stories">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="stories">Stories</TabsTrigger>
                      <TabsTrigger value="media">Media</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="stories">
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2 p-1">
                          {filteredStories.map((story) => (
                            <div 
                              key={story.id}
                              className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${
                                selectedItems.includes(story.id) ? 'bg-muted' : ''
                              }`}
                            >
                              <Checkbox 
                                id={story.id} 
                                checked={selectedItems.includes(story.id)}
                                onCheckedChange={() => toggleItemSelection(story.id)}
                              />
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-[60px] h-[45px] bg-muted rounded flex-shrink-0 overflow-hidden">
                                  <img 
                                    src={story.thumbnail || "/placeholder.svg"} 
                                    alt={story.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor={story.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {story.title}
                                  </label>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(story.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="media">
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2 p-1">
                          {filteredMedia.map((media) => (
                            <div 
                              key={media.id}
                              className={`flex items-center space-x-2 p-2 rounded-md hover:bg-muted ${
                                selectedItems.includes(media.id) ? 'bg-muted' : ''
                              }`}
                            >
                              <Checkbox 
                                id={media.id} 
                                checked={selectedItems.includes(media.id)}
                                onCheckedChange={() => toggleItemSelection(media.id)}
                              />
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-[60px] h-[45px] bg-muted rounded flex-shrink-0 overflow-hidden relative">
                                  <img 
                                    src={media.thumbnail || "/placeholder.svg"} 
                                    alt={media.title} 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-1 right-1">
                                    {getItemIcon(media.type)}
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor={media.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {media.title}
                                  </label>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(media.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  {selectedItems.length} items selected
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedItems([])}
                    disabled={selectedItems.length === 0}
                  >
                    Clear
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={addToSection}
                    disabled={selectedItems.length === 0 || !currentSection}
                  >
                    Add to Section
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Exhibition Sections</CardTitle>
                <CardDescription>Organize your content into exhibition sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Current Section</Label>
                    <Select value={currentSection || ""} onValueChange={setCurrentSection}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4"
                        >
                          {sections.map((section, index) => (
                            <Draggable key={section.id} draggableId={section.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`border rounded-md p-4 ${
                                    currentSection === section.id ? 'ring-2 ring-primary' : ''
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="space-y-1">
                                      <div className="flex items-center">
                                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                          <Move className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-medium">{section.title}</h3>
                                      </div>
                                      <p className="text-sm text-muted-foreground">{section.description}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0"
                                        onClick={() => setCurrentSection(section.id)}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <Droppable droppableId={`section-items-${section.id}`}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="space-y-2 min-h-[50px]"
                                      >
                                        {section.items.length > 0 ? (
                                          section.items.map((item, itemIndex) => (
                                            <Draggable 
                                              key={item.id} 
                                              draggableId={item.id} 
                                              index={itemIndex}
                                            >
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-md"
                                                >
                                                  {getItemIcon(item.type)}
                                                  <div className="flex-1 text-sm">{item.title}</div>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0"
                                                    onClick={() => removeFromSection(section.id, item.id)}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))
                                        ) : (
                                          <div className="text-center py-4 text-sm text-muted-foreground">
                                            No items in this section. Add content from the left panel.
                                          </div>
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  
                  <Button variant="outline" onClick={addNewSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Section
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Sections
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Media Arrangement Tab */}
        <TabsContent value="arrangement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Arrangement</CardTitle>
              <CardDescription>Arrange and organize media for your exhibition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Layout Style</Label>
                  <Select defaultValue="grid">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Layout</SelectItem>
                      <SelectItem value="masonry">Masonry Layout</SelectItem>
                      <SelectItem value="carousel">Carousel Layout</SelectItem>
                      <SelectItem value="timeline">Timeline Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4 min-h-[400px] bg-muted/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {sections.flatMap(section => section.items).map((item, i) => (
                      <div key={i} className="border rounded-md bg-background p-2 cursor-move">
                        <div className="aspect-video bg-muted mb-2 flex items-center justify-center relative overflow-hidden">
                          <img 
                            src={item.thumbnail || "/placeholder.svg"} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 right-1">
                            {getItemIcon(item.type)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium truncate">{item.title}</div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Move className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <Label>Spacing Between Items</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select spacing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Item Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="mixed">Mixed Sizes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Change Layout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        
        {/* Exhibition Flow Tab */}
        <TabsContent value="flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Flow</CardTitle>
              <CardDescription>Define the narrative flow and sequence of your exhibition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Story Sequence</Label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="manual">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sequence type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Order</SelectItem>
                        <SelectItem value="chronological">Chronological</SelectItem>
                        <SelectItem value="reverse-chrono">Reverse Chronological</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Layers className="h-4 w-4 mr-2" />
                      Auto-Arrange
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <div key={section.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-muted-foreground">{index + 1}.</div>
                          <div>
                            <div className="font-medium">{section.title}</div>
                            <div className="text-sm text-muted-foreground">{section.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            disabled={index === 0}
                            onClick={() => {
                              const newSections = [...sections]
                              const temp = newSections[index]
                              newSections[index] = newSections[index - 1]
                              newSections[index - 1] = temp
                              setSections(newSections)
                            }}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            disabled={index === sections.length - 1}
                            onClick={() => {
                              const newSections = [...sections]
                              const temp = newSections[index]
                              newSections[index] = newSections[index + 1]
                              newSections[index + 1] = temp
                              setSections(newSections)
                            }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        {section.items.length > 0 ? (
                          section.items.map((item, itemIndex) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                              {getItemIcon(item.type)}
                              <div className="flex-1 text-sm">{item.title}</div>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  disabled={itemIndex === 0}
                                  onClick={() => {
                                    const newSections = sections.map(s => {
                                      if (s.id === section.id) {
                                        const newItems = [...s.items]
                                        const temp = newItems[itemIndex]
                                        newItems[itemIndex] = newItems[itemIndex - 1]
                                        newItems[itemIndex - 1] = temp
                                        return { ...s, items: newItems }
                                      }
                                      return s
                                    })
                                    setSections(newSections)
                                  }}
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  disabled={itemIndex === section.items.length - 1}
                                  onClick={() => {
                                    const newSections = sections.map(s => {
                                      if (s.id === section.id) {
                                        const newItems = [...s.items]
                                        const temp = newItems[itemIndex]
                                        newItems[itemIndex] = newItems[itemIndex + 1]
                                        newItems[itemIndex + 1] = temp
                                        return { ...s, items: newItems }
                                      }
                                      return s
                                    })
                                    setSections(newSections)
                                  }}
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-2 text-sm text-muted-foreground">
                            No items in this section.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label>Transition Style</Label>
                  <Select defaultValue="fade">
                    <SelectTrigger>
                      <SelectValue placeholder="Select transition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="flip">Flip</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Flow
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Flow
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

