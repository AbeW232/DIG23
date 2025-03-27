"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import {
  BookOpen,
  FileText,
  Settings,
  Share2,
  Eye,
  Download,
  Layers,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Info,
} from "lucide-react"

export function ExportOptions() {
  const [activeTab, setActiveTab] = useState("pdf")
  const [includeImages, setIncludeImages] = useState(true)
  const [includeComments, setIncludeComments] = useState(false)
  const [includeTimeline, setIncludeTimeline] = useState(true)
  const [includeMetadata, setIncludeMetadata] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export Completed",
        description: "Your content has been exported successfully.",
        variant: "success",
      })
    }, 2000)
  }

  return (
    <Card className="w-full shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Export & Publishing Options
        </CardTitle>
        <CardDescription>
          Export your content in various formats or publish it to your preferred platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="pdf" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              PDF
            </TabsTrigger>
            <TabsTrigger value="ebook" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              eBook
            </TabsTrigger>
            <TabsTrigger value="publish" className="flex items-center gap-1.5">
              <Share2 className="h-4 w-4" />
              Publish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Document Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pdf-title">Document Title</Label>
                      <Input id="pdf-title" placeholder="Enter document title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdf-author">Author Name</Label>
                      <Input id="pdf-author" placeholder="Enter author name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdf-size">Page Size</Label>
                      <Select defaultValue="letter">
                        <SelectTrigger id="pdf-size">
                          <SelectValue placeholder="Select page size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="letter">Letter (8.5" x 11")</SelectItem>
                          <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
                          <SelectItem value="a5">A5 (148 x 210 mm)</SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdf-orientation">Orientation</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <RadioGroup defaultValue="portrait" className="flex">
                            <div className="flex items-center space-x-2 flex-1">
                              <RadioGroupItem value="portrait" id="portrait" />
                              <Label htmlFor="portrait" className="cursor-pointer">
                                Portrait
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 flex-1">
                              <RadioGroupItem value="landscape" id="landscape" />
                              <Label htmlFor="landscape" className="cursor-pointer">
                                Landscape
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Style Options</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pdf-theme">Theme</Label>
                      <Select defaultValue="classic">
                        <SelectTrigger id="pdf-theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="elegant">Elegant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdf-font">Font Family</Label>
                      <Select defaultValue="serif">
                        <SelectTrigger id="pdf-font">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Content Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-cover" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-cover" className="text-sm">
                          Include cover page
                        </Label>
                        <p className="text-xs text-muted-foreground">Add a title page to your document</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-toc" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-toc" className="text-sm">
                          Include table of contents
                        </Label>
                        <p className="text-xs text-muted-foreground">Add an automatic table of contents</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-images-pdf"
                        checked={includeImages}
                        onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-images-pdf" className="text-sm">
                          Include images
                        </Label>
                        <p className="text-xs text-muted-foreground">Add images from your content</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-comments-pdf"
                        checked={includeComments}
                        onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-comments-pdf" className="text-sm">
                          Include comments & tributes
                        </Label>
                        <p className="text-xs text-muted-foreground">Add comments from readers</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-timeline-pdf"
                        checked={includeTimeline}
                        onCheckedChange={(checked) => setIncludeTimeline(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-timeline-pdf" className="text-sm">
                          Include timeline events
                        </Label>
                        <p className="text-xs text-muted-foreground">Add chronological events</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-metadata-pdf"
                        checked={includeMetadata}
                        onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-metadata-pdf" className="text-sm">
                          Include metadata
                        </Label>
                        <p className="text-xs text-muted-foreground">Add tags and categories</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Image Quality</h3>
                  <div className="space-y-2">
                    <Label htmlFor="pdf-quality">Image Resolution</Label>
                    <Select defaultValue="high">
                      <SelectTrigger id="pdf-quality">
                        <SelectValue placeholder="Select image quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (faster export)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (larger file size)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Higher quality results in larger file sizes
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-blue-50">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">PDF Export Tips</h3>
                      <p className="text-xs text-blue-700 mt-1">
                        For best results, ensure all images are high resolution and all text is properly formatted. The
                        PDF will maintain the exact layout you see in the preview.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="h-4 w-4" />
                  Advanced
                </Button>
              </div>
              <Button onClick={handleExport} disabled={isExporting} className="gap-1.5">
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export as PDF
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ebook" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Book Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ebook-title">Book Title</Label>
                      <Input id="ebook-title" placeholder="Enter book title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ebook-author">Author Name</Label>
                      <Input id="ebook-author" placeholder="Enter author name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ebook-description">Book Description</Label>
                      <Input id="ebook-description" placeholder="Enter a brief description" />
                      <p className="text-xs text-muted-foreground">This will appear in e-book stores and readers</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Format Options</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ebook-format">eBook Format</Label>
                      <Select defaultValue="epub">
                        <SelectTrigger id="ebook-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="epub">EPUB (Most eReaders)</SelectItem>
                          <SelectItem value="mobi">MOBI (Kindle)</SelectItem>
                          <SelectItem value="both">Both Formats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ebook-cover">Cover Image</Label>
                      <div className="flex space-x-2">
                        <Input id="ebook-cover" type="file" accept="image/*" className="flex-1" />
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Recommended size: 1600 x 2400 pixels</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Content Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-toc-ebook" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-toc-ebook" className="text-sm">
                          Include table of contents
                        </Label>
                        <p className="text-xs text-muted-foreground">Add navigable chapters</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-images-ebook"
                        checked={includeImages}
                        onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-images-ebook" className="text-sm">
                          Include images
                        </Label>
                        <p className="text-xs text-muted-foreground">Add images from your content</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-comments-ebook"
                        checked={includeComments}
                        onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-comments-ebook" className="text-sm">
                          Include comments & tributes
                        </Label>
                        <p className="text-xs text-muted-foreground">Add comments from readers</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-timeline-ebook"
                        checked={includeTimeline}
                        onCheckedChange={(checked) => setIncludeTimeline(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="include-timeline-ebook" className="text-sm">
                          Include timeline events
                        </Label>
                        <p className="text-xs text-muted-foreground">Add chronological events</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Styling Options</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ebook-style">Design Theme</Label>
                      <Select defaultValue="default">
                        <SelectTrigger id="ebook-style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ebook-font">Font Family</Label>
                      <Select defaultValue="default">
                        <SelectTrigger id="ebook-font">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-amber-50">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">eBook Compatibility</h3>
                      <p className="text-xs text-amber-700 mt-1">
                        Different e-readers support different features. For maximum compatibility, use simple formatting
                        and ensure images are optimized for e-readers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="h-4 w-4" />
                  Advanced
                </Button>
              </div>
              <Button onClick={handleExport} disabled={isExporting} className="gap-1.5">
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export as eBook
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-muted/20">
                <h3 className="text-sm font-medium mb-3">Publication Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="publish-title">Publication Title</Label>
                    <Input id="publish-title" placeholder="Enter publication title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publish-description">Description</Label>
                    <Input id="publish-description" placeholder="Enter a brief description" />
                  </div>

                  <div className="space-y-2">
                    <Label>Access Level</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-muted/20 transition-colors">
                        <div>
                          <input
                            type="radio"
                            id="access-public"
                            name="access"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <Label
                            htmlFor="access-public"
                            className="flex flex-col cursor-pointer peer-checked:text-primary"
                          >
                            <span className="font-medium">Public</span>
                            <span className="text-xs text-muted-foreground">Anyone can view</span>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-muted/20 transition-colors">
                        <div>
                          <input type="radio" id="access-private" name="access" className="sr-only peer" />
                          <Label
                            htmlFor="access-private"
                            className="flex flex-col cursor-pointer peer-checked:text-primary"
                          >
                            <span className="font-medium">Private</span>
                            <span className="text-xs text-muted-foreground">Only those with the link</span>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-muted/20 transition-colors">
                        <div>
                          <input type="radio" id="access-password" name="access" className="sr-only peer" />
                          <Label
                            htmlFor="access-password"
                            className="flex flex-col cursor-pointer peer-checked:text-primary"
                          >
                            <span className="font-medium">Password Protected</span>
                            <span className="text-xs text-muted-foreground">Requires a password</span>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 border rounded-md p-3 hover:bg-muted/20 transition-colors">
                        <div>
                          <input type="radio" id="access-paid" name="access" className="sr-only peer" />
                          <Label
                            htmlFor="access-paid"
                            className="flex flex-col cursor-pointer peer-checked:text-primary"
                          >
                            <span className="font-medium">Paid</span>
                            <span className="text-xs text-muted-foreground">Requires purchase</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Distribution Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="channel-platform" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="channel-platform" className="text-sm">
                          Platform Website
                        </Label>
                        <p className="text-xs text-muted-foreground">Publish to your personal site</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="channel-email" />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="channel-email" className="text-sm">
                          Email Newsletter
                        </Label>
                        <p className="text-xs text-muted-foreground">Send to subscribers</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="channel-social" />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="channel-social" className="text-sm">
                          Social Media
                        </Label>
                        <p className="text-xs text-muted-foreground">Share on connected accounts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Publication Schedule</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="publish-date">Publication Date</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="publish-now" />
                          <Label htmlFor="publish-now" className="text-sm">
                            Publish now
                          </Label>
                        </div>
                      </div>
                      <Input id="publish-date" type="datetime-local" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-publish">Notification</Label>
                        <Switch id="notify-publish" defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Receive an email notification when your content is published
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-green-50">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Publishing Checklist</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-green-700">Title and description are complete</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-green-700">Featured image is set</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <p className="text-xs text-amber-700">
                          Add at least 3 relevant tags to improve discoverability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="h-4 w-4" />
                  Advanced
                </Button>
              </div>
              <Button onClick={handleExport} disabled={isExporting} className="gap-1.5">
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Publish Content
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Layers className="h-4 w-4" />
          View History
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Settings className="h-4 w-4" />
          Advanced Options
        </Button>
      </CardFooter>
    </Card>
  )
}

