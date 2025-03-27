import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Zap, HardDrive, ImageIcon, FileText } from "lucide-react"

export function OptimizationTools() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Optimization Tools
        </CardTitle>
        <CardDescription>Tools to optimize your digital legacy assets and performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="storage">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="storage" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Storage Usage</span>
                </div>
                <span className="text-sm font-medium">4.2 GB / 10 GB</span>
              </div>
              <Progress value={42} />
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Storage Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Duplicate photos detected (245 MB potential savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Large unused files found (120 MB potential savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Compress documents to save space (80 MB potential savings)</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="images" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Image Optimization</span>
                </div>
                <span className="text-sm font-medium">128 images</span>
              </div>
              <Progress value={65} />
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Image Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Batch compress high-resolution photos (35% potential savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Convert legacy formats to modern formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Add missing metadata to 24 images</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Document Optimization</span>
                </div>
                <span className="text-sm font-medium">89 documents</span>
              </div>
              <Progress value={78} />
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Document Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>OCR scan 12 documents for better searchability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Compress large PDF files (25% potential savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Add tags to 18 documents for better organization</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Run Optimization</Button>
      </CardFooter>
    </Card>
  )
}

