'use client'

import axios, { AxiosError } from 'axios'
import { CheckCircle2, Info, Search, Store, Trash, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ColumnDef } from '@tanstack/react-table'
import { SupportBodySchema } from '../page'

import { AlertCard } from '@/components/alert-card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<SupportBodySchema>[] = [
  {
    accessorKey: 'client',
    header: 'Cliente',
    cell: ({ row }) => {
      const { client } = row.original
      const Icon = client.role === 'COMPANY' ? Store : User

      return (
        <div className="flex items-center gap-x-2">
          <Icon
            className={cn(
              'w-4 h-4',
              client.role === 'COMPANY' ? 'text-emerald-500' : 'text-red-500',
            )}
          />
          <p>{client.name}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Assunto',
    cell: ({ row }) => {
      const { title } = row.original
      const newTitle =
        title.length > 30 ? title.substring(0, 30).concat('...') : title

      return <p>{newTitle}</p>
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      const { description } = row.original
      const newDescription =
        description.length > 30
          ? description.substring(0, 30).concat('...')
          : description

      return (
        <p className="italic text-sm text-muted-foreground">{newDescription}</p>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original
      const Icon = status === 'OPEN' ? Info : CheckCircle2

      return (
        <div
          className={cn(
            'flex items-center gap-x-2',
            status === 'OPEN' ? 'text-orange-500' : 'text-emerald-500',
          )}
        >
          <Icon className="w-4 h-4" />
          <p>{status === 'OPEN' ? 'Em aberto' : 'Finalizado'}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => {
      const { priority } = row.original

      return (
        <div
          className={cn(
            priority === 'HIGH' && 'text-orange-500',
            priority === 'MEDIUM' && 'text-zinc-300',
            priority === 'LOW' && 'text-emerald-500',
          )}
        >
          {priority === 'HIGH' && <p>Alta</p>}
          {priority === 'MEDIUM' && <p>Média</p>}
          {priority === 'LOW' && <p>Baixa</p>}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const support = row.original

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()

      async function deleteClient() {
        try {
          const res = await axios.delete(`/api/supports/${support.id}`)

          if (res.status === 200) {
            toast.success('Atendimento apagado')
            router.refresh()
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.error)
          }
        }
      }

      function toasterDeleteClient() {
        toast.promise(deleteClient(), {
          loading: `Apagando atendimento...`,
        })
      }

      return (
        <div className="flex items-center gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="w-auto h-auto">
                  <Link href={`/supports/${support.id}`}>
                    <Search className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-medium p-2 rounded bg-slate-300 text-slate-950">
                <p>Ver detalhes do atendimento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCard
                  title={`Deseja apagar este atendimento?`}
                  description="Você perderá todos os dados deste atendimento."
                  onConfirm={toasterDeleteClient}
                  variant="destructive"
                >
                  <Button asChild variant="ghost" className="w-auto h-auto">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </AlertCard>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-medium p-2 rounded bg-slate-300 text-slate-950">
                <p>Apagar atendimento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
