import { CardLink } from '@/components/card-link'
import { MousePointerSquare, UserPlus } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="h-full grid grid-cols-1 place-items-center gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      <CardLink
        title="Novo atendimento"
        description="Inicie um novo atendimento por aqui"
        href="/supports/new"
        buttonLabel="Novo atendimento"
        icon={MousePointerSquare}
      />
      <CardLink
        title="Novo cliente"
        description="Cadastre um novo cliente no sistema"
        href="/clients/new"
        buttonLabel="Cadastrar cliente"
        icon={UserPlus}
      />
    </main>
  )
}
