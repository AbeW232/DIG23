"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Wand2, Download, RotateCcw, Save, Sparkles, Contrast, Palette } from "lucide-react"

export function PhotoRestoration() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [restoredImage, setRestoredImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [restorationMode, setRestorationMode] = useState("auto")
  const [enhancementLevel, setEnhancementLevel] = useState([75])
  const [colorization, setColorization] = useState([50])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string)
        setRestoredImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string)
        setRestoredImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRestoreImage = () => {
    if (!originalImage) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      // For demo purposes, we're just using the original image
      // In a real app, this would call an AI service
      setRestoredImage(originalImage)
      setIsProcessing(false)
    }, 3000)
  }

  const handleReset = () => {
    setRestoredImage(null)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Photo Restoration</CardTitle>
          <CardDescription>Restore and enhance old or damaged photos using AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="restoration-mode">Restoration Mode</Label>
              <Select value={restorationMode} onValueChange={setRestorationMode}>
                <SelectTrigger id="restoration-mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automatic</SelectItem>
                  <SelectItem value="damage">Damage Repair</SelectItem>
                  <SelectItem value="colorize">Colorize B&W</SelectItem>
                  <SelectItem value="enhance">Enhance Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Enhancement Level</Label>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Subtle</span>
                <Slider
                  value={enhancementLevel}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={setEnhancementLevel}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">Strong</span>
              </div>
            </div>
            <div>
              <Label>Colorization</Label>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Natural</span>
                <Slider
                  value={colorization}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={setColorization}
                  className="flex-1"
                  disabled={restorationMode !== "colorize"}
                />
                <span className="text-sm text-muted-foreground">Vibrant</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </TabsTrigger>
              <TabsTrigger value="result" disabled={!restoredImage}>
                <Sparkles className="h-4 w-4 mr-2" />
                Restored Result
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-4">
              {!originalImage ? (
                <div
                  className="border-2 border-dashed rounded-lg p-12 text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Upload a Photo</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop a photo here, or click to browse</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button onClick={triggerFileInput}>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={originalImage || "/placeholder.svg"}
                      alt="Original photo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => setOriginalImage(null)}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <Button onClick={handleRestoreImage} disabled={isProcessing} className="ml-auto">
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Restore Photo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="result" className="mt-4">
              {restoredImage && (
                <div className="space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={restoredImage || "/placeholder.svg"}
                      alt="Restored photo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" size="sm">
                      <Contrast className="h-4 w-4 mr-2" />
                      Adjust
                    </Button>
                    <Button variant="outline" size="sm">
                      <Palette className="h-4 w-4 mr-2" />
                      Colorize
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save to Media Library
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

