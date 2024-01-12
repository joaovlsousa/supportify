import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'

import { Error } from '@/components/layout/error'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export interface ClientsBodySchema {
  id: string
  name: string
  role: 'PEOPLE' | 'COMPANY'
  address: {
    city: string
  }
}

async function getClients() {
  try {
    const token = await getToken()
    const res = await api.get('/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const clients: ClientsBodySchema[] = res.data.clients

    return clients
  } catch {
    return []
  }
}

export default async function ClientsPage() {
  const clients = await getClients()

  if (!clients.length) {
    return <Error label="Nenhum cliente cadastrado" hideLink />
  }

  return (
    <main className="h-full px-4">
      <div className="md:hidden">
        <Error label="Visualização não disponível para este tamanho de tela" />
      </div>
      <div className="hidden md:block">
        <header>
          <h1 className="text-2xl font-extrabold">Seus clientes</h1>
          <p className="text-sm text-muted-foreground">
            Aqui você tem uma visão geral de seus clientes
          </p>
        </header>
        <div className="mt-6">
          <DataTable columns={columns} data={clients} />
        </div>
      </div>
    </main>
  )
}
