import type { Story } from "./types"

export const stories: Story[] = [
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
    image: "/Rectangle 6.png",
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
    image: "/Rectangle 8.png",
    category: "BUSINESS",
    date: "20 Sep 2022",
    status: "Published",
    views: 128,
  },
]

export async function getStory(id: string): Promise<Story | undefined> {
  return stories.find(story => story.id === id)
}