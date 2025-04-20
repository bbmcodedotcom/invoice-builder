import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas"

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

export async function div2png(element: HTMLElement, fileName: string | number) {
  const canvas = await html2canvas(element)
  const dataUrl = canvas.toDataURL("image/png")
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = `${fileName}.png`
  link.click()
}

export function formatCurrency(value: number, currency: string, style: "currency" | "decimal" | "percent" = "currency") {
  return new Intl.NumberFormat('en-US', {
    style: style as "currency" | "decimal" | "percent",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function generateInvoiceCode() {
  const prefix = 'INV';
  const quarter = 'Q' + Math.ceil((new Date().getMonth() + 1) / 3);
  const randomNumber = Math.floor(100 + Math.random() * 900);

  return `${prefix}-${quarter}-${randomNumber}`;
}
