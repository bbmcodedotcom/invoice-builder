import Image from "next/image"
import { forwardRef } from "react"
import type { InvoiceData } from "@/types/invoice"
import { Great_Vibes } from 'next/font/google'
import { Cinzel_Decorative } from 'next/font/google'

export const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
})

export const cinzelDecorative = Cinzel_Decorative({
  weight: '400',
  subsets: ['latin'],
})

interface InvoicePreviewProps {
  data: InvoiceData
  fonts: {
    firaCode: any
    puppiesPlay: any
    loveYaLikeASister: any
  }
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data, fonts }, ref) => {
  const { firaCode, puppiesPlay, loveYaLikeASister } = fonts

  return (
    <div className="grid grid-cols-[7rem,35rem] h-max border w-max mx-auto" style={firaCode.style} ref={ref}>
      <header className="bg-gradient-to-tl from-cyan-200 to-blue-200 grid grid-rows-2 grid-cols-1 place-items-center w-[full]">
        <div className="min-w-max -rotate-90 font-semibold text-base text-righ -mt-28">
          <p>NO. {data.number}</p>
          <p>{data.date}</p>
        </div>
        <div className="min-w-max -rotate-90 font-[400] text-base uppercase mb-20">
          <p>
            {data.website} • {data.phone}
          </p>
          <p>{data.address}</p>
        </div>
      </header>
      <main className="flex flex-col justify-between min-h-[90%] p-8 bg-white">
        {data.logo && (
          <Image
            src={data.logo || "/logo/edcviet.png"}
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

        {/* Billing Section */}
        <section className="my-4 text-xs">
          <h2 className="text-lg font-semibold mb-2">BILLED TO</h2>
          <p className="font-semibold text-3xl uppercase tracking-wider">{data.client.name}</p>
          <p>Phone: {data.client.phone}</p>
          <p>Fb: {data.client.fb}</p>
          <p>Address: {data.client.address}</p>
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
              <p>{item.price}</p>
            </div>
          ))}
          <hr className="bg-gradient-to-tl from-cyan-200 to-blue-200 h-1 rounded mt-2" />
        </section>

        {/* Total Amount Section */}
        <section className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">TOTAL AMOUNT DUE</h2>
          <p>{data.currency} {data.total}</p>
        </section>

        {/* Payment Details Section */}
        <section className="my-6">
          <h2 className="text-lg font-bold">PAYMENT DETAILS</h2>
          {data.payment.accountName && <p>{data.payment.accountName}</p>}
          {data.payment.bank && <p>{data.payment.bank}</p>}
          {data.payment.accountNumber && <p>Account Number: {data.payment.accountNumber}</p>}
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
