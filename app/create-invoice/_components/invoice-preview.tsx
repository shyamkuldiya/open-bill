'use client'

import { Separator } from '@/components/ui/separator'
import React, { forwardRef } from 'react'
import useInvoiceStore from '@/store/invoice-store'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

export const InvoicePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    companyDetails,
    invoiceDetails,
    clientDetails,
    invoiceItems,
    additionalDetails,
  } = useInvoiceStore()

  const subtotal = invoiceItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )
  const total = subtotal

  return (
    <div
      ref={ref}
      id="invoice-preview-element"
      className="flex flex-col p-12 mx-auto bg-white text-zinc-900 shadow-2xl min-w-[794px] min-h-[1123px] font-sans relative overflow-hidden print:shadow-none print:p-8"
      style={{ colorScheme: 'light' }}
    >
      {/* Top Accent Bar */}

      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div className="space-y-6">
          {companyDetails.logo ? (
            <Image
              height={60}
              width={120}
              src={companyDetails.logo}
              alt="Logo"
              className="h-12 object-contain object-left"
            />
          ) : (
            <div className="h-12 w-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                Logo
              </span>
            </div>
          )}
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 uppercase">
              {companyDetails.name || 'Your Company Name'}
            </h1>
            <p className="text-xs text-zinc-500 whitespace-pre-line leading-relaxed max-w-xs">
              {companyDetails.address || 'Company Address details go here'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-5xl font-black text-zinc-100 absolute top-8 right-12 select-none pointer-events-none uppercase">
            Invoice
          </h2>
          <div className="relative z-10 space-y-4 pt-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Invoice Number
              </p>
              <p className="text-xl font-black text-zinc-900">
                {invoiceDetails.prefix}
                {invoiceDetails.invoiceNumber}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-right justify-end">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Date
                </p>
                <p className="text-xs font-bold text-zinc-900">
                  {new Date(invoiceDetails.date).toLocaleDateString()}
                </p>
              </div>
              {invoiceDetails.dueDate && (
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Due Date
                  </p>
                  <p className="text-xs font-bold text-zinc-900">
                    {invoiceDetails.dueDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Bill To
          </p>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
              {clientDetails.name || 'Client Name'}
            </h3>
            <p className="text-xs text-zinc-500 whitespace-pre-line leading-relaxed">
              {clientDetails.address ||
                'Client Address and contact information'}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="grow mb-12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-zinc-900">
              <th className="py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Description
              </th>
              <th className="py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center w-20">
                Qty
              </th>
              <th className="py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right w-32">
                Rate
              </th>
              <th className="py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right w-32">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-sm text-zinc-400 italic border-b border-zinc-100"
                >
                  No items listed on this invoice
                </td>
              </tr>
            ) : (
              invoiceItems.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100 group">
                  <td className="py-5 pr-4 align-top">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-zinc-900">
                        {item.name || 'Untitled Item'}
                      </p>
                      {item.description && (
                        <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-5 text-center align-top text-sm font-medium text-zinc-600">
                    {item.quantity}
                  </td>
                  <td className="py-5 text-right align-top text-sm font-medium text-zinc-600">
                    {formatCurrency(invoiceDetails.currency, item.price)}
                  </td>
                  <td className="py-5 text-right align-top text-sm font-bold text-zinc-900">
                    {formatCurrency(
                      invoiceDetails.currency,
                      item.price * item.quantity
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-12 gap-12 mt-auto">
        <div className="col-span-7 space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Amount in Words
            </p>
            <p className="text-xs font-bold text-zinc-900 uppercase">
              {total > 0
                ? `${total.toLocaleString()} ${invoiceDetails.currency} Only`
                : 'Zero'}
            </p>
          </div>

          <div className="space-y-6">
            {additionalDetails?.note && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Notes
                </p>
                <p className="text-[11px] text-zinc-500 leading-relaxed italic border-l-2 border-zinc-100 pl-4">
                  {additionalDetails.note}
                </p>
              </div>
            )}
            {additionalDetails?.termsAndConditions && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Terms & Conditions
                </p>
                <p className="text-[11px] text-zinc-500 leading-relaxed whitespace-pre-line">
                  {additionalDetails.termsAndConditions}
                </p>
              </div>
            )}
            {additionalDetails?.paymentDetails && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Payment Information
                </p>
                <p className="text-[11px] text-zinc-600 font-mono bg-zinc-50 p-3 rounded-md border border-zinc-100 leading-relaxed">
                  {additionalDetails.paymentDetails}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-5">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400 font-medium">Subtotal</span>
              <span className="text-zinc-900 font-bold">
                {formatCurrency(invoiceDetails.currency, subtotal)}
              </span>
            </div>
            <Separator className="bg-zinc-100" />
            <div className="flex justify-between items-center py-2">
              <span className="text-base font-black uppercase tracking-tight text-zinc-900">
                Total Due
              </span>
              <div className="text-right">
                <span className="text-3xl font-black text-zinc-900 block tracking-tighter">
                  {formatCurrency(invoiceDetails.currency, total)}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Currency: {invoiceDetails.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Signature */}
          {companyDetails.signature && (
            <div className="mt-12 pt-12 text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <Image
                  height={60}
                  width={150}
                  src={companyDetails.signature}
                  alt="Signature"
                  className="h-12 w-auto mx-auto grayscale contrast-125"
                />
                <div className="w-48 border-b border-zinc-300 mt-2" />
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Authorized Signature
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Accent */}
      <div className="mt-20 text-center opacity-20 pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">
          Generated via Open Bill
        </p>
      </div>
    </div>
  )
})
