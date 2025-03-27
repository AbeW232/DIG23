"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MarketplaceFilters } from "./marketplace-filters"
import { MarketplaceCategories } from "./marketplace-categories"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"

// Mock data for demonstration
const products = [
  {
    id: "prod1",
    name: "Premium Memorial Template Bundle",
    description: "A collection of 5 premium memorial templates with advanced customization options",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "templates",
    rating: 4.8,
    reviewCount: 124,
    featured: true,
  },
  {
    id: "prod2",
    name: "Legacy Box Digital Storage",
    description: "Secure cloud storage specifically designed for preserving digital legacies",
    price: 9.99,
    perMonth: true,
    image: "/placeholder.svg?height=300&width=500",
    category: "storage",
    rating: 4.6,
    reviewCount: 89,
    featured: false,
  },
  {
    id: "prod3",
    name: "Professional Memorial Video Creation",
    description: "Custom memorial video creation service with professional editing",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "services",
    rating: 4.9,
    reviewCount: 56,
    featured: true,
  },
  {
    id: "prod4",
    name: "Family Tree Premium Package",
    description: "Advanced family tree features with unlimited members and media storage",
    price: 29.99,
    perMonth: true,
    image: "/placeholder.svg?height=300&width=500",
    category: "subscriptions",
    rating: 4.7,
    reviewCount: 112,
    featured: false,
  },
  {
    id: "prod5",
    name: "Memorial Book Printing Service",
    description: "Convert digital memorials into beautiful physical keepsake books",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "services",
    rating: 4.5,
    reviewCount: 78,
    featured: false,
  },
  {
    id: "prod6",
    name: "Digital Time Capsule",
    description: "Create a digital time capsule to be delivered to loved ones in the future",
    price: 39.99,
    perYear: true,
    image: "/placeholder.svg?height=300&width=500",
    category: "subscriptions",
    rating: 4.4,
    reviewCount: 45,
    featured: false,
  },
]

export function MarketplaceListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])

  // Filter products based on search, category, and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1 space-y-6">
        <div className="sticky top-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Search</h3>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <MarketplaceCategories selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

                <MarketplaceFilters priceRange={priceRange} onPriceRangeChange={setPriceRange} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
          </h2>
          <Link href="/dashboard/marketplace/cart">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              View Cart
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="relative">
                <Link href={`/dashboard/marketplace/item/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                {product.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
              </div>
              <CardContent className="p-6 flex-grow">
                <Link href={`/dashboard/marketplace/item/${product.id}`} className="hover:underline">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.perMonth && <span className="text-sm text-muted-foreground">/month</span>}
                  {product.perYear && <span className="text-sm text-muted-foreground">/year</span>}
                </div>
                <Button size="sm">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

