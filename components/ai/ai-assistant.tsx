"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, Sparkles, Lightbulb, PenTool, BookOpen, Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIAssistantProps {
  className?: string
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Suggestion = {
  id: string
  text: string
  icon: React.ReactNode
}

export function AIAssistant({ className }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help with your digital legacy project today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const suggestions: Suggestion[] = [
    {
      id: "s1",
      text: "Help me write a memorial story",
      icon: <PenTool className="h-4 w-4" />,
    },
    {
      id: "s2",
      text: "Suggest ideas for my family history book",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "s3",
      text: "How can I improve my photo collection?",
      icon: <Image className="h-4 w-4" />,
    },
    {
      id: "s4",
      text: "Generate a timeline of key events",
      icon: <Lightbulb className="h-4 w-4" />,
    },
  ]

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Help me write a memorial story":
          "I'd be happy to help you write a memorial story. To get started, consider these elements:\n\n1. Begin with a meaningful introduction that captures the essence of the person\n2. Include specific memories and anecdotes that highlight their character\n3. Describe their impact on others and lasting legacy\n4. Consider including quotes from family and friends\n5. End with a reflection on their enduring influence\n\nWould you like me to help you develop any of these sections?",
        "Suggest ideas for my family history book":
          "Creating a family history book is a wonderful project! Here are some ideas to consider:\n\n• Start with a family tree visualization\n• Include historical context for different generations\n• Feature personal stories and firsthand accounts\n• Add photographs with detailed captions\n• Include family recipes, traditions, and heirlooms\n• Create timelines of major family events\n• Add maps showing family migrations\n• Include interviews with elder family members\n\nWhich of these elements interests you most?",
        "How can I improve my photo collection?":
          "To enhance your photo collection, consider these approaches:\n\n1. Organize photos chronologically or by theme\n2. Use AI enhancement tools to restore old or damaged photos\n3. Add detailed metadata including dates, locations, and people\n4. Create consistent naming conventions\n5. Develop a tagging system for easy searching\n6. Consider creating curated albums for specific events or time periods\n7. Add contextual information or stories to accompany images\n\nWould you like specific guidance on any of these strategies?",
        "Generate a timeline of key events":
          "I'd be happy to help you create a timeline of key events. To make it most meaningful, I'll need some information:\n\n• What time period should the timeline cover?\n• Are you focusing on personal events, family history, or broader historical context?\n• Would you like to include photos or other media with timeline entries?\n• Do you prefer a chronological format or grouping by themes?\n• Are there specific milestone types you want to highlight?\n\nOnce you provide these details, I can help generate a structured timeline framework.",
      }

      // Find a matching response or use default
      let responseContent = "I'll help you with that. Could you provide more details about what you're looking for?"

      for (const [key, value] of Object.entries(responses)) {
        if (input.includes(key.toLowerCase())) {
          responseContent = value
          break
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Writing Assistant
        </CardTitle>
        <CardDescription>Your AI assistant is ready to help.</CardDescription>
      </CardHeader>
      <CardContent className="pl-6 pr-6">
        <ScrollArea className="h-[300px] mb-4">
          <div className="flex flex-col gap-2">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-2">
                {message.role === "assistant" ? (
                  <Avatar>
                    <AvatarImage src="/avatars/0.png" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage src="/avatars/7.png" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/avatars/0.png" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">Typing...</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              className="justify-start gap-2 text-sm"
              onClick={() => {
                setInput(suggestion.text)
                handleSendMessage()
              }}
            >
              {suggestion.icon}
              {suggestion.text}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">Powered by AI</CardFooter>
    </Card>
  )
}

