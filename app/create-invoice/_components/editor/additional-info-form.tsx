'use client'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useInvoiceStore from '@/store/invoice-store'

export default function AdditionalInfoForm() {
  const { additionalDetails, updateAdditionalDetails } = useInvoiceStore()
  return (
    <AccordionItem value="additional">
      <AccordionTrigger className="hover:no-underline font-semibold py-4">
        Additional Information
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Notes - any relevant information not covered by the invoice items"
            value={additionalDetails.notes}
            onChange={(e) => updateAdditionalDetails('notes', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="terms">Terms & Conditions</Label>
          <Textarea
            id="terms"
            placeholder="Late fees, payment method, delivery terms, etc."
            value={additionalDetails.termsAndConditions}
            onChange={(e) =>
              updateAdditionalDetails('termsAndConditions', e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment-info">Payment Information</Label>
          <Textarea
            id="payment-info"
            placeholder="Bank name, Account number, etc."
            value={additionalDetails.paymentDetails}
            onChange={(e) =>
              updateAdditionalDetails('paymentDetails', e.target.value)
            }
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
