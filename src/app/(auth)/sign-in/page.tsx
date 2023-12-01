import { SignInForm } from '@/components/forms/sign-in-form'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <SignInForm />
      <Link href="/sign-up" className="text-sm text-muted-foreground">
        Não tem uma conta? <span className="text-sky-600">crie agora</span>
      </Link>
    </div>
  )
}
