"use client"

import { useState, useRef, useEffect } from "react"
import { InvoicePreview } from "@/components/InvoicePreview"
import { InvoiceForm } from "@/components/InvoiceForm"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { div2png, formatDateStringMDY } from "@/lib/utils"
import type { InvoiceData } from "@/types/invoice"
import { format } from 'date-fns';

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    date: format(new Date, 'yyyy-MM-dd'),
    logo: "",
    website: "https://edcviet.com",
    phone: "034 2320 189",
    address: "Le Thi Rieng St, District 12, HCMC",
    client: {
      name: "Client name",
      phone: "+84 909 909 909",
      facebook: "facebook.com/example",
      address: "123 Main St, HCMC",
    },
    items: [
      { item: "1 x item 1", price: 10000 },
    ],
    discount: 0,
    total: 10000,
    payment: {
      bank: "Example Bank",
      accountName: "Your name",
      accountNumber: "0123456789",
    },
    currency: "VND",
    delivery: {
      companyName: "Giao Hang Tiet Kiem",
      logo: "/logo/ghtk.png",
      trackingNumber: "1234567890",
      cod: 0,
    },
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

    if (typeof window !== "undefined" && div2png) {
      div2png(invoice, invoiceData.number ?? "")
    } else {
      console.error("div2png function not available")
    }
  }

  useEffect(() => {
    // Calculate total from items
    let total = invoiceData.items.reduce((acc, item) => {
      const price = item.price
      return acc + +price
    }, 0)
    if (invoiceData.discount) {
      const discount = invoiceData.discount
      total -= +discount
    }
    if (total < 0) total = 0

    setInvoiceData((prev) => ({
      ...prev,
      total: total,
    }))
  }, [invoiceData.items, invoiceData.currency, invoiceData.discount])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Generator</h1>

      <div className="flex flex-col lg:flex-row flex-wrap gap-2 h-full">
        <div className="order-2 lg:order-1 bg-white rounded-lg overflow-hidden h-full flex-1 min-w-[850px] p-0 m-0">
          <InvoicePreview
            ref={invoiceRef}
            data={invoiceData}
          />
        </div>

        <div className="order-1 lg:order-2 bg-white rounded-lg flex-1">
          <div className="bg-white p-6 rounded-lg shadow-lg h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <Button
                onClick={downloadInvoice}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 cursor-pointer"
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
