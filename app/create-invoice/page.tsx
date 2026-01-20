'use client'
import { useState, useRef, useEffect } from 'react'
import Navbar from './_components/navbar'
import MainContent from './_components/main-content'
import { TView } from '@/types'
import { useIsMobile } from '@/hooks/use-mobile'

export default function CreateInvoice() {
  const [view, setView] = useState<TView>('both')
  const previewRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile && view === 'both') {
      setView('editor')
    }
  }, [isMobile])

  return (
    <div className="h-screen overflow-hidden">
      <Navbar view={view} setView={setView} previewRef={previewRef} />
      <MainContent view={view} previewRef={previewRef} />
    </div>
  )
}
