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
import { Card } from '@/components/ui/card'
import { Plus, Trash2, Image as ImageIcon, PenLine } from 'lucide-react'

export function InvoiceEditor() {
  const store = useInvoiceStore()

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto scroll-bar-hidden">
      <Accordion
        type="multiple"
        defaultValue={['company', 'identifiers']}
        className="w-full space-y-4 border-none"
      >
        {/* Company Details */}
        <AccordionItem
          value="company"
          className="border rounded-xl px-4 bg-card shadow-sm"
        >
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Billed By (Company)
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors h-32">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Upload Logo
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Signature</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors h-32">
                  <PenLine className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Upload Signature
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billedBy-name">Company Name</Label>
                <Input
                  id="billedBy-name"
                  placeholder="Your Company Name"
                  value={store.billedBy.name}
                  onChange={(e) =>
                    store.updateBilledBy({ name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billedBy-address">Address</Label>
                <Textarea
                  id="billedBy-address"
                  placeholder="Address, Phone, Email"
                  className="min-h-[100px]"
                  value={store.billedBy.address}
                  onChange={(e) =>
                    store.updateBilledBy({ address: e.target.value })
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Client Details */}
        <AccordionItem
          value="client"
          className="border rounded-xl px-4 bg-card shadow-sm"
        >
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Billed To (Client)
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="billedTo-name">Client Name</Label>
              <Input
                id="billedTo-name"
                placeholder="Client Name"
                value={store.billedTo.name}
                onChange={(e) => store.updateBilledTo({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billedTo-address">Client Address</Label>
              <Textarea
                id="billedTo-address"
                placeholder="Client Address, Email"
                className="min-h-[100px]"
                value={store.billedTo.address}
                onChange={(e) =>
                  store.updateBilledTo({ address: e.target.value })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Invoice Identifiers */}
        <AccordionItem
          value="identifiers"
          className="border rounded-xl px-4 bg-card shadow-sm"
        >
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Invoice Details
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <div className="flex gap-2">
                <Input className="w-20 bg-muted" value="INV-" readOnly />
                <Input
                  id="invoice-number"
                  placeholder="0001"
                  value={store.invoiceNumber}
                  onChange={(e) => store.setInvoiceNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                placeholder="USD"
                value={store.currency}
                onChange={(e) => store.setCurrency(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={store.invoiceDate}
                onChange={(e) => store.setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={store.dueDate}
                onChange={(e) => store.setDueDate(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Items */}
        <AccordionItem
          value="items"
          className="border rounded-xl px-4 bg-card shadow-sm"
        >
          <AccordionTrigger className="hover:no-underline font-semibold py-4">
            Invoice Items
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-6">
            {store.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-3 items-start border p-3 rounded-lg bg-muted/30"
              >
                <div className="col-span-6 space-y-1">
                  <Input
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      store.updateItem(item.id, { name: e.target.value })
                    }
                    className="font-medium"
                  />
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      store.updateItem(item.id, { description: e.target.value })
                    }
                    className="text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      store.updateItem(item.id, {
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Price"
                    value={item.unitPrice}
                    onChange={(e) =>
                      store.updateItem(item.id, {
                        unitPrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-span-1 pt-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => store.removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="w-full border-dashed"
              variant="outline"
              onClick={() =>
                store.addItem({
                  id: Math.random().toString(36).substr(2, 9),
                  name: '',
                  description: '',
                  quantity: 1,
                  unitPrice: 0,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Info */}
        <AccordionItem
          value="additional"
          className="border rounded-xl px-4 bg-card shadow-sm"
        >
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
