"use client"

import { Fira_Code, Puppies_Play, Love_Ya_Like_A_Sister } from "next/font/google"
import { useState, useRef, useEffect } from "react"
import { InvoicePreview } from "@/components/InvoicePreview"
import { InvoiceForm } from "@/components/InvoiceForm"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { formatDateStringMDY } from "@/lib/utils"
import type { InvoiceData } from "@/types/invoice"

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const puppiesPlay = Puppies_Play({
  weight: "400",
  subsets: ["latin"],
})

const loveYaLikeASister = Love_Ya_Like_A_Sister({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    number: 123,
    date: "September 1, 2021",
    logo: "https://avatars.githubusercontent.com/u/76930306?v=4",
    website: "www.content.com",
    phone: "(123) 456-7890",
    address: "500 Main Street, Brooklyn, NY 11211",
    client: {
      name: "Mr. Client",
      phone: "(123) 456-7890",
      email: "email@example.com",
      address: "100 Fifth Avenue, New York, NY 10023",
    },
    items: [
      { item: "1 IGTV Video", price: "$1,000" },
      { item: "3 Instagram Stories", price: "$650" },
      { item: "1 Newsletter Shout Out", price: "$350" },
    ],
    total: "$2,000",
    payment: {
      bank: "Best Bank",
      accountName: "Content Creator Inc.",
      accountNumber: "123456789",
      routingNumber: "987654321",
    },
    dueDate: "OCTOBER 1, 2021",
  })

  const handleDateChange = (value: string, field: "date" | "dueDate") => {
    const formattedDate = formatDateStringMDY(value)
    setInvoiceData((prev) => ({
      ...prev,
      [field]: formattedDate,
    }))
  }

  const downloadInvoice = () => {
    const invoice = invoiceRef.current
    if (!invoice) return

    // Using the div2png function from the original code
    // This would be imported from your lib
    if (typeof window !== "undefined" && window.div2png) {
      window.div2png(invoice, invoiceData.number)
    } else {
      console.error("div2png function not available")
    }
  }

  useEffect(() => {
    // Calculate total from items
    const total = invoiceData.items.reduce((acc, item) => {
      const price = item.price.replace(/[^0-9.]/g, "")
      return acc + +price
    }, 0)

    setInvoiceData((prev) => ({
      ...prev,
      total: `$${total}`,
    }))
  }, [invoiceData.items])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Professional Invoice Generator</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1 bg-white rounded-lg shadow-lg overflow-hidden">
          <InvoicePreview
            ref={invoiceRef}
            data={invoiceData}
            fonts={{
              firaCode,
              puppiesPlay,
              loveYaLikeASister,
            }}
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <Button
                onClick={downloadInvoice}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>

            <InvoiceForm data={invoiceData} setData={setInvoiceData} onDateChange={handleDateChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
