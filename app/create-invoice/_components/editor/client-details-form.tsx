'use client'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useInvoiceStore from '@/store/invoice-store'

export default function ClientDetailsForm() {
  const { clientDetails, updateClientDetails } = useInvoiceStore()
  return (
    <AccordionItem value="cllient">
      <AccordionTrigger className="hover:no-underline font-semibold py-4">
        Billed To (Client)
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="billedBy-name">Client Name</Label>
          <Input
            id="billedBy-name"
            placeholder="Client Name"
            value={clientDetails.name}
            onChange={(e) => updateClientDetails('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="billedBy-address">Address</Label>
          <Textarea
            id="billedBy-address"
            placeholder="Address, Phone, Email"
            className="min-h-[100px]"
            value={clientDetails.address}
            onChange={(e) => updateClientDetails('address', e.target.value)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

// ;<AccordionItem value="client">
//   <AccordionTrigger className="hover:no-underline font-semibold py-4">
//     Billed To (Client)
//   </AccordionTrigger>
//   <AccordionContent>
//     <ClientDetailsForm />
//   </AccordionContent>
// </AccordionItem>
