"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Wand2, Sparkles, RefreshCw, Download, Trash2, Plus, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ImageEnhancerProps {
  initialImage?: string
  onImageChange?: (image: string) => void
  className?: string
}

export function ImageEnhancer({ initialImage, onImageChange, className }: ImageEnhancerProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("enhance")
  const [brightness, setBrightness] = useState([50])
  const [contrast, setContrast] = useState([50])
  const [saturation, setSaturation] = useState([50])
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("natural")
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImage(imageUrl)
        setEnhancedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Mock function to simulate AI image processing
  const processImage = () => {
    if (!image) return

    setIsProcessing(true)

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll just apply a CSS filter to the original image
      // In a real implementation, this would call an AI service
      setEnhancedImage(image)
      setIsProcessing(false)

      if (onImageChange) {
        onImageChange(image)
      }
    }, 2000)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setEnhancedImage(null)
  }

  const getFilterStyle = () => {
    return {
      filter: `brightness(${brightness[0] / 50}) contrast(${contrast[0] / 50}) saturate(${saturation[0] / 50})`,
    }
  }

  const getStylePreview = (styleType: string) => {
    const baseStyles: Record<string, React.CSSProperties> = {
      natural: {},
      vintage: { filter: "sepia(0.5) contrast(1.1)" },
      dramatic: { filter: "contrast(1.3) saturate(1.5) brightness(0.9)" },
      blackAndWhite: { filter: "grayscale(1)" },
      warm: { filter: "sepia(0.3) saturate(1.3) brightness(1.1)" },
      cool: { filter: "hue-rotate(30deg) saturate(0.8)" },
    }

    return baseStyles[styleType] || {}
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          AI Image Enhancer
        </CardTitle>
        <CardDescription>Enhance, restore, and transform your images with AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 h-[200px] relative">
              {!image ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop an image or click to upload</p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Image
                      </span>
                    </Button>
                  </label>
                </div>
              ) : (
                <>
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Original"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="flex justify-center p-4">
                          <img
                            src={image || "/placeholder.svg"}
                            alt="Original full size"
                            className="max-h-[70vh] max-w-full object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 bg-background/80"
                      onClick={handleRemoveImage}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
            <p className="text-xs text-center text-muted-foreground">Original Image</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 h-[200px] relative">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mb-2" />
                  <p className="text-sm text-muted-foreground">Processing image...</p>
                </div>
              ) : enhancedImage ? (
                <>
                  <img
                    src={enhancedImage || "/placeholder.svg"}
                    alt="Enhanced"
                    className="max-h-full max-w-full object-contain"
                    style={activeTab === "enhance" ? getFilterStyle() : getStylePreview(style)}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="flex justify-center p-4">
                          <img
                            src={enhancedImage || "/placeholder.svg"}
                            alt="Enhanced full size"
                            className="max-h-[70vh] max-w-full object-contain"
                            style={activeTab === "enhance" ? getFilterStyle() : getStylePreview(style)}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {image ? "Click 'Process Image' to enhance" : "Upload an image first"}
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-center text-muted-foreground">Enhanced Image</p>
          </div>
        </div>

        {image && (
          <Tabs defaultValue="enhance" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="enhance">Manual Enhance</TabsTrigger>
              <TabsTrigger value="style">Apply Style</TabsTrigger>
              <TabsTrigger value="generate">AI Generate</TabsTrigger>
            </TabsList>

            <TabsContent value="enhance" className="pt-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="brightness">Brightness</Label>
                    <span className="text-xs text-muted-foreground">{brightness[0]}%</span>
                  </div>
                  <Slider id="brightness" value={brightness} min={0} max={100} step={1} onValueChange={setBrightness} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="contrast">Contrast</Label>
                    <span className="text-xs text-muted-foreground">{contrast[0]}%</span>
                  </div>
                  <Slider id="contrast" value={contrast} min={0} max={100} step={1} onValueChange={setContrast} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="saturation">Saturation</Label>
                    <span className="text-xs text-muted-foreground">{saturation[0]}%</span>
                  </div>
                  <Slider id="saturation" value={saturation} min={0} max={100} step={1} onValueChange={setSaturation} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="pt-4 space-y-4">
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="blackAndWhite">Black & White</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cool">Cool</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-3 gap-2">
                {["natural", "vintage", "dramatic"].map((styleType) => (
                  <div
                    key={styleType}
                    className={cn(
                      "border rounded-md p-1 cursor-pointer hover:border-primary transition-colors",
                      style === styleType && "border-primary",
                    )}
                    onClick={() => setStyle(styleType)}
                  >
                    <div className="aspect-square rounded-md overflow-hidden">
                      {image && (
                        <img
                          src={image || "/placeholder.svg"}
                          alt={styleType}
                          className="w-full h-full object-cover"
                          style={getStylePreview(styleType)}
                        />
                      )}
                    </div>
                    <p className="text-xs text-center mt-1 capitalize">{styleType}</p>
                  </div>
                ))}
                {["blackAndWhite", "warm", "cool"].map((styleType) => (
                  <div
                    key={styleType}
                    className={cn(
                      "border rounded-md p-1 cursor-pointer hover:border-primary transition-colors",
                      style === styleType && "border-primary",
                    )}
                    onClick={() => setStyle(styleType)}
                  >
                    <div className="aspect-square rounded-md overflow-hidden">
                      {image && (
                        <img
                          src={image || "/placeholder.svg"}
                          alt={styleType}
                          className="w-full h-full object-cover"
                          style={getStylePreview(styleType)}
                        />
                      )}
                    </div>
                    <p className="text-xs text-center mt-1 capitalize">
                      {styleType === "blackAndWhite" ? "B&W" : styleType}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="generate" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe how you want to transform the image</Label>
                <Input
                  id="prompt"
                  placeholder="E.g., Make it look like a painting, add a sunset background..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Be specific about the style, mood, or changes you want to apply.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRemoveImage} disabled={!image || isProcessing}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={processImage} disabled={!image || isProcessing}>
          {isProcessing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Process Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

