"use client"

import type React from "react"
import type { InvoiceData } from "@/types/invoice"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"
import { formatCurrency, generateInvoiceCode } from "@/lib/utils"
import { DatePicker } from "@/components/ui/datepicker"
import { useEffect } from "react"

interface InvoiceFormProps {
  data: InvoiceData
  setData: React.Dispatch<React.SetStateAction<InvoiceData>>
  onDateChange: (value: string, field: "date" | "dueDate") => void
}

export function InvoiceForm({ data, setData, onDateChange }: InvoiceFormProps) {
  const currencies = [
    { code: "VND", label: "VND - Vietnamese Dong" },
    { code: "USD", label: "USD - United States Dollar" },
    { code: "EUR", label: "EUR - Euro" },
    { code: "JPY", label: "JPY - Japanese Yen" },
    { code: "GBP", label: "GBP - British Pound" },
    { code: "AUD", label: "AUD - Australian Dollar" },
    { code: "CAD", label: "CAD - Canadian Dollar" },
    { code: "CHF", label: "CHF - Swiss Franc" },
    { code: "CNY", label: "CNY - Chinese Yuan" },
    { code: "HKD", label: "HKD - Hong Kong Dollar" },
  ];

  const deliveryCompanies = [
    { id: "", name: "", logo: "" },
    { id: "ghtk", name: "Giao Hang Tiet Kiem", logo: "/logo/ghtk.png" },
    { id: "viettelpost", name: "Viettel post", logo: "/logo/viettelpost.png" },
    { id: "other", name: "Other", logo: "" },
  ];

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({
      ...prev,
      currency: e.target.value,
    }))
  }
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

  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof InvoiceData["payment"]
  ) => {
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
      items: [...prev.items, { item: "", price: 0, currency: data.currency }],
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

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InvoiceData["delivery"]) => {
    setData((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [field]: e.target.value,
      },
    }))
  }

  const handleDeliveryCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = deliveryCompanies.find((company) => company.id === e.target.value);
    if (selectedCompany) {
      setData((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          companyName: selectedCompany.name,
          logo: selectedCompany.logo,
        },
      }));
    }
  };

  useEffect(() => {
    if (!data.number) {
      setData((prev) => ({
        ...prev,
        number: generateInvoiceCode(),
      }))
    }
  }, [data, setData]);

  return (
    <Tabs defaultValue="business" className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="delivery">Delivery</TabsTrigger>
      </TabsList>

      <TabsContent value="business" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Invoice Number</Label>
                <Input
                  id="number"
                  type="text"
                  value={data.number ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "number")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Issue Date</Label>
                <div className="flex items-center gap-2">
                  <DatePicker date={data.date ? new Date(data.date) : undefined} setDate={(d) => onDateChange(d?.toISOString() ?? "", "date")} />
                </div>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "logo")}
                  placeholder="https://yourwebsite.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={data.website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "website")}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "phone")}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={data.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "address")}
                  placeholder="111 your address, City, State ZIP"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClientChange(e, "name")}
                  placeholder="Client Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  value={data.client.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClientChange(e, "phone")}
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Input
                  id="clientAddress"
                  value={data.client.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClientChange(e, "address")}
                  placeholder="123 Client St, City, State ZIP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Facebook</Label>
                <Input
                  id="clientEmail"
                  value={data.client.facebook}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClientChange(e, "facebook")}
                  placeholder="https://www.facebook.com/yourbusiness"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="items" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <select
            id="currency"
            className="w-full border border-input rounded-md p-2 text-sm"
            value={data.currency}
            onChange={handleCurrencyChange}
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(e, index, "item")}
                      placeholder="Service or product description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(e, index, "price")}
                      placeholder={`${data.currency} 0`}
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
                <span>Discount:</span>
                <Input
                  id="discount"
                  type="number"
                  min={0}
                  value={data.discount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "discount")}
                  placeholder={`${data.currency} 0`}
                  className="w-1/3"
                />
              </div>

              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(Number(data.total), data.currency ?? "VND")}</span>
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
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select
                  id="paymentMethod"
                  className="w-full border border-input rounded-md p-2 text-sm"
                  value={data.payment.method ?? "banking"}
                  onChange={(e) => handlePaymentChange(e, "method")}
                >
                  <option value="banking">Banking</option>
                  <option value="cod">Cash on Delivery (COD)</option>
                </select>
              </div>

              {(data.payment.method ?? "banking") === "banking" && (
                <>
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
                      value={data.payment.routingNumber ?? ""}
                      onChange={(e) => handlePaymentChange(e, "routingNumber")}
                      placeholder="Routing Number"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="flex items-center gap-2">
                  <DatePicker date={data.dueDate ? new Date(data.dueDate) : undefined} setDate={(d) => onDateChange(d?.toISOString() ?? "", "dueDate")} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="delivery" className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryCompany">Delivery Company</Label>
                <select
                  id="deliveryCompany"
                  className="w-full border border-input rounded-md p-2 text-sm"
                  value={deliveryCompanies.find(c => c.name === data.delivery?.companyName)?.id ?? "other"}
                  onChange={handleDeliveryCompanyChange}
                >
                  {deliveryCompanies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {data.delivery?.companyName && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={data.delivery?.companyName ?? ""}
                      onChange={(e) => handleDeliveryChange(e, "companyName")}
                      placeholder="Delivery Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      id="trackingNumber"
                      value={data.delivery?.trackingNumber ?? ""}
                      onChange={(e) => handleDeliveryChange(e, "trackingNumber")}
                      placeholder="Tracking Number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cod">COD Amount</Label>
                    <Input
                      id="cod"
                      type="number"
                      min={0}
                      value={data.delivery?.cod ?? 0}
                      onChange={(e) => handleDeliveryChange(e, "cod")}
                      placeholder={`${data.currency} 0`}
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
