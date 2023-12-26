import { Logo } from '@/components/layout/logo'
import { NavLinks } from '@/components/nav-links'
import { Profile } from '@/components/profile'
import { Sidebar } from '@/components/sidebar'

export function AppHeader() {
  return (
    <header className="w-full h-16 px-6 md:px-10 lg:px-16 flex items-center justify-between border-b">
      <Sidebar />
      <Logo />
      <div className="hidden sm:block">
        <NavLinks />
      </div>
      <Profile />
    </header>
  )
}
