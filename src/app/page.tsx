import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="h-screen px-2 flex flex-col items-center justify-center gap-y-6">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r via-rose-700 from-sky-700 to-indigo-700">
        Tenha todo o suporte para gerenciamento <br /> de seus atendimentos de
        graça
      </h1>
      <p className="text-muted-foreground leading-relaxed text-center">
        Crie um novo atendimento, adicione um novo cliete e tenha toda vantagem{' '}
        <br />
        ao utilizar nosso software, e o melhor:{' '}
        <span className="text-rose-500">totalmente de graça</span>
      </p>
      <Button asChild variant="primary" className="group">
        <Link href="/sign-up">
          Comece agora{' '}
          <ArrowRight className="h-4 ml-1 transition-all group-hover:ml-2" />
        </Link>
      </Button>
      <Link href="/sign-in" className="text-muted-foreground text-sm">
        Já tem uma conta? <span className="text-sky-600">entrar</span>
      </Link>
    </main>
  )
}
