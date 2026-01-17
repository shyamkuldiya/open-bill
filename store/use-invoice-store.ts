import { create } from 'zustand'

export interface InvoiceItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export interface CustomField {
  id: string
  label: string
  value: string
}

export interface BillingConfig {
  type: 'fixed' | 'percentage'
  value: number
  label: string
}

export interface InvoiceStore {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  currency: string
  themeColor: string

  billedBy: {
    name: string
    address: string
    logo: string | null
    signature: string | null
    customFields: CustomField[]
  }

  billedTo: {
    name: string
    address: string
    customFields: CustomField[]
  }

  items: InvoiceItem[]

  billingDetails: BillingConfig[]

  notes: string
  terms: string
  paymentInfo: string

  // Actions
  setInvoiceNumber: (val: string) => void
  setInvoiceDate: (val: string) => void
  setDueDate: (val: string) => void
  setCurrency: (val: string) => void
  setThemeColor: (val: string) => void

  updateBilledBy: (updates: Partial<InvoiceStore['billedBy']>) => void
  updateBilledTo: (updates: Partial<InvoiceStore['billedTo']>) => void

  addItem: (item: InvoiceItem) => void
  updateItem: (id: string, updates: Partial<InvoiceItem>) => void
  removeItem: (id: string) => void

  addBillingDetail: (config: BillingConfig) => void
  updateBillingDetail: (index: number, config: BillingConfig) => void
  removeBillingDetail: (index: number) => void

  setNotes: (val: string) => void
  setTerms: (val: string) => void
  setPaymentInfo: (val: string) => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoiceNumber: '0001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  currency: 'USD',
  themeColor: '#6366F1',

  billedBy: {
    name: '',
    address: '',
    logo: null,
    signature: null,
    customFields: [],
  },

  billedTo: {
    name: '',
    address: '',
    customFields: [],
  },

  items: [],

  billingDetails: [],

  notes: '',
  terms: '',
  paymentInfo: '',

  setInvoiceNumber: (invoiceNumber) => set({ invoiceNumber }),
  setInvoiceDate: (invoiceDate) => set({ invoiceDate }),
  setDueDate: (dueDate) => set({ dueDate }),
  setCurrency: (currency) => set({ currency }),
  setThemeColor: (themeColor) => set({ themeColor }),

  updateBilledBy: (updates) =>
    set((state) => ({ billedBy: { ...state.billedBy, ...updates } })),
  updateBilledTo: (updates) =>
    set((state) => ({ billedTo: { ...state.billedTo, ...updates } })),

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  addBillingDetail: (config) =>
    set((state) => ({ billingDetails: [...state.billingDetails, config] })),
  updateBillingDetail: (index, config) =>
    set((state) => ({
      billingDetails: state.billingDetails.map((c, i) =>
        i === index ? config : c
      ),
    })),
  removeBillingDetail: (index) =>
    set((state) => ({
      billingDetails: state.billingDetails.filter((_, i) => i !== index),
    })),

  setNotes: (notes) => set({ notes }),
  setTerms: (terms) => set({ terms }),
  setPaymentInfo: (paymentInfo) => set({ paymentInfo }),
}))
