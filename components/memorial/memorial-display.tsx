"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MemorialGallery } from "./memorial-gallery"
import { MemorialTributes } from "./memorial-tributes"
import { Edit, Heart, Share } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const memorialData = {
  id: "mem-1",
  name: "John Smith",
  birthDate: "January 15, 1945",
  passedDate: "March 20, 2023",
  biography:
    "John was a loving father, husband, and friend. He touched the lives of everyone he met with his kindness, wisdom, and sense of humor. Born in Chicago, he spent most of his life in Seattle where he worked as a teacher for over 30 years. His passion for education and mentoring young minds left an indelible mark on his community. John loved hiking, photography, and spending time with his family. His legacy lives on through his children, grandchildren, and the countless students whose lives he influenced.",
  coverImage: "/placeholder.svg?height=400&width=800",
  profileImage: "/placeholder.svg?height=200&width=200",
  location: "Seattle, Washington",
  quote: "To live in hearts we leave behind is not to die.",
}

export function MemorialDisplay() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden">
        <div
          className="h-64 md:h-80 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${memorialData.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={memorialData.profileImage || "/placeholder.svg"}
                alt={memorialData.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <Heart className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">{memorialData.name}</h1>
              <p className="text-sm md:text-base opacity-90">
                {memorialData.birthDate} - {memorialData.passedDate}
              </p>
              <p className="text-sm opacity-80">{memorialData.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/memorial/create">
            <Edit className="h-4 w-4 mr-2" />
            Edit Memorial
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="tributes">Tributes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                  <p className="text-muted-foreground">{memorialData.biography}</p>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Timeline</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">1945</div>
                      <div>
                        <h3 className="font-medium">Born in Chicago, Illinois</h3>
                        <p className="text-sm text-muted-foreground">January 15, 1945</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">1967</div>
                      <div>
                        <h3 className="font-medium">Graduated from University of Washington</h3>
                        <p className="text-sm text-muted-foreground">Bachelor of Education</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">1970</div>
                      <div>
                        <h3 className="font-medium">Married to Sarah Johnson</h3>
                        <p className="text-sm text-muted-foreground">June 12, 1970</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 flex-shrink-0 text-sm text-muted-foreground">1972-2010</div>
                      <div>
                        <h3 className="font-medium">Teacher at Roosevelt High School</h3>
                        <p className="text-sm text-muted-foreground">Taught History and Social Studies</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <blockquote className="italic text-xl text-center px-6 py-4">"{memorialData.quote}"</blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <MemorialGallery memorialId={memorialData.id} />
        </TabsContent>

        <TabsContent value="tributes" className="mt-6">
          <MemorialTributes memorialId={memorialData.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

