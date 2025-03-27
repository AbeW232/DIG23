"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MarketplaceCategoriesProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

// Mock data for demonstration
const categories = [
  {
    id: "templates",
    name: "Templates",
    count: 12,
  },
  {
    id: "services",
    name: "Services",
    count: 8,
  },
  {
    id: "storage",
    name: "Storage Solutions",
    count: 5,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    count: 7,
  },
  {
    id: "books",
    name: "Books & Guides",
    count: 4,
  },
  {
    id: "keepsakes",
    name: "Physical Keepsakes",
    count: 6,
  },
]

export function MarketplaceCategories({ selectedCategory, onCategoryChange }: MarketplaceCategoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Categories</h3>
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-1">
          <Button
            variant={selectedCategory === null ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onCategoryChange(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-between"
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">{category.count}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

