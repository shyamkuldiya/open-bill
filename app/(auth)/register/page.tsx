import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-background p-6 ">
      <div className="max-w-md text-center mx-auto">
        <h1 className="text-4xl font-semibold">
          Account Registeration for Open
          <span className="text-primary">Bill</span> Coming Soon
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Account Registration on OpenBill is currently under development. In
          the meantime, you can use the OpenBill app to create invoices.
        </p>
        <div className="flex items-center gap-3 mx-auto w-max">
          <Link
            href={'/create-invoice'}
            className={cn(
              buttonVariants({ variant: 'default', className: 'mt-6' })
            )}
          >
            Create Invoice
          </Link>
        </div>
      </div>
    </div>
  )
}
