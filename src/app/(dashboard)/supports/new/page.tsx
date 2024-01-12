import { getToken } from '@/actions/get-token'
import { NewSupportForm } from '@/components/forms/new-support-form'
import { Error } from '@/components/layout/error'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'

async function getClients() {
  try {
    const token = await getToken()

    if (!token) {
      return []
    }

    const res = await api.get('/clients', {
      headers: { Authorization: `Bearer ${token}` },
    })

    const { clients } = res.data

    return clients
  } catch (error) {
    return []
  }
}

export default async function NewSupportPage() {
  const clients: [] = await getClients()

  if (!clients.length) {
    return <Error label="Cadastre um cliente primeiro" />
  }

  return (
    <div className="w-4/5 md:max-w-2xl space-y-6 m-auto">
      <div>
        <h2 className="text-xl font-semibold">Novo Atendimento</h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados referentes ao novo atendimento para cadastrá-lo.
        </p>
      </div>
      <Separator />
      <NewSupportForm clients={clients} />
    </div>
  )
}

export function NewSupportPageSkeleton() {
  return (
    <div className="w-4/5 md:max-w-2xl space-y-9 m-auto">
      <div className="space-y-3">
        <Skeleton className="h-10 w-52 md:w-80" />
        <Skeleton className="h-5 w-72 md:w-96" />
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="flex items-center gap-x-6">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-10 w-44" />
      </div>
    </div>
  )
}
