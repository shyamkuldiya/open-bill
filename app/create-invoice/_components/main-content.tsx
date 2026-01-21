'use client'
import { InvoiceEditor } from '@/app/create-invoice/_components/invoice-editor'
import { InvoicePreview } from '@/app/create-invoice/_components/invoice-preview'
import { cn } from '@/lib/utils'
import { TView } from '@/types'

import { RefObject, useEffect, useRef, useState } from 'react'

type Props = {
  view: TView
  previewRef: RefObject<HTMLDivElement | null>
}

export default function MainContent({ view, previewRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 64 // 64px padding
        const targetWidth = 794 // A4 width at 96dpi
        if (containerWidth < targetWidth) {
          setScale(containerWidth / targetWidth) // 690/794
        } else {
          setScale(1)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [view])

  return (
    <main className="grow flex h-[calc(100svh-64px)] overflow-hidden max-w-[1440px] mx-auto border-x ">
      {/* Editor Side */}
      {(view === 'both' || view === 'editor') && (
        <div
          className={cn(
            'flex flex-col transition-all duration-300 ease-in-out border-r bg-background',
            view === 'both' ? 'w-[40%] xl:w-[35%]' : 'w-full'
          )}
        >
          <InvoiceEditor />
        </div>
      )}

      {(view === 'both' || view === 'preview') && (
        <div
          ref={containerRef}
          className={cn(
            'grow overflow-y-auto p-8 transition-all duration-300 ease-in-out bg-muted/30 flex flex-col items-center scrollbar-thin scrollbar-thumb-muted-foreground/20',
            view === 'both' ? 'w-[60%] xl:w-[65%]' : 'w-full'
          )}
        >
          <div
            className="origin-top transition-transform duration-200"
            style={{
              transform: `scale(${scale})`,
              width: '794px', // Standard A4 Width
            }}
          >
            <div className="bg-white shadow-sm rounded-sm overflow-hidden border border-zinc-200/50">
              <InvoicePreview ref={previewRef} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
