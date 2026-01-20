'use client'
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useInvoiceStore from '@/store/invoice-store'
import {
  Image as ImageIcon,
  Pen01Icon,
  Pencil,
  Trash,
  Trash2,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function CompanyDetailsForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null)

  const { companyDetails, updateCompanyDetails } = useInvoiceStore()

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    key: 'logo' | 'signature'
  ) {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        if (dataUrl) {
          setValue(dataUrl)
          if (key === 'logo') {
            localStorage.setItem('companyLogo', dataUrl)
          }
          if (key === 'signature') {
            localStorage.setItem('companySignature', dataUrl)
          }
        }
      }
      reader.readAsDataURL(file)
    } else {
      console.log('Error accessing file')
    }
  }

  useEffect(() => {
    const logo = localStorage.getItem('companyLogo')
    const signature = localStorage.getItem('companySignature')

    if (logo) {
      setLogoPreview(logo)
    }
    if (signature) {
      setSignaturePreview(signature)
    }
  }, [])

  useEffect(() => {
    if (logoPreview) {
      updateCompanyDetails('logo', logoPreview)
    }
    if (signaturePreview) {
      updateCompanyDetails('signature', signaturePreview)
    }
  }, [logoPreview, signaturePreview])

  return (
    <AccordionItem value="company">
      <AccordionTrigger className="hover:no-underline font-semibold py-4">
        Billed By (Company)
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors h-32 aspect-auto   relative">
              <Input
                type="file"
                accept="image/*"
                className="absolute opacity-0 w-full h-full left-0 top-0 z-10 cursor-pointer"
                onChange={(e) => handleFileChange(e, setLogoPreview, 'logo')}
              />
              <HugeiconsIcon icon={ImageIcon} />
              {!logoPreview && (
                <span className="text-xs text-muted-foreground font-medium">
                  Upload Logo
                </span>
              )}
              {logoPreview && (
                <div>
                  <Image
                    alt="preview"
                    fill
                    className="object-cover rounded-lg"
                    src={logoPreview}
                  />
                  <div
                    className="absolute -top-2 bg-muted/90 z-20 hover:bg-muted rounded-full p-2  -right-2"
                    onClick={() => {
                      updateCompanyDetails('logo', '')
                      setLogoPreview(null)
                      localStorage.removeItem('companyLogo')
                    }}
                  >
                    <HugeiconsIcon
                      icon={Trash2}
                      className="size-4 text-destructive"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Signature</Label>
            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors h-32  aspect-auto relative">
              {/* <PenLine className="h-8 w-8 text-muted-foreground" /> */}
              <Input
                type="file"
                accept="image/*"
                className="absolute opacity-0 w-full h-full left-0 top-0 z-10 cursor-pointer"
                onChange={(e) =>
                  handleFileChange(e, setSignaturePreview, 'signature')
                }
              />
              {!signaturePreview && (
                <>
                  <HugeiconsIcon icon={Pen01Icon} />
                  <span className="text-xs text-muted-foreground font-medium">
                    Upload Signature
                  </span>
                </>
              )}
              {signaturePreview && (
                <div>
                  <Image
                    alt="preview"
                    fill
                    className="object-cover rounded-lg"
                    src={signaturePreview}
                  />
                  <div
                    className="absolute -top-2 bg-muted/90 z-20 hover:bg-muted rounded-full p-2  -right-2"
                    onClick={() => {
                      updateCompanyDetails('signature', '')
                      setSignaturePreview(null)
                      localStorage.removeItem('companySignature')
                    }}
                  >
                    <HugeiconsIcon
                      icon={Trash2}
                      className="size-4 text-destructive"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billedBy-name">Company Name</Label>
            <Input
              id="billedBy-name"
              placeholder="Your Company Name"
              value={companyDetails.name}
              onChange={(e) => updateCompanyDetails('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billedBy-address">Address</Label>
            <Textarea
              id="billedBy-address"
              placeholder="Address, Phone, Email"
              className="min-h-[100px]"
              value={companyDetails.address}
              onChange={(e) => updateCompanyDetails('address', e.target.value)}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
