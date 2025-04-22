import { notFound } from "next/navigation"
import { getStory } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import StoryActions from "@/components/story-actions"

interface StoryPageProps {
  params: {
    id: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStory(params.id)

  if (!story) {
    notFound()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/stories" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Story Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/stories/edit/${story.id}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <StoryActions story={story} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Image
            src={story.image || "/placeholder.svg?height=400&width=800"}
            alt={story.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          {story.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-pink-500 text-white">{story.featured}</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant={story.status === "Published" ? "default" : story.status === "Draft" ? "secondary" : "outline"}
              className={
                story.status === "Published"
                  ? "bg-green-100 text-green-800"
                  : story.status === "Draft"
                    ? "bg-gray-100 text-gray-800"
                    : story.status === "Pending"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
              }
            >
              {story.status}
            </Badge>
            <div className="text-sm text-gray-500">
              <span className="uppercase font-semibold">{story.category}</span> • {story.date}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{story.title}</h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>{story.content}</p>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>Views:</span>
              <span className="font-semibold">{story.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
