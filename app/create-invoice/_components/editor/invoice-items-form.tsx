'use client'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useInvoiceStore from '@/store/invoice-store'
import { Plus, Trash } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function InvoiceItemsForm() {
  const { invoiceItems, updateItems, removeItem, addItem } = useInvoiceStore()
  return (
    <AccordionItem value="items">
      <AccordionTrigger className="hover:no-underline font-semibold py-4">
        Invoice Items
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {invoiceItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-start border p-3 rounded-lg bg-muted/30"
          >
            <div className="col-span-6 space-y-1">
              <Input
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => updateItems(item.id, 'name', e.target.value)}
                className="font-medium"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Qty"
                value={item.quantity || ''}
                onChange={(e) =>
                  updateItems(item.id, 'quantity', Number(e.target.value))
                }
              />
            </div>
            <div className="col-span-3">
              <Input
                type="number"
                placeholder="Price"
                value={item.price || ''}
                onChange={(e) =>
                  updateItems(item.id, 'price', Number(e.target.value))
                }
              />
            </div>
            <div className="col-span-1 pt-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/80"
                onClick={() => removeItem(item.id)}
              >
                <HugeiconsIcon icon={Trash} />
              </Button>
            </div>
            <Textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateItems(item.id, 'description', e.target.value)
              }
              className="text-xs w-full col-span-12"
            />
          </div>
        ))}
        <Button
          className="w-full border-dashed"
          variant="outline"
          onClick={() => addItem()}
        >
          <HugeiconsIcon icon={Plus} />
          Add Item
        </Button>
      </AccordionContent>
    </AccordionItem>
  )
}
