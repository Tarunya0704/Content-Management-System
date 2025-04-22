import { Suspense } from "react"
import StoryHeader from "@/components/story-header"
import StoryTabs from "@/components/story-tabs"
import StoryGrid from "@/components/story-grid"
import { getStories } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchParams {
  status?: string
  search?: string
  startDate?: string
  endDate?: string
  category?: string
}

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Create a safe filters object
  const filters = {
    status: searchParams.status,
    search: searchParams.search,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    category: searchParams.category
  }
  
  const stories = await getStories(filters)

  return (
    <div className="p-6">
      <StoryHeader />
      <div className="mt-6">
        <StoryTabs activeTab={searchParams.status || "All"} />
      </div>
      <div className="mt-6">
        <Suspense fallback={<StoryGridSkeleton />}>
          <StoryGrid stories={stories} />
        </Suspense>
      </div>
    </div>
  )
}

function StoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <Skeleton className="w-full h-48" />
          <div className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}