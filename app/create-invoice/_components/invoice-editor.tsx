import { Accordion } from '@/components/ui/accordion'

import CompanyDetailsForm from './editor/company-details-form'
import ClientDetailsForm from './editor/client-details-form'
import InvoiceDetailsForm from './editor/invoice-details-form'
import InvoiceItemsForm from './editor/invoice-items-form'
import AdditionalInfoForm from './editor/additional-info-form'

export function InvoiceEditor() {
  return (
    <div className="flex flex-col h-full overflow-y-auto scroll-bar-hidden">
      <Accordion
        type="single"
        defaultValue={'company'}
        collapsible
        className="w-full border-none"
      >
        <CompanyDetailsForm />
        <ClientDetailsForm />
        <InvoiceDetailsForm />
        <InvoiceItemsForm />
        <AdditionalInfoForm />
      </Accordion>
    </div>
  )
}
