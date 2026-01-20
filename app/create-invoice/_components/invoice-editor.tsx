'use client'

import { useInvoiceStore } from '@/store/use-invoice-store'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { Plus, Trash2, Image as ImageIcon, PenLine } from 'lucide-react'
import { useState } from 'react'

import CompanyDetailsForm from './editor/company-details-form'
import ClientDetailsForm from './editor/client-details-form'
import InvoiceDetailsForm from './editor/invoice-details-form'
import InvoiceItemsForm from './editor/invoice-items-form'

export function InvoiceEditor() {
  const store = useInvoiceStore()
  const [view, setView] = useState<
    'company' | 'client' | 'identifiers' | 'items' | 'additional'
  >('company')

  return (
    <div className="flex flex-col h-full overflow-y-auto scroll-bar-hidden">
      <Accordion
        type="single"
        defaultValue={view}
        collapsible
        className="w-full  border-none"
      >
        {/* Company Details */}
        <AccordionItem value="company">
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Billed By (Company)
          </AccordionTrigger>
          <AccordionContent>
            <CompanyDetailsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Client Details */}
        <AccordionItem value="client">
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Billed To (Client)
          </AccordionTrigger>
          <AccordionContent>
            <ClientDetailsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Invoice Identifiers */}
        <AccordionItem value="identifiers">
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Invoice Details
          </AccordionTrigger>
          <AccordionContent>
            <InvoiceDetailsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Items */}
        <AccordionItem value="items">
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Invoice Items
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <InvoiceItemsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Additional Info */}
        <AccordionItem value="additional">
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Additional Information
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Notes - any relevant information not covered by the invoice items"
                value={store.notes}
                onChange={(e) => store.setNotes(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea
                id="terms"
                placeholder="Late fees, payment method, delivery terms, etc."
                value={store.terms}
                onChange={(e) => store.setTerms(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-info">Payment Information</Label>
              <Textarea
                id="payment-info"
                placeholder="Bank name, Account number, etc."
                value={store.paymentInfo}
                onChange={(e) => store.setPaymentInfo(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
