import type { Story , StoryFilter } from "./types"

const storiesData: Story[] = [
  {
    id: "1",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/Rectangle 1.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
    featured: "Om shopping",
  },
  {
    id: "2",
    title: "Chez pierre restaurant in Monte Carlo by Vuldafieri",
    image: "/Rectangle 2.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Pending",
    views: 128,
  },
  {
    id: "3",
    title: "Teknion wins Gold at 2022 International Design Awards",
    image: "/Rectangle 3.png",
    category: "Politics",
    date: "20 Sep 2022",
    status: "Draft",
    views: 128,
  },
  {
    id: "4",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/Rectangle 4.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
  {
    id: "5",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/Rectangle 5.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
  {
    id: "6",
    title: "Chez pierre restaurant in Monte Carlo by Vuldafieri",
    image: "/Rectangle 8.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
  {
    id: "7",
    title: "Teknion wins Gold at 2022 International Design Awards",
    image: "/Rectangle 7.png",
    category: "Politics",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
  {
    id: "8",
    title: "How 7 lines code turned into $36 Billion Empire",
    image: "/Rectangle 6.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
]

export async function getStories(filters: StoryFilter = {}): Promise<Story[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  let filteredStories = [...storiesData]

  // Apply status filter
  if (filters.status && filters.status !== "All") {
    filteredStories = filteredStories.filter(
      story => story.status.toLowerCase() === filters.status?.toLowerCase()
    )
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredStories = filteredStories.filter(
      story => story.title.toLowerCase().includes(searchLower) || 
              story.category.toLowerCase().includes(searchLower)
    )
  }

  // Apply category filter
  if (filters.category) {
    filteredStories = filteredStories.filter(
      story => story.category.toLowerCase() === filters.category?.toLowerCase()
    )
  }

  // Apply date filters
  if (filters.startDate) {
    const startDate = new Date(filters.startDate)
    filteredStories = filteredStories.filter(
      story => new Date(story.date) >= startDate
    )
  }

  if (filters.endDate) {
    const endDate = new Date(filters.endDate)
    filteredStories = filteredStories.filter(
      story => new Date(story.date) <= endDate
    )
  }

  return filteredStories
}

export async function getStory(id: string): Promise<Story | undefined> {
  return storiesData.find(story => story.id === id)
}