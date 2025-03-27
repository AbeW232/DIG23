import type { Metadata } from "next"
import { IntegrationTestSuite } from "@/utils/test-utils"
import { PerformanceOptimizationSuite } from "@/utils/performance-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Optimization | Digital Legacy Platform",
  description: "Integration testing and performance optimization",
}

export default function OptimizationPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Optimization Tools</h1>
        <p className="text-muted-foreground">Integration testing and performance optimization utilities</p>
      </div>

      <Tabs defaultValue="integration" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="integration">Integration Testing</TabsTrigger>
          <TabsTrigger value="performance">Performance Optimization</TabsTrigger>
        </TabsList>
        <TabsContent value="integration" className="mt-6">
          <IntegrationTestSuite />
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <PerformanceOptimizationSuite />
        </TabsContent>
      </Tabs>
    </div>
  )
}

