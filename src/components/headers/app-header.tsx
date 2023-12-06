import { Logo } from '@/components/logo'
import { Navbar } from '@/components/navbar'
import { Profile } from '@/components/profile'

export function AppHeader() {
  return (
    <header className="w-full h-16 px-6 md:px-16 flex items-center justify-between border-b">
      <Logo />
      <Navbar />
      <Profile />
    </header>
  )
}
