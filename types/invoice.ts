export interface InvoiceData {
  number: string
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
    price: string
  }>
  total: string
  payment: {
    bank: string
    accountName: string
    accountNumber: string
    routingNumber?: string
  }
  dueDate?: string
  currency?: string
}
