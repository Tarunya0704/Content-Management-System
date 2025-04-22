import StoryHeader from "@/components/story-header"
import StoryTabs from "@/components/story-tabs"
import StoryGrid from "@/components/story-grid"
import { stories } from "@/lib/data"

export default function StoriesPage() {
  return (
    <div className="p-6">
      <StoryHeader />
      <div className="mt-6">
        <StoryTabs />
      </div>
      <div className="mt-6">
        <StoryGrid stories={stories} />
      </div>
    </div>
  )
}
