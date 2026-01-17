'use client'

import { useTheme } from 'next-themes'
import { InvoiceEditor } from '@/components/invoice-editor'
import { InvoicePreview } from '@/components/invoice-preview'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Download, Share2, PanelLeft, Split } from 'lucide-react'
import { HugeiconsIcon } from '@hugeicons/react'
import { YogaBallIcon } from '@hugeicons/core-free-icons'
import { useState, useEffect } from 'react'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<'both' | 'editor' | 'preview'>('both')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      {/* Navbar */}
      <nav className="h-16 border-b flex items-center justify-between px-6 bg-card shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-lime-500 flex items-center justify-center">
            <HugeiconsIcon icon={YogaBallIcon} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
            Open Bill
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={view === 'editor' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 text-xs font-semibold"
              onClick={() => setView('editor')}
            >
              Editor
            </Button>
            <Button
              variant={view === 'both' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 text-xs font-semibold"
              onClick={() => setView('both')}
            >
              Both
            </Button>
            <Button
              variant={view === 'preview' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 text-xs font-semibold"
              onClick={() => setView('preview')}
            >
              Preview
            </Button>
          </div>

          <div className="h-8 w-px bg-border mx-2 hidden sm:block" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            className="hidden sm:flex rounded-full font-semibold gap-2"
          >
            <Share2 className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold px-6 gap-2 shadow-lg shadow-indigo-500/20">
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="grow flex overflow-hidden">
        {/* Editor Side */}
        {(view === 'both' || view === 'editor') && (
          <div
            className={`flex flex-col border-r bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 ease-in-out ${
              view === 'both' ? 'w-[40%] xl:w-[35%]' : 'w-full'
            }`}
          >
            <div className="p-6 pb-0 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <PanelLeft className="h-5 w-5 text-indigo-600" /> Invoice
                Creation
              </h2>
            </div>
            <InvoiceEditor />
          </div>
        )}

        {/* Preview Side */}
        {(view === 'both' || view === 'preview') && (
          <div
            className={`grow bg-zinc-100 dark:bg-zinc-900 overflow-y-auto p-8 lg:p-12 transition-all duration-300 ease-in-out ${
              view === 'both' ? 'w-[60%] xl:w-[65%]' : 'w-full'
            }`}
          >
            <div className="max-w-fit mx-auto scale-[0.85] origin-top xl:scale-90 2xl:scale-100">
              <InvoicePreview />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
