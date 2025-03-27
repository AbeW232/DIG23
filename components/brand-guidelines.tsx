import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Copy, Download, Palette, Type, ImageIcon } from "lucide-react"

export function BrandGuidelines() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Brand Guidelines
        </CardTitle>
        <CardDescription>Manage and view your brand-related settings and assets.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="logos">Logos & Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="colors" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-primary" />
                  <Input defaultValue="#0070f3" className="w-32" />
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-secondary" />
                  <Input defaultValue="#f5f5f5" className="w-32" />
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-accent" />
                  <Input defaultValue="#fafafa" className="w-32" />
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-foreground" />
                  <Input defaultValue="#000000" className="w-32" />
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </div>
          </TabsContent>
          <TabsContent value="typography" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Primary Font</Label>
                  <Button variant="outline" size="sm" className="h-8">
                    <Type className="mr-2 h-4 w-4" />
                    Change Font
                  </Button>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-xl font-bold">Inter</h3>
                  <p className="text-sm text-muted-foreground">A clean and modern sans-serif typeface</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-bold">Aa</span>
                      <span className="text-sm text-muted-foreground">Bold (700)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-medium">Aa</span>
                      <span className="text-sm text-muted-foreground">Medium (500)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-normal">Aa</span>
                      <span className="text-sm text-muted-foreground">Regular (400)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Sizes</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Heading 1</span>
                      <span className="text-sm text-muted-foreground">2.25rem (36px)</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Heading 2</span>
                      <span className="text-sm text-muted-foreground">1.875rem (30px)</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Heading 3</span>
                      <span className="text-sm text-muted-foreground">1.5rem (24px)</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Body</span>
                      <span className="text-sm text-muted-foreground">1rem (16px)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="logos" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Logo Assets</Label>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Asset
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Primary Logo</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center rounded-lg border bg-background p-6">
                    <div className="h-20 w-40 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">LOGO</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">PNG • 1200x600px • Last updated 2 weeks ago</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Icon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center rounded-lg border bg-background p-6">
                    <div className="h-20 w-20 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">ICON</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">SVG • 512x512px • Last updated 2 weeks ago</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo Usage Guidelines</Label>
                <Textarea
                  defaultValue="1. Always maintain clear space around the logo.
2. Do not distort or change the logo's proportions.
3. Do not change the logo's colors unless specified in the brand guidelines.
4. Minimum size: 100px width for digital use."
                  rows={5}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

