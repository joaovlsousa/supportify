import Link from 'next/link'

import { getToken } from '@/actions/get-token'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export async function LandingHeader() {
  const token = await getToken()
  const isAuthenticated = !!token

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
