import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Edit, FileText, Image, Sparkles, Wand2 } from "lucide-react"

export default function AIToolsDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
          <p className="text-muted-foreground">Enhance your content with our AI-powered tools</p>
        </div>

        <Tabs defaultValue="writing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
          </TabsList>

          <TabsContent value="writing" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Writing Assistant</CardTitle>
                  <CardDescription>Get suggestions for improving your writing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <Edit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Style Enhancement</CardTitle>
                  <CardDescription>Transform your writing style to match different tones</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <Wand2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Story Expansion</CardTitle>
                  <CardDescription>Expand brief notes into fully-formed stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photo" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Photo Enhancement</CardTitle>
                  <CardDescription>Restore and enhance old photos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="memory" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Memory Prompts</CardTitle>
                  <CardDescription>Get personalized prompts to help you recall important memories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-primary/10 mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Content Organization</CardTitle>
                  <CardDescription>AI helps categorize and tag your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

