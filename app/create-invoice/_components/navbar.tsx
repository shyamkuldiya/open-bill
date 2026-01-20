import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Download01Icon,
  MoonIcon,
  SunIcon,
  YogaBallIcon,
  EyeIcon,
  Pdf01Icon,
  Image01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTheme } from 'next-themes'
import { TView } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { RefObject } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useInvoiceStore } from '@/store/use-invoice-store'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

type Props = {
  view: TView
  setView: (view: TView) => void
  previewRef: RefObject<HTMLDivElement | null>
}

function Navbar({ view, setView, previewRef }: Props) {
  const [mounted, setMounted] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { theme, setTheme } = useTheme()
  const store = useInvoiceStore()
  const isMobile = useIsMobile()

  const generateImage = async (format: 'png' | 'jpeg') => {
    if (!previewRef.current) return null

    const options = {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 3, // Very high quality for crisp text
    }

    if (format === 'png') {
      return await toPng(previewRef.current, options)
    } else {
      // Use toJpeg for PDF to keep file size low while maintaining quality
      const { toJpeg } = await import('html-to-image')
      return await toJpeg(previewRef.current, { ...options, quality: 0.95 })
    }
  }

  const generatePDF = async () => {
    const dataUrl = await generateImage('jpeg')
    if (!dataUrl) return null

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true, // Internal PDF compression
    })

    const imgProps = pdf.getImageProperties(dataUrl)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST')
    return pdf
  }

  const handleAction = async (
    action: 'download-pdf' | 'download-png' | 'view-pdf' | 'save-local'
  ) => {
    if (!previewRef.current) return
    setIsExporting(true)

    try {
      if (action === 'download-pdf') {
        const pdf = await generatePDF()
        if (pdf) pdf.save(`invoice-${store.invoiceNumber}.pdf`)
        toast.success('PDF Downloaded (High Quality)')
      } else if (action === 'download-png') {
        const dataUrl = await generateImage('png')
        if (dataUrl) {
          const link = document.createElement('a')
          link.download = `invoice-${store.invoiceNumber}.png`
          link.href = dataUrl
          link.click()
        }
        toast.success('PNG Downloaded (High Quality)')
      } else if (action === 'view-pdf') {
        const pdf = await generatePDF()
        if (pdf) {
          window.open(pdf.output('bloburl'), '_blank')
        }
      } else if (action === 'save-local') {
        // Simple local storage save
        const existingInvoices = JSON.parse(
          localStorage.getItem('saved_invoices') || '[]'
        )
        const newInvoice = {
          id: Date.now().toString(),
          data: { ...store },
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(
          'saved_invoices',
          JSON.stringify([newInvoice, ...existingInvoices])
        )
        toast.success('Invoice saved locally')
      }
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="w-full  border-b  sticky top-0 left-0 z-50 bg-background">
      <nav className="h-16 max-w-[1440px] mx-auto  border-x px-4 flex items-center justify-between  shrink-0 z-10">
        <Link href={'/'} className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary  text-white flex items-center justify-center">
            <HugeiconsIcon icon={YogaBallIcon} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-foreground">
            Open Bill
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Select
            defaultValue={view}
            value={view}
            onValueChange={(value) => setView(value as TView)}
          >
            <SelectTrigger>
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              {!isMobile && <SelectItem value="both">Split View</SelectItem>}
              <SelectItem value="editor">Editor Only</SelectItem>
              <SelectItem value="preview">Preview Only</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full size-9"
          >
            {theme === 'dark' ? (
              <HugeiconsIcon icon={SunIcon} className="size-5" />
            ) : (
              <HugeiconsIcon icon={MoonIcon} className="size-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={isExporting}>
                <HugeiconsIcon icon={Download01Icon} className="size-4" />
                {isExporting ? 'Processing...' : 'Export'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuLabel className="text-[10px] font-black uppercase text-muted-foreground px-2 py-1.5 tracking-widest">
                Actions
              </DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => handleAction('save-local')}
                className="gap-3 cursor-pointer py-2 px-2.5 rounded-md"
              >
                <div className="size-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                  <HugeiconsIcon icon={FloppyDiskIcon} className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs">Save Local</span>
                  <span className="text-[10px] text-muted-foreground">
                    Store in browser
                  </span>
                </div>
              </DropdownMenuItem> */}

              <DropdownMenuSeparator className="my-1 mx-2" />

              <DropdownMenuLabel className="text-[10px] font-black uppercase text-muted-foreground px-2 py-1.5 tracking-widest">
                Export Options
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleAction('view-pdf')}
                className="gap-3 cursor-pointer py-2 px-2.5 rounded-md"
              >
                <div className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                  <HugeiconsIcon icon={EyeIcon} className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs">View PDF</span>
                  <span className="text-[10px] text-muted-foreground">
                    Open in new tab
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleAction('download-pdf')}
                className="gap-3 cursor-pointer py-2 px-2.5 rounded-md"
              >
                <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                  <HugeiconsIcon icon={Pdf01Icon} className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs">Download PDF</span>
                  <span className="text-[10px] text-muted-foreground">
                    Standard A4 Format
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleAction('download-png')}
                className="gap-3 cursor-pointer py-2 px-2.5 rounded-md"
              >
                <div className="size-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                  <HugeiconsIcon icon={Image01Icon} className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs">Download PNG</span>
                  <span className="text-[10px] text-muted-foreground">
                    High-res Image
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
