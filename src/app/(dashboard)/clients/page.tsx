import { getToken } from '@/actions/get-token'
import { api } from '@/lib/api'

import { Error, ErrorSkeleton } from '@/components/error'
import { Skeleton } from '@/components/ui/skeleton'

import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export interface ClientsBodySchema {
  id: string
  name: string
  role: 'PEOPLE' | 'COMPANY'
  createdAt: Date
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
    return null
  }

  return (
    <main className="h-full px-4">
      <div className="md:hidden">
        <Error label="Visualização não disponível para este tamanho de tela" />
      </div>
      <div className="hidden md:block">
        <header className="flex items-center gap-x-16">
          <div>
            <h1 className="text-2xl font-extrabold">Seus clientes</h1>
            <p className="text-sm text-muted-foreground">
              Aqui você tem uma visão geral de seus clientes
            </p>
          </div>
          <div className="p-3 rounded border border-emerald-700 bg-emerald-400/10 text-emerald-700">
            <h1 className="text-lg font-normal">
              {clients.length} cliente(s) cadastrado(s)
            </h1>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/clients/new">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo cliente
            </Link>
          </Button>
        </header>
        <div className="mt-6">
          <DataTable columns={columns} data={clients} />
        </div>
      </div>
    </main>
  )
}

export function ClientsPageSkeleton() {
  return (
    <main className="h-full px-4">
      <div className="md:hidden">
        <ErrorSkeleton />
      </div>
      <div className="hidden md:block">
        <header className="flex items-center space-x-16">
          <div className="space-y-1">
            <Skeleton className="h-10 w-48 rounded-md" />
            <Skeleton className="h-8 w-60 rounded-md" />
          </div>
          <Skeleton className="h-16 w-72" />
          <Skeleton className="w-40 h-11 rounded-md" />
        </header>
        <div className="mt-6 space-y-2">
          <Skeleton className="w-96 h-11 rounded-md" />
          <Skeleton className="w-full h-96 rounded-md" />
          <div className="w-full flex items-center justify-end gap-x-4">
            <Skeleton className="w-32 h-10 rounded-md" />
            <Skeleton className="w-32 h-10 rounded-md" />
          </div>
        </div>
      </div>
    </main>
  )
}
