"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Facebook, Mail, Twitter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function MemorialSharing() {
  const [activeTab, setActiveTab] = useState("link")
  const memorialUrl = "https://example.com/memorial/john-smith"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(memorialUrl)
    toast({
      title: "Link copied",
      description: "Memorial link has been copied to clipboard",
    })
  }

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Memorial for John Smith&body=I wanted to share this memorial page with you: ${memorialUrl}`
  }

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memorialUrl)}`, "_blank")
  }

  const shareViaTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(memorialUrl)}&text=Remembering John Smith`,
      "_blank",
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Share This Memorial</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-auto">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="memorial-link">Memorial Link</Label>
              <div className="flex gap-2">
                <Input id="memorial-link" value={memorialUrl} readOnly />
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Share this link with family and friends</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-share">Share via Email</Label>
              <Button variant="outline" className="w-full justify-start" onClick={shareViaEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground mb-2">Share this memorial on social media</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start" onClick={shareViaFacebook}>
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </Button>

              <Button variant="outline" className="justify-start" onClick={shareViaTwitter}>
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

