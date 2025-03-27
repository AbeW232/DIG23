"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileUp, FileDown, Copy, Check, AlertCircle, Download, Upload } from "lucide-react"
import type { FamilyTreeData } from "./family-tree"
import { useToast } from "@/hooks/use-toast"

interface ImportExportProps {
  familyTreeData: FamilyTreeData
  onImport: (data: FamilyTreeData) => void
}

export function ImportExport({ familyTreeData, onImport }: ImportExportProps) {
  const [activeTab, setActiveTab] = useState("export")
  const [importData, setImportData] = useState("")
  const [copied, setCopied] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const { toast } = useToast()

  // Export family tree data as JSON
  const exportData = JSON.stringify(familyTreeData, null, 2)

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "Family tree data has been copied to your clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  // Download as JSON file
  const downloadJson = () => {
    const blob = new Blob([exportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${familyTreeData.name.replace(/\s+/g, "_")}_family_tree.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download started",
      description: "Your family tree data is being downloaded",
    })
  }

  // Handle import
  const handleImport = () => {
    try {
      // Validate and parse the imported data
      const parsedData = JSON.parse(importData)

      // Basic validation
      if (!parsedData.members || !Array.isArray(parsedData.members) || !parsedData.name) {
        setImportError("Invalid family tree data format")
        return
      }

      // Import the data
      onImport(parsedData)

      // Reset form and show success message
      setImportData("")
      setImportError(null)

      toast({
        title: "Import successful",
        description: "Family tree data has been imported successfully",
      })

      // Switch to export tab to show the imported data
      setActiveTab("export")
    } catch (error) {
      setImportError("Invalid JSON format. Please check your data and try again.")
    }
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setImportData(content)
    }
    reader.readAsText(file)
  }

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="export">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="import">
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Family Tree</CardTitle>
              <CardDescription>Export your family tree data as JSON for backup or sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea value={exportData} readOnly className="font-mono text-xs h-[300px] resize-none" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={downloadJson}>
                  <Download className="h-4 w-4 mr-2" />
                  Download JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Family Tree</CardTitle>
              <CardDescription>Import family tree data from JSON</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Upload JSON File</label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept=".json" onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Or paste JSON data</label>
                <Textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Paste your family tree JSON data here..."
                  className="font-mono text-xs h-[300px] resize-none"
                />
              </div>

              {importError && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {importError}
                </div>
              )}

              <div className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={!importData.trim()}>Import Data</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Import Family Tree Data</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will replace your current family tree data. Are you sure you want to continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleImport}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Input component for file upload
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  )
}

