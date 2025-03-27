"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, HardDrive, Lock, Save } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export function StorageSettings() {
  // State for all form fields
  const [storageProvider, setStorageProvider] = useState("local")
  const [storageAllocation, setStorageAllocation] = useState("5")
  const [encryptionMethod, setEncryptionMethod] = useState("aes-256")
  const [keyRotationPeriod, setKeyRotationPeriod] = useState("90")
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [maxFileSize, setMaxFileSize] = useState("100")
  const [maxTotalStorage, setMaxTotalStorage] = useState("5")
  const [documentLimit, setDocumentLimit] = useState("25")
  const [imageLimit, setImageLimit] = useState("15")
  const [audioLimit, setAudioLimit] = useState("50")
  const [videoLimit, setVideoLimit] = useState("100")
  const [archiveLimit, setArchiveLimit] = useState("100")

  // State for checkboxes
  const [compression, setCompression] = useState(true)
  const [deduplication, setDeduplication] = useState(true)
  const [encryption, setEncryption] = useState(true)
  const [keyRotation, setKeyRotation] = useState(true)
  const [backup, setBackup] = useState(true)
  const [customTypes, setCustomTypes] = useState(false)

  // State for file type checkboxes
  const [filePdf, setFilePdf] = useState(true)
  const [fileDoc, setFileDoc] = useState(true)
  const [fileXls, setFileXls] = useState(true)
  const [fileTxt, setFileTxt] = useState(true)
  const [fileJpg, setFileJpg] = useState(true)
  const [filePng, setFilePng] = useState(true)
  const [fileGif, setFileGif] = useState(true)
  const [fileTiff, setFileTiff] = useState(false)
  const [fileMp4, setFileMp4] = useState(true)
  const [fileMp3, setFileMp3] = useState(true)
  const [fileWav, setFileWav] = useState(true)
  const [fileMov, setFileMov] = useState(false)

  // State for tabs
  const [fileTabValue, setFileTabValue] = useState("allowed")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <HardDrive className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Storage Configuration</CardTitle>
                <CardDescription>Configure storage settings for digital legacy</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Storage Provider</Label>
              <Select value={storageProvider} onValueChange={setStorageProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select storage provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Storage</SelectItem>
                  <SelectItem value="aws">Amazon S3</SelectItem>
                  <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                  <SelectItem value="custom">Custom Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Storage Allocation</Label>
              <Select value={storageAllocation} onValueChange={setStorageAllocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select storage allocation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 GB per user</SelectItem>
                  <SelectItem value="5">5 GB per user</SelectItem>
                  <SelectItem value="10">10 GB per user</SelectItem>
                  <SelectItem value="25">25 GB per user</SelectItem>
                  <SelectItem value="50">50 GB per user</SelectItem>
                  <SelectItem value="100">100 GB per user</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Storage Upgrade Options</Label>
              <div className="space-y-2 border rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="upgrade-10" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="upgrade-10">10 GB - $1.99/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upgrade-50" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="upgrade-50">50 GB - $4.99/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upgrade-100" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="upgrade-100">100 GB - $9.99/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upgrade-500" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="upgrade-500">500 GB - $19.99/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="upgrade-1000" checked={false} onCheckedChange={() => {}} />
                  <Label htmlFor="upgrade-1000">1 TB - $29.99/month</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compression" className="cursor-pointer">
                  File Compression
                </Label>
                <div className="text-sm text-muted-foreground">Compress files to save storage space</div>
              </div>
              <Switch
                id="compression"
                checked={compression}
                onCheckedChange={setCompression}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="deduplication" className="cursor-pointer">
                  Deduplication
                </Label>
                <div className="text-sm text-muted-foreground">Remove duplicate files to save storage</div>
              </div>
              <Switch
                id="deduplication"
                checked={deduplication}
                onCheckedChange={setDeduplication}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Storage Settings
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Storage Security</CardTitle>
                <CardDescription>Configure security for stored legacy assets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="encryption" className="cursor-pointer">
                  Encryption at Rest
                </Label>
                <div className="text-sm text-muted-foreground">Encrypt all stored legacy assets</div>
              </div>
              <Switch
                id="encryption"
                checked={encryption}
                onCheckedChange={setEncryption}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Encryption Method</Label>
              <Select value={encryptionMethod} onValueChange={setEncryptionMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes-256">AES-256</SelectItem>
                  <SelectItem value="aes-128">AES-128</SelectItem>
                  <SelectItem value="rsa-2048">RSA-2048</SelectItem>
                  <SelectItem value="custom">Custom Encryption</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="key-rotation" className="cursor-pointer">
                  Key Rotation
                </Label>
                <div className="text-sm text-muted-foreground">Periodically rotate encryption keys</div>
              </div>
              <Switch
                id="key-rotation"
                checked={keyRotation}
                onCheckedChange={setKeyRotation}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Key Rotation Period</Label>
              <Select value={keyRotationPeriod} onValueChange={setKeyRotationPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotation period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="backup" className="cursor-pointer">
                  Automated Backups
                </Label>
                <div className="text-sm text-muted-foreground">Create regular backups of legacy assets</div>
              </div>
              <Switch
                id="backup"
                checked={backup}
                onCheckedChange={setBackup}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Backup Frequency</Label>
              <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>File Type Settings</CardTitle>
              <CardDescription>Configure allowed file types and size limits</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={fileTabValue} onValueChange={setFileTabValue}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="allowed">Allowed File Types</TabsTrigger>
              <TabsTrigger value="size">Size Limits</TabsTrigger>
            </TabsList>
            <TabsContent value="allowed" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Documents</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-pdf" checked={filePdf} onCheckedChange={setFilePdf} />
                      <Label htmlFor="file-pdf">PDF (.pdf)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-doc" checked={fileDoc} onCheckedChange={setFileDoc} />
                      <Label htmlFor="file-doc">Word (.doc, .docx)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-xls" checked={fileXls} onCheckedChange={setFileXls} />
                      <Label htmlFor="file-xls">Excel (.xls, .xlsx)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-txt" checked={fileTxt} onCheckedChange={setFileTxt} />
                      <Label htmlFor="file-txt">Text (.txt)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Images</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-jpg" checked={fileJpg} onCheckedChange={setFileJpg} />
                      <Label htmlFor="file-jpg">JPEG (.jpg, .jpeg)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-png" checked={filePng} onCheckedChange={setFilePng} />
                      <Label htmlFor="file-png">PNG (.png)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-gif" checked={fileGif} onCheckedChange={setFileGif} />
                      <Label htmlFor="file-gif">GIF (.gif)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-tiff" checked={fileTiff} onCheckedChange={setFileTiff} />
                      <Label htmlFor="file-tiff">TIFF (.tiff, .tif)</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Media</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-mp4" checked={fileMp4} onCheckedChange={setFileMp4} />
                      <Label htmlFor="file-mp4">Video (.mp4)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-mp3" checked={fileMp3} onCheckedChange={setFileMp3} />
                      <Label htmlFor="file-mp3">Audio (.mp3)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-wav" checked={fileWav} onCheckedChange={setFileWav} />
                      <Label htmlFor="file-wav">Audio (.wav)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="file-mov" checked={fileMov} onCheckedChange={setFileMov} />
                      <Label htmlFor="file-mov">Video (.mov)</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-types" className="cursor-pointer">
                    Allow Custom File Types
                  </Label>
                  <div className="text-sm text-muted-foreground">Enable administrators to add custom file types</div>
                </div>
                <Switch
                  id="custom-types"
                  checked={customTypes}
                  onCheckedChange={setCustomTypes}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </TabsContent>
            <TabsContent value="size" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Maximum File Size</Label>
                    <Select value={maxFileSize} onValueChange={setMaxFileSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maximum size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 MB</SelectItem>
                        <SelectItem value="50">50 MB</SelectItem>
                        <SelectItem value="100">100 MB</SelectItem>
                        <SelectItem value="250">250 MB</SelectItem>
                        <SelectItem value="500">500 MB</SelectItem>
                        <SelectItem value="1000">1 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Total Storage</Label>
                    <Select value={maxTotalStorage} onValueChange={setMaxTotalStorage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maximum storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 GB</SelectItem>
                        <SelectItem value="5">5 GB</SelectItem>
                        <SelectItem value="10">10 GB</SelectItem>
                        <SelectItem value="25">25 GB</SelectItem>
                        <SelectItem value="50">50 GB</SelectItem>
                        <SelectItem value="100">100 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>File Type Size Limits</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Type</TableHead>
                        <TableHead>Maximum Size</TableHead>
                        <TableHead>Custom Limit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Documents</TableCell>
                        <TableCell>25 MB</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={documentLimit}
                            onChange={(e) => setDocumentLimit(e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Images</TableCell>
                        <TableCell>15 MB</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={imageLimit}
                            onChange={(e) => setImageLimit(e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Audio</TableCell>
                        <TableCell>50 MB</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={audioLimit}
                            onChange={(e) => setAudioLimit(e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Video</TableCell>
                        <TableCell>100 MB</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={videoLimit}
                            onChange={(e) => setVideoLimit(e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Archives</TableCell>
                        <TableCell>100 MB</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={archiveLimit}
                            onChange={(e) => setArchiveLimit(e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save File Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

