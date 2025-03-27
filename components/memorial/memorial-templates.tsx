"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check } from "lucide-react"

// Mock data for demonstration
const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "A timeless design with elegant typography and subtle colors",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: false,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean, minimalist design with contemporary styling",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: false,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design with ornate details and refined aesthetics",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: true,
  },
  {
    id: "nature",
    name: "Nature",
    description: "Peaceful design with natural elements and serene imagery",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: true,
  },
  {
    id: "spiritual",
    name: "Spiritual",
    description: "Thoughtful design with symbolic elements and peaceful aesthetics",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: true,
  },
  {
    id: "celebration",
    name: "Celebration of Life",
    description: "Vibrant design focused on celebrating a life well-lived",
    image: "/placeholder.svg?height=300&width=500",
    isPremium: true,
  },
]

export function MemorialTemplates() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    router.push(`/memorial/create?template=${templateId}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(template.id)}>
                  Preview
                </Button>
                <Button size="sm" onClick={() => handleSelectTemplate(template.id)} disabled={template.isPremium}>
                  {template.isPremium ? "Upgrade to Use" : "Use Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{templates.find((t) => t.id === previewTemplate)?.name} Template</DialogTitle>
            <DialogDescription>Preview how your memorial will look with this template</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <img
              src={templates.find((t) => t.id === previewTemplate)?.image || "/placeholder.svg"}
              alt={templates.find((t) => t.id === previewTemplate)?.name}
              className="w-full h-auto rounded-md"
            />

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Template Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Customizable color scheme</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Responsive design for all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Gallery with lightbox feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span>Timeline section for life events</span>
                </li>
                {templates.find((t) => t.id === previewTemplate)?.isPremium && (
                  <>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>Advanced customization options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>Premium animations and transitions</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleSelectTemplate(previewTemplate!)
                setPreviewTemplate(null)
              }}
              disabled={templates.find((t) => t.id === previewTemplate)?.isPremium}
            >
              {templates.find((t) => t.id === previewTemplate)?.isPremium ? "Upgrade to Use" : "Use Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

