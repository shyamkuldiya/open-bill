import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import {
  TClient,
  TCompany,
  TInvoice,
  TInvoiceAdditionalDetails,
  TInvoiceItem,
} from '@/types'

interface TInvoiceStore {
  companyDetails: TCompany
  clientDetails: TClient
  invoiceDetails: TInvoice
  invoiceItems: TInvoiceItem[] | []
  additionalDetails: TInvoiceAdditionalDetails

  updateCompanyDetails: <K extends keyof TCompany>(
    key: K,
    value: TCompany[K]
  ) => void

  updateClientDetails: <K extends keyof TClient>(
    key: K,
    value: TClient[K]
  ) => void

  updateInvoiceDetails: <K extends keyof TInvoice>(
    key: K,
    value: TInvoice[K]
  ) => void

  updateAdditionalDetails: <K extends keyof TInvoiceAdditionalDetails>(
    key: K,
    value: TInvoiceAdditionalDetails[K]
  ) => void
  updateItems: <K extends keyof TInvoiceItem>(
    id: string,
    key: K,
    value: TInvoiceItem[K]
  ) => void
  removeItem: (id: string) => void
  addItem: () => void
}

const useInvoiceStore = create<TInvoiceStore>((set) => ({
  companyDetails: {
    name: '',
    address: '',
    logo: '',
    signature: '',
  },

  clientDetails: {
    name: '',
    address: '',
  },

  invoiceDetails: {
    prefix: 'INV-',
    invoiceNumber: '0001',
    date: new Date().toISOString(),
    dueDate: '',
    currency: 'USD',
  },

  invoiceItems: [
    {
      id: uuid(),
      name: '',
      description: '',
      quantity: 1,
      price: 0,
    },
  ],

  additionalDetails: {
    termsAndConditions: '',
    paymentDetails: '',
    note: '',
  },

  updateCompanyDetails: (key, value) =>
    set((state) => ({
      companyDetails: {
        ...state.companyDetails,
        [key]: value,
      },
    })),

  updateClientDetails: (key, value) =>
    set((state) => ({
      clientDetails: {
        ...state.clientDetails,
        [key]: value,
      },
    })),

  updateInvoiceDetails: (key, value) =>
    set((state) => ({
      invoiceDetails: {
        ...state.invoiceDetails,
        [key]: value,
      },
    })),

  updateAdditionalDetails: (key, value) =>
    set((state) => ({
      additionalDetails: {
        ...state.additionalDetails,
        [key]: value,
      },
    })),

  updateItems: (id, key, value) =>
    set((state) => {
      const array = [...state.invoiceItems]
      let item = array.find((item) => item.id === id)
      if (item) {
        item[key] = value
      }
      return {
        invoiceItems: array,
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const array = [...state.invoiceItems]
      let updatedArray = array.filter((item) => item.id !== id)
      return {
        invoiceItems: updatedArray,
      }
    }),
  addItem: () =>
    set((state) => ({
      invoiceItems: [
        ...state.invoiceItems,
        {
          id: uuid(),
          name: '',
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
    })),
}))

export default useInvoiceStore
