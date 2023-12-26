'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { NavLinks } from '@/components/nav-links'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Sidebar() {
  const [open, setOpen] = useState(false)

  function onOpen() {
    setOpen(true)
  }

  function onClose() {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="sm" className="w-auto">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="pt-8" onClick={onClose}>
          <NavLinks isAside />
        </div>
      </SheetContent>
    </Sheet>
  )
}
