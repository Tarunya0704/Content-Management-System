import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the stories page
  redirect("/stories")
}
