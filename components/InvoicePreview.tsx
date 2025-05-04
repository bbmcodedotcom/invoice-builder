import Image from "next/image"
import { forwardRef } from "react"
import type { InvoiceData } from "@/types/invoice"
import { Great_Vibes } from 'next/font/google'
import { Cinzel_Decorative } from 'next/font/google'
import { formatCurrency } from "@/lib/utils"
import { JetBrains_Mono } from "next/font/google"

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
})

const cinzelDecorative = Cinzel_Decorative({
  weight: '400',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
})

interface InvoicePreviewProps {
  data: InvoiceData
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data }, ref) => {

  return (
    <div className={`grid grid-cols-[120px,702px] h-full border w-max mx-auto p-0 m-0 ${jetbrainsMono.className}`} ref={ref}>
      <header className="bg-gradient-to-tl from-cyan-200 to-blue-200 flex flex-col items-center justify-between w-full mx-auto py-20 pr-5">
        <div className="min-w-max -rotate-90 font-semibold text-base text-right">
          <p>NO. {data.number}</p>
          <p>{data.date}</p>
        </div>
        <div className="min-w-max -rotate-90 font-[400] text-base uppercase text-right pl-48">
          <p>
            {data.website} • {data.phone}
          </p>
          <p>{data.address}</p>
        </div>
      </header>

      <main className="flex flex-col justify-between min-h-[90%] p-8 bg-white">
        {data.logo && (
          <Image
            src={data.logo || "/logo/example.png"}
            alt="logo"
            className=""
            width={120}
            height={120}
          />
        )}
        {/* Header Section */}
        <section className="text-center">
          <h1 className={`text-6xl font-bold mt-2 ${cinzelDecorative.className}`}>
            Invoice
          </h1>
        </section>

        <hr className="bg-gradient-to-tl from-cyan-200 to-blue-200 h-2 rounded mt-6 mb-4" />

        {/* Client and Delivery Section */}
        <section className="my-4 text-xs grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">BILLED TO</h2>
            <p className="font-semibold text-2xl uppercase tracking-wider mb-2">{data.client.name}</p>
            <p>Phone: {data.client.phone}</p>
            <p>Address: {data.client.address}</p>
            <p>Facebook: {data.client.facebook}</p>
          </div>
          {data.delivery && data.delivery.companyName && (
            <div>
              <h2 className="text-lg font-semibold mb-2">DELIVERY INFO</h2>
              <div className="flex items-center gap-4 mb-2">
                {data.delivery.logo && (
                  <Image
                    src={data.delivery.logo}
                    alt={`${data.delivery.companyName} logo`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                )}
              </div>
              <p className="font-semibold text-md uppercase tracking-wider">{data.delivery.companyName}</p>
              <p className="mt-1">Tracking Number: {data.delivery.trackingNumber}</p>
              {data.delivery.cod > 0 && (
                <p className="mt-1">
                  COD: {formatCurrency(Number(data.delivery.cod), data.currency ?? "VND")}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Description Section */}
        <section className="pt-6">
          <h3 className="text-lg font-bold flex justify-between">
            <span>DESCRIPTION OF ITEM</span> <span>PRICE</span>
          </h3>
          <hr className="bg-gradient-to-tl from-cyan-200 to-blue-200 h-1 rounded my-2" />
          {data.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p>{item.item}</p>
              <p>{formatCurrency(Number(item.price), data.currency ?? "VND", "decimal")}</p>
            </div>
          ))}
          <hr className="bg-gradient-to-tl from-cyan-200 to-blue-200 h-1 rounded mt-2" />
        </section>

        {/* Discount Section */}
        {data.discount > 0 && (
        <section className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">DISCOUNT</h2>
          <p>- {formatCurrency(Number(data.discount), data.currency ?? "VND")}</p>
        </section>
        )}

        {/* Total Amount Section */}
        <section className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">TOTAL</h2>
          <p>{formatCurrency(Number(data.total), data.currency ?? "VND")}</p>
        </section>

        {/* Payment Details Section */}
        <section className="my-6">
          <h2 className="text-lg font-bold">PAYMENT DETAILS</h2>
          <p>{data.payment.method === "cod" ? "Cash on Delivery (COD)" : "Bank Transfer"}</p>
          {(data.payment.method ?? "banking") === "banking" && (
            <>
              {data.payment.bank && <p>{data.payment.bank}</p>}
              {data.payment.accountName && <p>{data.payment.accountName}</p>}
              {data.payment.accountNumber && <p>Account Number: {data.payment.accountNumber}</p>}
              {data.payment.routingNumber && <p>Routing Number: {data.payment.routingNumber}</p>}
            </>
          )}
        </section>

        {/* Footer Section */}
        <footer className="text-center flex items-center justify-between w-full">
          <p className="font-medium">{data.dueDate ? `*DUE BY ${data.dueDate}` : ""}</p>
          <p className={`text-5xl ${greatVibes.className}`}>
            Thank you!
          </p>
        </footer>
      </main>
    </div>
  )
})

InvoicePreview.displayName = "InvoicePreview"
