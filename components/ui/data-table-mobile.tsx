"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface DataTableMobileProps<TData> {
  data: TData[]
  columns: {
    id: string
    header: string
    accessorKey?: string
    cell?: (row: TData) => React.ReactNode
    enableSorting?: boolean
  }[]
  primaryColumn: string
  secondaryColumn?: string
  actions?: (row: TData) => React.ReactNode
}

export function DataTableMobile<TData>({
  data,
  columns,
  primaryColumn,
  secondaryColumn,
  actions,
}: DataTableMobileProps<TData>) {
  return (
    <div className="space-y-2">
      {data.map((row, rowIndex) => (
        <Card key={rowIndex} variant="outline" className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <div className="font-medium">{getPrimaryContent(row, columns, primaryColumn)}</div>
                {secondaryColumn && (
                  <div className="text-sm text-muted-foreground">
                    {getSecondaryContent(row, columns, secondaryColumn)}
                  </div>
                )}
              </div>
              {actions && <div className="flex items-center">{actions(row)}</div>}
            </div>

            <div className="divide-y">
              {columns
                .filter((col) => col.id !== primaryColumn && col.id !== secondaryColumn)
                .map((column) => {
                  const value = column.accessorKey
                    ? String(row[column.accessorKey as keyof TData] || "")
                    : column.cell
                      ? column.cell(row)
                      : ""

                  return (
                    <div key={column.id} className="flex justify-between p-3">
                      <div className="text-sm font-medium">{column.header}</div>
                      <div className="text-sm text-right">{typeof value === "object" ? value : String(value)}</div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getPrimaryContent<TData>(row: TData, columns: DataTableMobileProps<TData>["columns"], primaryColumn: string) {
  const column = columns.find((col) => col.id === primaryColumn)
  if (!column) return ""

  if (column.cell) {
    return column.cell(row)
  }

  if (column.accessorKey) {
    return String(row[column.accessorKey as keyof TData] || "")
  }

  return ""
}

function getSecondaryContent<TData>(
  row: TData,
  columns: DataTableMobileProps<TData>["columns"],
  secondaryColumn: string,
) {
  const column = columns.find((col) => col.id === secondaryColumn)
  if (!column) return ""

  if (column.cell) {
    return column.cell(row)
  }

  if (column.accessorKey) {
    return String(row[column.accessorKey as keyof TData] || "")
  }

  return ""
}

