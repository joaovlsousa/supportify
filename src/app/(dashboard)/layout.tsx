import { Footer } from '@/components/footer'
import { AppHeader } from '@/components/headers/app-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-full relative">
      <AppHeader />
      <main className="pt-14 pb-20">{children}</main>
      <Footer />
    </div>
  )
}
