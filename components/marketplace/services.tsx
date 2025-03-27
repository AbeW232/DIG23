"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Star, Heart, MessageSquare, User, CheckCircle, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample services data
const servicesData = [
  {
    id: "1",
    title: "Professional Biography Writing",
    description: "Custom biography writing service by professional writers",
    price: 149.99,
    category: "writing",
    provider: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 124,
    },
    deliveryTime: "7-10 days",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Video Memorial Creation",
    description: "Professional video memorial creation with photos and music",
    price: 199.99,
    category: "video",
    provider: {
      name: "Michael Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 98,
    },
    deliveryTime: "14 days",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Family Tree Research",
    description: "Professional genealogy research and family tree creation",
    price: 249.99,
    category: "research",
    provider: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 156,
    },
    deliveryTime: "21-30 days",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Photo Restoration & Colorization",
    description: "Professional restoration and colorization of old photos",
    price: 79.99,
    category: "photo",
    provider: {
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      reviews: 87,
    },
    deliveryTime: "5-7 days",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Legacy Interview Service",
    description: "Professional interview recording and editing service",
    price: 299.99,
    category: "interview",
    provider: {
      name: "Jessica Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      reviews: 64,
    },
    deliveryTime: "14-21 days",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Memorial Website Design",
    description: "Custom memorial website design and development",
    price: 349.99,
    category: "web",
    provider: {
      name: "David Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 112,
    },
    deliveryTime: "21 days",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function Services() {
  const [selectedService, setSelectedService] = useState<(typeof servicesData)[0] | null>(null)
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)

  const handleOpenServiceDialog = (service: (typeof servicesData)[0]) => {
    setSelectedService(service)
    setIsServiceDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              {service.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                </div>
                <Badge variant="outline" className="capitalize">
                  {service.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={service.provider.avatar} alt={service.provider.name} />
                  <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{service.provider.name}</span>
                <div className="flex items-center ml-auto text-sm">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span>{service.provider.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>Delivery: {service.deliveryTime}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="font-bold text-lg">${service.price.toFixed(2)}</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => handleOpenServiceDialog(service)}>
                  Details
                </Button>
                <Button>Hire</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Service Details Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedService.title}</DialogTitle>
                <DialogDescription>Service details and provider information</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src={selectedService.image || "/placeholder.svg"}
                      alt={selectedService.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">About the Provider</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={selectedService.provider.avatar} alt={selectedService.provider.name} />
                        <AvatarFallback>{selectedService.provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedService.provider.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span>{selectedService.provider.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{selectedService.provider.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Service Details</h3>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Delivery Time: {selectedService.deliveryTime}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        Includes 2 revisions
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        Satisfaction guaranteed
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <div className="text-2xl font-bold mb-4">${selectedService.price.toFixed(2)}</div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Hire Now</Button>
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

