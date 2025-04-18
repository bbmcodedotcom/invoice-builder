import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateStringMDY(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return date.toLocaleDateString("en-US", options)
}

// This is a placeholder for the div2png function that would be imported
// from your original code
export function div2png(element: HTMLElement, fileName: string | number) {
  console.log("Converting div to PNG", element, fileName)
  // Implementation would go here
}

export function formatCurrency(value: number, currency: string, style: "currency" | "decimal" | "percent" = "currency") {
  return new Intl.NumberFormat('en-US', {
    style: style as "currency" | "decimal" | "percent",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
