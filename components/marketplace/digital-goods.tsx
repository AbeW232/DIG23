"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, Heart, Star, Download, BookOpen, FileText, Music, Video, ImageIcon } from "lucide-react"
import { OptimizedImage } from "@/components/optimized/optimized-image"

// Sample digital goods data
const digitalGoodsData = [
  {
    id: "1",
    title: "Memorial Book Template",
    description: "Beautifully designed template for creating memorial books",
    price: 24.99,
    category: "template",
    rating: 4.8,
    reviews: 56,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: "2",
    title: "Legacy Video Intro",
    description: "Professional video intro for legacy videos",
    price: 19.99,
    category: "video",
    rating: 4.5,
    reviews: 32,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Family Tree Graphics Pack",
    description: "High-quality graphics for family tree visualizations",
    price: 14.99,
    category: "graphics",
    rating: 4.7,
    reviews: 48,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Memorial Music Collection",
    description: "Curated collection of memorial music tracks",
    price: 29.99,
    category: "audio",
    rating: 4.9,
    reviews: 75,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: "5",
    title: "Digital Scrapbook Kit",
    description: "Digital elements for creating memory scrapbooks",
    price: 17.99,
    category: "graphics",
    rating: 4.6,
    reviews: 41,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Tribute Page Template",
    description: "Ready-to-use template for online tribute pages",
    price: 12.99,
    category: "template",
    rating: 4.4,
    reviews: 28,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function DigitalGoods() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof digitalGoodsData)[0] | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)

  // Memoized function to get category icon
  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case "template":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "graphics":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }, [])

  const handleOpenProductDialog = useCallback((product: (typeof digitalGoodsData)[0]) => {
    setSelectedProduct(product)
    setIsProductDialogOpen(true)
  }, [])

  // Render product card - memoized to prevent unnecessary re-renders
  const renderProductCard = useCallback(
    (product: (typeof digitalGoodsData)[0], index: number) => {
      return (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative aspect-video">
            <OptimizedImage
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority={index < 2} // Prioritize loading first two images
            />
            {product.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                {getCategoryIcon(product.category)}
                <span className="capitalize">{product.category}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{product.reviews} reviews</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => handleOpenProductDialog(product)}>
                Details
              </Button>
              <Button size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )
    },
    [getCategoryIcon, handleOpenProductDialog],
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {digitalGoodsData.map((product, index) => renderProductCard(product, index))}
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.title}</DialogTitle>
                <DialogDescription>Digital product details and preview</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <OptimizedImage
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover"
                    priority={true}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(selectedProduct.category)}
                      <span className="capitalize">{selectedProduct.category}</span>
                    </Badge>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>{selectedProduct.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{selectedProduct.reviews} reviews</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Features</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        Instant digital download
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Includes documentation
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        Easy to customize
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <div className="text-2xl font-bold mb-4">${selectedProduct.price.toFixed(2)}</div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
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

