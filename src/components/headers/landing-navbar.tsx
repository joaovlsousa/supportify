import Link from 'next/link'

import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'

interface LandingHeaderProps {
  isAuthenticated: boolean
}

export function LandingHeader({ isAuthenticated }: LandingHeaderProps) {
  const link = isAuthenticated
    ? { label: 'Dashboard', href: '/home' }
    : { label: 'Comece agora', href: '/sign-up' }
  return (
    <header className="w-full h-16 px-6 md:px-16 flex items-center justify-between border-b">
      <Logo />
      <Button asChild>
        <Link href={link.href}>{link.label}</Link>
      </Button>
    </header>
  )
}
