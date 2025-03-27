"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandGuidelines } from "@/components/settings/brand-guidelines"

export function ProfileSettings() {
  const [name, setName] = useState("Jane Smith")
  const [email, setEmail] = useState("jane.smith@example.com")
  const [bio, setBio] = useState("Digital storyteller and family historian.")
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=100&width=100")
  const [activeTab, setActiveTab] = useState("personal")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would upload the file to a server
    // and then set the URL of the uploaded file
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="brand">Brand Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Upload className="h-4 w-4" />
                  <span>Change profile picture</span>
                </div>
              </Label>
              <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <p className="text-sm text-muted-foreground mt-1">Recommended: Square JPG or PNG, at least 500x500px</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Tell us about yourself"
              />
              <p className="text-sm text-muted-foreground">
                Brief description for your profile. This will be displayed publicly.
              </p>
            </div>

            <Button type="submit">Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="brand">
          <BrandGuidelines />
        </TabsContent>
      </Tabs>
    </div>
  )
}

