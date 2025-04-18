"use client"

import type React from "react"
import type { InvoiceData } from "@/types/invoice"
import Input from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

interface InvoiceFormProps {
  data: InvoiceData
  setData: React.Dispatch<React.SetStateAction<InvoiceData>>
  onDateChange: (value: string, field: "date" | "dueDate") => void
}

export function InvoiceForm({ data, setData, onDateChange }: InvoiceFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<InvoiceData, "client" | "items" | "payment">,
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InvoiceData["client"]) => {
    setData((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: e.target.value,
      },
    }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InvoiceData["payment"]) => {
    setData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: e.target.value,
      },
    }))
  }

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof InvoiceData["items"][0],
  ) => {
    const newItems = [...data.items]
    newItems[index] = {
      ...newItems[index],
      [field]: e.target.value,
    }
    setData((prev) => ({
      ...prev,
      items: newItems,
    }))
  }

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { item: "", price: "$0" }],
    }))
  }

  const removeItem = (index: number) => {
    const newItems = [...data.items]
    newItems.splice(index, 1)
    setData((prev) => ({
      ...prev,
      items: newItems,
    }))
  }

  return (
    <Tabs defaultValue="business" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>

      <TabsContent value="business" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Invoice Number</Label>
                <Input
                  id="number"
                  type="number"
                  value={data.number.toString()}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      number: Number.parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Issue Date</Label>
                <Input id="date" type="date" onChange={(e) => onDateChange(e.target.value, "date")} value={data.date} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={data.logo}
                  onChange={(e) => handleChange(e, "logo")}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={data.website}
                  onChange={(e) => handleChange(e, "website")}
                  placeholder="www.yourbusiness.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => handleChange(e, "phone")}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={data.address}
                  onChange={(e) => handleChange(e, "address")}
                  placeholder="123 Business St, City, State ZIP"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="client" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={data.client.name}
                  onChange={(e) => handleClientChange(e, "name")}
                  placeholder="Client Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  value={data.client.phone}
                  onChange={(e) => handleClientChange(e, "phone")}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  value={data.client.email}
                  onChange={(e) => handleClientChange(e, "email")}
                  placeholder="client@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Input
                  id="clientAddress"
                  value={data.client.address}
                  onChange={(e) => handleClientChange(e, "address")}
                  placeholder="123 Client St, City, State ZIP"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="items" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr,auto,auto] gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}`}>Item Description</Label>
                    <Input
                      id={`item-${index}`}
                      value={item.item}
                      onChange={(e) => handleItemChange(e, index, "item")}
                      placeholder="Service or product description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      value={item.price}
                      onChange={(e) => handleItemChange(e, index, "price")}
                      placeholder="$0.00"
                    />
                  </div>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={data.items.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={addItem} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>

              <Separator />

              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span>{data.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Name</Label>
                <Input
                  id="bank"
                  value={data.payment.bank}
                  onChange={(e) => handlePaymentChange(e, "bank")}
                  placeholder="Bank Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  value={data.payment.accountName}
                  onChange={(e) => handlePaymentChange(e, "accountName")}
                  placeholder="Account Holder Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={data.payment.accountNumber}
                  onChange={(e) => handlePaymentChange(e, "accountNumber")}
                  placeholder="Account Number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={data.payment.routingNumber}
                  onChange={(e) => handlePaymentChange(e, "routingNumber")}
                  placeholder="Routing Number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" onChange={(e) => onDateChange(e.target.value, "dueDate")} value={data.dueDate} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
