import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComplianceItemProps {
  title: string
  status: "compliant" | "partial" | "non-compliant"
  description: string
  recommendation?: string
}

function ComplianceItem({ title, status, description, recommendation }: ComplianceItemProps) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-base flex items-center gap-2">
          {status === "compliant" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {status === "partial" && <AlertCircle className="h-5 w-5 text-amber-500" />}
          {status === "non-compliant" && <XCircle className="h-5 w-5 text-red-500" />}
          {title}
        </h3>
        <Badge
          variant={status === "compliant" ? "default" : status === "partial" ? "outline" : "destructive"}
          className={
            status === "compliant"
              ? "bg-green-500/20 text-green-700 hover:bg-green-500/30"
              : status === "partial"
                ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30"
                : "bg-red-500/20 text-red-700 hover:bg-red-500/30"
          }
        >
          {status === "compliant" ? "Compliant" : status === "partial" ? "Partially Compliant" : "Non-Compliant"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      {recommendation && (
        <div className="bg-muted/50 p-3 rounded-md mt-2">
          <p className="text-sm flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5" />
            <span>{recommendation}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export function BrandGuidelinesReport() {
  // Calculate overall compliance percentages
  const colorCompliance = 65
  const typographyCompliance = 80
  const logoCompliance = 90
  const overallCompliance = Math.round((colorCompliance + typographyCompliance + logoCompliance) / 3)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Brand Guidelines Compliance Report
          <Badge variant={overallCompliance >= 80 ? "default" : overallCompliance >= 60 ? "outline" : "destructive"}>
            {overallCompliance}% Compliant
          </Badge>
        </CardTitle>
        <CardDescription>
          Analysis of how well our Digital Legacy Platform adheres to our brand guidelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Compliance</span>
              <span className="text-sm font-medium">{overallCompliance}%</span>
            </div>
            <Progress value={overallCompliance} className="h-2" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Colors</span>
                <span className="text-sm font-medium">{colorCompliance}%</span>
              </div>
              <Progress value={colorCompliance} className="h-2" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Typography</span>
                <span className="text-sm font-medium">{typographyCompliance}%</span>
              </div>
              <Progress value={typographyCompliance} className="h-2" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Logo Usage</span>
                <span className="text-sm font-medium">{logoCompliance}%</span>
              </div>
              <Progress value={logoCompliance} className="h-2" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="logos">Logos & Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 pt-4">
            <ComplianceItem
              title="Primary Color Usage"
              status="partial"
              description="Primary color (#0070f3) is used inconsistently across the platform. Some components use the correct color while others use variations."
              recommendation="Update all primary color references to use the CSS variable --primary or the Tailwind class bg-primary for consistency."
            />

            <ComplianceItem
              title="Secondary Color Usage"
              status="non-compliant"
              description="The secondary color in use (#2d3748) does not match the guideline color (#f5f5f5)."
              recommendation="Update the secondary color in the tailwind.config.ts file to match the brand guidelines."
            />

            <ComplianceItem
              title="Accent Color Usage"
              status="compliant"
              description="Accent color is correctly implemented across all components using the CSS variable system."
            />

            <ComplianceItem
              title="Text Color Contrast"
              status="partial"
              description="Some text elements do not maintain sufficient contrast with background colors, particularly in the dashboard cards."
              recommendation="Ensure all text meets WCAG AA contrast standards by using the defined text colors from the guidelines."
            />
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 pt-4">
            <ComplianceItem
              title="Font Family"
              status="compliant"
              description="The Inter font family is correctly implemented across the platform as specified in the guidelines."
            />

            <ComplianceItem
              title="Heading Sizes"
              status="partial"
              description="Most heading sizes follow guidelines, but H3 elements are inconsistent across different sections."
              recommendation="Standardize H3 elements to use text-xl (1.5rem/24px) as specified in the guidelines."
            />

            <ComplianceItem
              title="Font Weights"
              status="compliant"
              description="Font weights are correctly implemented with Bold (700), Medium (500), and Regular (400) as specified."
            />

            <ComplianceItem
              title="Line Heights"
              status="compliant"
              description="Line heights are consistent with the typography guidelines across all text elements."
            />
          </TabsContent>

          <TabsContent value="logos" className="space-y-4 pt-4">
            <ComplianceItem
              title="Logo Placement"
              status="compliant"
              description="The primary logo is correctly placed in the header and maintains proper spacing as specified."
            />

            <ComplianceItem
              title="Logo Sizing"
              status="compliant"
              description="Logo sizing follows the minimum size requirements across all instances."
            />

            <ComplianceItem
              title="Logo Color Variations"
              status="partial"
              description="The logo color in dark mode doesn't perfectly match the guidelines for dark backgrounds."
              recommendation="Update the logo color in dark mode to use the specified color variation for dark backgrounds."
            />

            <ComplianceItem
              title="Asset Usage"
              status="compliant"
              description="All brand assets are being used according to the specified guidelines with proper attribution."
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">Export Report</Button>
          <Button>Fix Compliance Issues</Button>
        </div>
      </CardContent>
    </Card>
  )
}

