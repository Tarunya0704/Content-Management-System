"use client"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string;
  description: string;
  variant?: ToastVariant
}

// Simple toast implementation for the demo
export function toast({ title, description, variant = "default" }: ToastProps) {
  // In a real app, you would use a proper toast library
  // This is just a simple implementation for the demo
  console.log(`[${variant.toUpperCase()}] ${title}: ${description}`)

  // Create a temporary toast element
  const toastElement = document.createElement("div")
  toastElement.className = `fixed bottom-4 right-4 p-4 rounded-md shadow-md z-50 ${
    variant === "destructive" ? "bg-red-600 text-white" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  }`

  const titleElement = document.createElement("h3")
  titleElement.className = "font-medium"
  titleElement.textContent = title

  const descriptionElement = document.createElement("p")
  descriptionElement.className = "text-sm"
  descriptionElement.textContent = description

  toastElement.appendChild(titleElement)
  toastElement.appendChild(descriptionElement)

  document.body.appendChild(toastElement)

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toastElement.classList.add("opacity-0", "transition-opacity", "duration-300")
    setTimeout(() => {
      document.body.removeChild(toastElement)
    }, 300)
  }, 3000)
}
