'use client'

import { cn } from '@/lib/utils'
import { Home, MousePointerSquare, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinksProps {
  isAside?: boolean
}

const links = [
  {
    label: 'Home',
    icon: Home,
    href: '/home',
  },
  {
    label: 'Atendimentos',
    icon: MousePointerSquare,
    href: '/supports',
  },
  {
    label: 'Clientes',
    icon: Users,
    href: '/clients',
  },
]

export function NavLinks({ isAside = false }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul
        className={cn(
          'flex',
          isAside ? 'flex-col justify-center gap-y-8' : 'items-center gap-x-8',
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn(
                'flex items-center gap-x-3 text-sm hover:text-primary transition-colors',
                pathname.startsWith(link.href) && 'text-primary font-medium',
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
