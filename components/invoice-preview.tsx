'use client'

import { useInvoiceStore } from '@/store/use-invoice-store'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function InvoicePreview() {
  const store = useInvoiceStore()

  const subtotal = store.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  )
  const total = subtotal // For now, ignoring tax/discount/shipping in preview calculation logic but store has them

  return (
    <div className="flex flex-col gap-8 p-12 bg-white text-zinc-950 min-h-[1123px] w-[794px] mx-auto shadow-2xl overflow-hidden print:shadow-none font-sans">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-4 max-w-[50%]">
          {store.billedBy.logo ? (
            <img
              src={store.billedBy.logo}
              alt="Logo"
              className="h-12 object-contain"
            />
          ) : (
            <div className="h-12 w-32 bg-zinc-100 rounded flex items-center justify-center text-zinc-400 text-xs font-bold uppercase tracking-wider">
              Logo
            </div>
          )}
          <div className="space-y-1">
            <h2 className="text-lg font-bold uppercase tracking-tight">
              {store.billedBy.name || 'Your Company'}
            </h2>
            <p className="text-xs text-zinc-500 whitespace-pre-line leading-relaxed">
              {store.billedBy.address || 'Address'}
            </p>
          </div>
        </div>
        <div className="text-right space-y-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-indigo-600">
              Invoice
            </h1>
            <p className="text-sm font-mono text-zinc-500 font-bold tracking-widest uppercase">
              #INV-{store.invoiceNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div className="text-zinc-400 uppercase font-black">Date</div>
            <div className="font-bold">{store.invoiceDate}</div>
            <div className="text-zinc-400 uppercase font-black">Due Date</div>
            <div className="font-bold">{store.dueDate}</div>
          </div>
        </div>
      </div>

      <Separator className="bg-zinc-100" />

      {/* Bill To */}
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Bill To
          </p>
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase">
              {store.billedTo.name || 'Client Name'}
            </h3>
            <p className="text-xs text-zinc-500 whitespace-pre-line leading-relaxed">
              {store.billedTo.address || 'Client Address'}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="grow">
        <div className="rounded-xl border border-zinc-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow className="border-zinc-100">
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400 py-4 h-auto">
                  Description
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400 py-4 h-auto text-center w-20">
                  Qty
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400 py-4 h-auto text-right w-32">
                  Rate
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400 py-4 h-auto text-right w-32">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-zinc-400 text-sm italic"
                  >
                    No items added yet
                  </TableCell>
                </TableRow>
              ) : (
                store.items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-zinc-50 hover:bg-transparent"
                  >
                    <TableCell className="py-5 align-top">
                      <div className="space-y-1">
                        <p className="font-bold text-sm tracking-tight">
                          {item.name || 'Untitled Item'}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center font-bold text-xs">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="py-5 text-right font-bold text-xs">
                      {store.currency} {item.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-5 text-right font-bold text-xs">
                      {store.currency}{' '}
                      {(item.quantity * item.unitPrice).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Totals & Notes */}
      <div className="grid grid-cols-12 gap-12 mt-auto pt-8">
        <div className="col-span-7 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Amount in Words
            </p>
            <p className="text-xs font-bold text-zinc-700 capitalize">
              {total > 0
                ? `${total.toLocaleString()} ${store.currency} Only`
                : 'Zero'}
            </p>
          </div>
          {store.notes && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Notes
              </p>
              <p className="text-[11px] text-zinc-600 leading-relaxed italic">
                {store.notes}
              </p>
            </div>
          )}
          {store.terms && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Terms & Conditions
              </p>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                {store.terms}
              </p>
            </div>
          )}
          {store.paymentInfo && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Payment Information
              </p>
              <p className="text-[11px] text-zinc-600 leading-relaxed font-mono">
                {store.paymentInfo}
              </p>
            </div>
          )}
        </div>
        <div className="col-span-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 uppercase font-black">
                Subtotal
              </span>
              <span className="font-bold">
                {store.currency} {subtotal.toLocaleString()}
              </span>
            </div>
            {store.billingDetails.map((detail, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-zinc-400 uppercase font-black">
                  {detail.label}
                </span>
                <span className="font-bold">
                  {detail.type === 'percentage'
                    ? `${detail.value}%`
                    : `${store.currency} ${detail.value}`}
                </span>
              </div>
            ))}
          </div>
          <Separator className="bg-zinc-100" />
          <div className="flex justify-between items-center py-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
              Total
            </span>
            <span className="text-2xl font-black text-indigo-600 tracking-tighter">
              {store.currency} {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-12 flex justify-end">
        <div className="space-y-4 text-center min-w-[150px]">
          {store.billedBy.signature ? (
            <img
              src={store.billedBy.signature}
              alt="Signature"
              className="h-12 mx-auto"
            />
          ) : (
            <div className="h-12 border-b border-zinc-200" />
          )}
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Authorized Signature
          </p>
        </div>
      </div>
    </div>
  )
}
