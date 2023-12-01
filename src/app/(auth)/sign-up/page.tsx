import { SignUpForm } from '@/components/forms/sign-up-form'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <SignUpForm />
      <Link href="/sign-in" className="text-sm text-muted-foreground">
        Já tem uma conta? <span className="text-sky-600">entrar</span>
      </Link>
    </div>
  )
}
