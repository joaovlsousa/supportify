import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'

import { Error } from '@/components/layout/error'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export interface SupportBodySchema {
  id: string
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'OPEN' | 'FINISHED'
  client: {
    name: string
    role: 'PEOPLE' | 'COMPANY'
  }
}

async function getSupports() {
  try {
    const token = await getToken()
    const res = await api.get('/supports/u', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const supports: SupportBodySchema[] = res.data.supports

    return supports
  } catch {
    return []
  }
}

export default async function SupportsPage() {
  const supports = await getSupports()

  if (!supports.length) {
    return <Error label="Nenhum atendimento cadastrado" hideLink />
  }

  return (
    <main className="h-full px-4">
      <div className="md:hidden">
        <Error label="Visualização não disponível para este tamanho de tela" />
      </div>
      <div className="hidden md:block">
        <header>
          <h1 className="text-2xl font-extrabold">Seus atendimentos</h1>
          <p className="text-sm text-muted-foreground">
            Aqui você tem uma visão geral de seus atendimentos
          </p>
        </header>
        <div className="mt-6">
          <DataTable columns={columns} data={supports} />
        </div>
      </div>
    </main>
  )
}
