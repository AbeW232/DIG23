import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = Redis.fromEnv()

// Cache TTL in seconds
const CACHE_TTL = 60 * 5 // 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extract query parameters
  const id = searchParams.get("id")
  const fields = searchParams.get("fields")?.split(",") || ["id", "title", "description"]
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  // Create a cache key based on the request parameters
  const cacheKey = `api:${request.url}`

  try {
    // Try to get data from cache first
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      // Return cached data with cache header
      return NextResponse.json(JSON.parse(cachedData as string), {
        headers: {
          "X-Cache": "HIT",
          "Cache-Control": `public, max-age=${CACHE_TTL}`,
        },
      })
    }

    // If not in cache, fetch from database
    // This is a mock implementation - replace with your actual database query
    let data

    if (id) {
      // Fetch a single item
      data = await fetchSingleItem(id, fields)
    } else {
      // Fetch a paginated list
      data = await fetchPaginatedList(page, limit, fields)
    }

    // Store in cache with expiration
    await redis.set(cacheKey, JSON.stringify(data), { ex: CACHE_TTL })

    // Return fresh data with cache header
    return NextResponse.json(data, {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": `public, max-age=${CACHE_TTL}`,
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Mock function to fetch a single item
async function fetchSingleItem(id: string, fields: string[]) {
  // In a real implementation, this would query your database
  // with field selection for performance

  // Example with Prisma:
  // return prisma.item.findUnique({
  //   where: { id },
  //   select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
  // })

  // Mock implementation
  return {
    id,
    title: "Sample Item",
    description: "This is a sample item",
    createdAt: new Date().toISOString(),
    // Additional fields would be included based on the fields parameter
  }
}

// Mock function to fetch a paginated list
async function fetchPaginatedList(page: number, limit: number, fields: string[]) {
  // Calculate offset
  const skip = (page - 1) * limit

  // In a real implementation, this would query your database
  // with pagination and field selection

  // Example with Prisma:
  // const [items, total] = await Promise.all([
  //   prisma.item.findMany({
  //     skip,
  //     take: limit,
  //     orderBy: { createdAt: 'desc' },
  //     select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
  //   }),
  //   prisma.item.count(),
  // ])

  // Mock implementation
  const items = Array.from({ length: limit }, (_, i) => ({
    id: `item-${skip + i + 1}`,
    title: `Sample Item ${skip + i + 1}`,
    description: `This is sample item ${skip + i + 1}`,
    createdAt: new Date().toISOString(),
    // Additional fields would be included based on the fields parameter
  }))

  const total = 100 // Mock total count

  return {
    items,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      current: page,
      limit,
    },
  }
}

