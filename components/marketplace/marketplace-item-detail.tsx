"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart, Share, ArrowLeft } from "lucide-react"

interface MarketplaceItemDetailProps {
  itemId: string
}

// Mock data for demonstration
const product = {
  id: "prod1",
  name: "Premium Memorial Template Bundle",
  description:
    "A collection of 5 premium memorial templates with advanced customization options. Each template is designed to create beautiful, personalized memorial pages that honor your loved ones. The bundle includes a variety of styles to suit different preferences and needs.",
  price: 49.99,
  image: "/placeholder.svg?height=500&width=800",
  gallery: [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
  category: "templates",
  rating: 4.8,
  reviewCount: 124,
  featured: true,
  details: [
    "5 premium memorial templates",
    "Advanced customization options",
    "Mobile-responsive designs",
    "Interactive timeline feature",
    "Enhanced photo gallery",
    "Tribute and comment system",
    "Social media sharing integration",
    "Lifetime access to updates",
  ],
  reviews: [
    {
      id: "rev1",
      author: "Sarah Johnson",
      authorImage: "/placeholder.svg?height=50&width=50",
      date: "March 15, 2023",
      rating: 5,
      content:
        "These templates are beautiful and made creating a memorial for my father so much easier. The customization options are extensive and the support team was very helpful.",
    },
    {
      id: "rev2",
      author: "Michael Smith",
      authorImage: "/placeholder.svg?height=50&width=50",
      date: "February 28, 2023",
      rating: 4,
      content:
        "Great templates with lots of features. I would have given 5 stars but I had some initial difficulty with the photo gallery. Once I figured it out, everything worked perfectly.",
    },
    {
      id: "rev3",
      author: "Emily Rodriguez",
      authorImage: "/placeholder.svg?height=50&width=50",
      date: "January 10, 2023",
      rating: 5,
      content:
        "Absolutely worth every penny! The templates are elegant and professional. I created a beautiful memorial for my grandmother that our entire family loves.",
    },
  ],
}

export function MarketplaceItemDetail({ itemId }: MarketplaceItemDetailProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedImage, setSelectedImage] = useState(product.image)

  const handleAddToCart = () => {
    // Add to cart logic would go here
    router.push("/dashboard/marketplace/cart")
  }

  const handleBuyNow = () => {
    // Buy now logic would go here
    router.push("/dashboard/marketplace/checkout")
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="flex items-center gap-2 mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border">
            <img src={selectedImage || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[product.image, ...product.gallery].map((image, index) => (
              <div
                key={index}
                className={`rounded-md overflow-hidden border cursor-pointer ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{product.category}</Badge>
              {product.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    color={i < Math.floor(product.rating) ? "orange" : "gray"}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Label>Total</Label>
                <div className="text-lg font-bold">${(product.price * quantity).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="mb-4">{product.description}</p>
              <p>
                This premium bundle includes five distinct memorial templates, each designed with care and attention to
                detail. Whether you're looking for a traditional, elegant design or something more modern and vibrant,
                this bundle has options to suit your needs.
              </p>
              <p className="mt-4">
                All templates are fully customizable, allowing you to create a unique and personal tribute to your loved
                one. The intuitive editor makes it easy to add photos, videos, stories, and tributes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.authorImage} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center mt-1 sm:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                fill={i < review.rating ? "currentColor" : "none"}
                                color={i < review.rating ? "orange" : "gray"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
    >
      {children}
    </label>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

