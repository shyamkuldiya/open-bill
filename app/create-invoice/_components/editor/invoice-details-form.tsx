'use client'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { currencyLocaleMap } from '@/constants/currency'
import useInvoiceStore from '@/store/invoice-store'

export default function InvoiceDetailsForm() {
  const { invoiceDetails, updateInvoiceDetails } = useInvoiceStore()
  return (
    <AccordionItem value="identifiers">
      <AccordionTrigger className="hover:no-underline font-semibold py-4">
        Invoice Details
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="flex gap-2">
          <div className="space-y-2 pl-1">
            <Label htmlFor="invoice-prefix">Prefix</Label>
            <Input
              className="w-20 bg-muted"
              value={invoiceDetails.prefix}
              onChange={(e) => updateInvoiceDetails('prefix', e.target.value)}
            />
          </div>
          <div className="space-y-2 pl-1">
            <Label htmlFor="invoice-number">Number</Label>
            <Input
              id="invoice-number"
              placeholder="0001"
              value={invoiceDetails.invoiceNumber}
              onChange={(e) =>
                updateInvoiceDetails('invoiceNumber', e.target.value)
              }
            />
          </div>
          <div className="space-y-2 pl-1 w-full">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={invoiceDetails.currency}
              onValueChange={(value) => updateInvoiceDetails('currency', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {Object.keys(currencyLocaleMap).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={invoiceDetails.date}
            onChange={(e) => updateInvoiceDetails('date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="due-date">Due Date</Label>
          <Input
            id="due-date"
            type="date"
            value={invoiceDetails.dueDate}
            onChange={(e) => updateInvoiceDetails('dueDate', e.target.value)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
