import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ShoppingCart, Heart, Star, Filter, ArrowUpDown } from "lucide-react"

export function DigitalGoodsMarketplace() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Digital Goods Marketplace</CardTitle>
        <CardDescription>Browse and purchase digital assets for your legacy.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="templates">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="w-[200px] pl-8 h-8" />
              </div>
            </div>
          </div>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="h-full w-full bg-muted/50 flex items-center justify-center">Template {item}</div>
                    </div>
                    <div className="absolute right-2 top-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Legacy Template {item}</h4>
                        <Badge variant="outline" className="text-xs">
                          $19.99
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        Professional template for organizing and presenting your digital legacy.
                      </p>
                      <div className="flex items-center pt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= 4 ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-muted-foreground">(24)</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button size="sm" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="h-full w-full bg-muted/50 flex items-center justify-center">Asset {item}</div>
                    </div>
                    <div className="absolute right-2 top-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Digital Asset {item}</h4>
                        <Badge variant="outline" className="text-xs">
                          $5.99
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        High-quality digital asset for your legacy collection.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Card key={item} className="flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-muted flex items-center justify-center">
                      <div className="h-full w-full bg-muted/50 flex items-center justify-center">Service {item}</div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">Legacy Service {item}</h3>
                            <p className="text-sm text-muted-foreground">
                              Professional assistance with your digital legacy management.
                            </p>
                          </div>
                          <Badge className="bg-primary">From $99</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            Professional
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Secure
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Personalized
                          </Badge>
                        </div>
                        <div className="flex items-center pt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= (6 - item) ? "fill-primary text-primary" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-muted-foreground">({30 - item * 2})</span>
                        </div>
                        <div className="pt-2">
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">3 items in cart</span>
        </div>
        <Button>Checkout</Button>
      </CardFooter>
    </Card>
  )
}

