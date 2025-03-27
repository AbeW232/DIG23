import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DigitalGoods } from "@/components/marketplace/digital-goods"
import { Services } from "@/components/marketplace/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Filter } from "lucide-react"

export const metadata: Metadata = {
  title: "Marketplace | Digital Legacy Platform",
  description: "Browse and purchase digital goods and services",
}

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Browse and purchase digital goods and services</p>
        </div>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search marketplace..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="goods" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goods">Digital Goods</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        <TabsContent value="goods" className="mt-6">
          <DigitalGoods />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
          <Services />
        </TabsContent>
      </Tabs>
    </div>
  )
}

