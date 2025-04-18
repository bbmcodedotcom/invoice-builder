import Image from "next/image"
import { forwardRef } from "react"
import type { InvoiceData } from "@/types/invoice"

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
      <header className="relative bg-gradient-to-tl from-cyan-200 to-blue-200 grid grid-rows-2 grid-cols-1 place-items-center w-[7rem]">
        <div className="min-w-max -rotate-90 font-semibold text-base text-right">
          <p>NO. {data.number}</p>
          <p>Issued on {data.date}</p>
        </div>
        <div className="min-w-max -rotate-90 font-[400] text-base uppercase">
          <p>
            {data.website} • {data.phone}
          </p>
          <p>{data.address}</p>
        </div>
      </header>
      <main className="flex flex-col justify-between min-h-screen p-8 bg-[#fffffe]">
        {/* Header Section */}
        <section className="grid grid-cols-[1fr,auto,1fr] gap-8">
          <div></div>
          <h1 className="text-7xl font-bold mt-8" style={loveYaLikeASister.style}>
            Invoice
          </h1>

          <div className="text-center text-xs bg-gradient-to-tl from-cyan-200 to-blue-200 rounded-full w-24 h-24 flex items-center overflow-hidden">
            {data.logo ? (
              <Image
                src={data.logo || "/placeholder.svg"}
                alt="logo"
                className="w-full h-full object-contain"
                width={96}
                height={96}
              />
            ) : (
              <p>Your logo here!</p>
            )}
          </div>
        </section>

        <hr className="bg-gradient-to-tl from-cyan-200 to-blue-200 h-2 rounded mt-6 mb-4" />

        {/* Billing Section */}
        <section className="my-4 text-xs">
          <h2 className="text-lg font-semibold mb-2">BILLED TO</h2>
          <p className="font-semibold text-3xl uppercase tracking-wider">{data.client.name}</p>
          <p>{data.client.phone}</p>
          <p>{data.client.email}</p>
          <p>{data.client.address}</p>
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
        <section className="flex justify-between -mt-4">
          <h2 className="text-lg font-bold">TOTAL AMOUNT DUE</h2>
          <p>{data.total}</p>
        </section>

        {/* Payment Details Section */}
        <section className="my-6">
          <h2 className="text-lg font-bold">PAYMENT DETAILS</h2>
          {data.payment.accountName && <p>{data.payment.accountName}</p>}
          {data.payment.bank && <p>{data.payment.bank}</p>}
          {data.payment.accountNumber && <p>Account Number: {data.payment.accountNumber}</p>}
          {data.payment.routingNumber && <p>Routing Number: {data.payment.routingNumber}</p>}
        </section>

        {/* Footer Section */}
        <footer className="text-center flex items-center justify-between w-full">
          <p className="font-medium">*DUE BY {data.dueDate}</p>
          <p style={puppiesPlay.style} className="text-7xl">
            Thank you!
          </p>
        </footer>
      </main>
    </div>
  )
})

InvoicePreview.displayName = "InvoicePreview"
