export type TView = 'both' | 'editor' | 'preview'

export type TCompany = {
  name: string
  address: string
  logo?: string
  signature?: string
}

export type TClient = Pick<TCompany, 'name' | 'address'>

export type TInvoice = {
  invoiceNumber: string
  prefix: string
  currency: string
  date: string
  dueDate?: string
}

export type TInvoiceItem = {
  id: string
  name: string
  description?: string
  price: number
  quantity: number
}

export type TInvoiceAdditionalDetails = {
  paymentDetails: string
  termsAndConditions: string
  note: string
}
