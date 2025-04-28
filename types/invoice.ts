export interface InvoiceData {
  number?: string
  date: string
  logo: string
  website: string
  phone: string
  address: string
  client: {
    name: string
    phone: string
    address: string
    facebook: string
  }
  items: Array<{
    item: string
    price: number
  }>
  discount: number
  total: number
  payment: {
    method?: "banking" | "cod"
    bank: string
    accountName: string
    accountNumber: string
    routingNumber?: string
  }
  dueDate?: string
  currency?: string,
  delivery: {
    companyName: string
    logo: string,
    trackingNumber: string
    cod: number
  }
}
