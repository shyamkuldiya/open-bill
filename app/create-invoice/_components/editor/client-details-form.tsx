import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useInvoiceStore from '@/store/invoice-store'

type Props = {}

export default function ClientDetailsForm({}: Props) {
  const { clientDetails, updateClientDetails } = useInvoiceStore()
  return (
    <div className="space-y-4">
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
    </div>
  )
}
