"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, Search, Book, FileText, Video, ArrowRight, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function HelpCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const helpTopics = [
    {
      category: "Getting Started",
      topics: [
        { title: "Creating your account", type: "article" },
        { title: "Setting up your profile", type: "article" },
        { title: "Adding family members", type: "video" },
        { title: "Creating your first story", type: "video" },
      ],
    },
    {
      category: "Stories & Media",
      topics: [
        { title: "Writing effective stories", type: "article" },
        { title: "Organizing your media library", type: "article" },
        { title: "Adding photos and videos", type: "video" },
        { title: "Creating exhibitions", type: "article" },
      ],
    },
    {
      category: "Family Tree",
      topics: [
        { title: "Building your family tree", type: "article" },
        { title: "Adding relationships", type: "article" },
        { title: "Importing GEDCOM files", type: "video" },
        { title: "Creating memorial pages", type: "article" },
      ],
    },
    {
      category: "Privacy & Sharing",
      topics: [
        { title: "Privacy settings explained", type: "article" },
        { title: "Sharing stories with family", type: "article" },
        { title: "Managing permissions", type: "video" },
        { title: "Public vs. private content", type: "article" },
      ],
    },
  ]

  const filteredTopics = searchQuery
    ? helpTopics
        .map((category) => ({
          ...category,
          topics: category.topics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.topics.length > 0)
    : helpTopics

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 fixed bottom-6 right-6 shadow-md">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help Center</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Help Center</DialogTitle>
          <DialogDescription>Find answers to common questions and learn how to use the platform.</DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="browse">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Topics</TabsTrigger>
              <TabsTrigger value="popular">Popular Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                {filteredTopics.length > 0 ? (
                  <div className="space-y-6">
                    {filteredTopics.map((category, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="font-medium text-lg">{category.category}</h3>
                        <div className="space-y-2">
                          {category.topics.map((topic, topicIndex) => (
                            <Card key={topicIndex} className="cursor-pointer hover:bg-muted/50 transition-colors">
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {topic.type === "article" ? (
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Video className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span>{topic.title}</span>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <Search className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-lg">No results found</h3>
                    <p className="text-muted-foreground">We couldn't find any help topics matching "{searchQuery}"</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="popular" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {[
                    "How do I create a family tree?",
                    "Can I control who sees my stories?",
                    "How do I add photos to my stories?",
                    "What file formats are supported for uploads?",
                    "How do I invite family members?",
                    "Can I export my stories as a book?",
                    "How do I create a memorial page?",
                    "What are exhibitions and how do I create one?",
                    "How can I use the AI writing assistant?",
                    "How do I change my privacy settings?",
                  ].map((question, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-muted-foreground mt-1" />
                            <span>{question}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <CardFooter className="border-t p-6 flex flex-col sm:flex-row gap-4 items-center">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Book className="mr-2 h-4 w-4" />
              View Documentation
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  )
}

