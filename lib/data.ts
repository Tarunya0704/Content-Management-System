import type { Story, StoryFilter } from "./types"

// Mock data for stories
const storiesData: Story[] = [
  {
    id: "1",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/placeholder.svg?height=250&width=400",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
    featured: "Om shopping",
    content: "This is the full content of the story about how 7 lines of code turned into a $36 Billion Empire...",
  },
  {
    id: "2",
    title: "Chez pierre restaurant in Monte Carlo by Vuldafieri",
    image: "/placeholder.svg?height=250&width=400",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Pending",
    views: 128,
    content: "This is the full content about Chez pierre restaurant in Monte Carlo by Vuldafieri...",
  },
  {
    id: "3",
    title: "Teknion wins Gold at 2022 International Design Awards",
    image: "/placeholder.svg?height=250&width=400",
    category: "Politics",
    date: "20 Sep 2022",
    status: "Draft",
    views: 128,
    content: "This is the full content about Teknion winning Gold at 2022 International Design Awards...",
  },
  {
    id: "4",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/placeholder.svg?height=250&width=400",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
    content: "Another story about coding success and business growth...",
  },
  {
    id: "5",
    title: "The Future of AI in Business Applications",
    image: "/placeholder.svg?height=250&width=400",
    category: "Technology",
    date: "22 Sep 2022",
    status: "Published",
    views: 156,
    content: "Exploring how artificial intelligence is transforming business operations...",
  },
  {
    id: "6",
    title: "Sustainable Design Practices in Modern Architecture",
    image: "/placeholder.svg?height=250&width=400",
    category: "Design",
    date: "18 Sep 2022",
    status: "Published",
    views: 92,
    content: "How architects are incorporating sustainable practices in modern building designs...",
  },
  {
    id: "7",
    title: "Global Economic Trends for 2023",
    image: "/placeholder.svg?height=250&width=400",
    category: "Politics",
    date: "25 Sep 2022",
    status: "Archived",
    views: 210,
    content: "Analysis of economic trends and predictions for the coming year...",
  },
  {
    id: "8",
    title: "The Rise of Remote Work Culture",
    image: "/placeholder.svg?height=250&width=400",
    category: "BUSINESS",
    date: "15 Sep 2022",
    status: "Draft",
    views: 78,
    content: "How remote work is changing corporate culture and productivity...",
  },
]

// Function to get stories with filtering
export async function getStories(filters: StoryFilter = {}): Promise<Story[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredStories = [...storiesData]

  // Apply status filter
  if (filters.status && filters.status !== "All") {
    filteredStories = filteredStories.filter((story) => 
      story.status.toLowerCase() === filters.status?.toLowerCase()
    )
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredStories = filteredStories.filter(
      (story) => 
        story.title.toLowerCase().includes(searchLower) || 
        (story.category && story.category.toLowerCase().includes(searchLower)),
    )
  }

  // Apply date filter
  if (filters.startDate) {
    const startDate = new Date(filters.startDate)
    filteredStories = filteredStories.filter((story) => {
      const storyDate = new Date(story.date)
      return storyDate >= startDate
    })
  }

  // Apply category filter
  if (filters.category) {
    filteredStories = filteredStories.filter(
      (story) => story.category && 
        story.category.toLowerCase() === filters.category?.toLowerCase(),
    )
  }

  return filteredStories
}

// Function to get a single story by ID
export async function getStory(id: string): Promise<Story | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const story = storiesData.find((story) => story.id === id)
  return story || null
}