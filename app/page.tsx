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
    phone: "+84 342 320 189",
    address: "Le Thi Rieng St, District 12, HCMC",
    client: {
      name: "Client name",
      phone: "+84 909 909 909",
      facebook: "https://www.facebook.com/edcviet",
      address: "123 Main St, HCMC",
    },
    items: [
      { item: "1 x item 1", price: "10000" },
    ],
    total: "10000",
    payment: {
      bank: "Vietcombank",
      accountName: "Lang Dinh Thanh Dung",
      accountNumber: "0911000009327",
    },
    currency: "VND",
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
    const total = invoiceData.items.reduce((acc, item) => {
      const price = item.price.replace(/[^0-9.]/g, "")
      return acc + +price
    }, 0)

    setInvoiceData((prev) => ({
      ...prev,
      total: `${total}`,
    }))
  }, [invoiceData.items, invoiceData.currency])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Generator</h1>

      <div className="flex flex-col lg:flex-row flex-wrap gap-2 h-full">
        <div className="order-2 lg:order-1 bg-white rounded-lg overflow-hidden h-full flex-1 min-w-[700px] p-0 m-0">
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
