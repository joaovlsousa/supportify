'use client'

import axios, { AxiosError } from 'axios'
import { Trash, UserCog } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { ColumnDef } from '@tanstack/react-table'
import { ClientsBodySchema } from '../page'

import { AlertCard } from '@/components/alert-card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<ClientsBodySchema>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'role',
    header: 'Tipo',
    cell: ({ row }) => {
      const role: string = row.getValue('role')
      const formattedRole =
        role === 'PEOPLE' ? 'Pessoa Física' : 'Pessoa Jurídica'

      return <p>{formattedRole}</p>
    },
  },
  {
    accessorKey: 'address.city',
    header: 'Cidade',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original
      const clientName = client.name.split(' ').at(0)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter()

      async function deleteClient() {
        try {
          const res = await axios.delete(`/api/clients/${client.id}`)

          if (res.status === 200) {
            toast.success(`O cliente ${clientName} foi apagado`)
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
          loading: `Apagando o cliente ${clientName}...`,
        })
      }

      return (
        <div className="flex items-center gap-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="w-auto h-auto">
                  <Link href={`/clients/${client.id}`}>
                    <UserCog className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-medium p-2 rounded bg-slate-300 text-slate-950">
                <p>Ver detalhes de {clientName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCard
                  title={`Deseja apagar o cliente ${clientName}?`}
                  description="Você não poderá mais fazer atendimentos a este cliente."
                  onConfirm={toasterDeleteClient}
                  variant="destructive"
                >
                  <Button asChild variant="ghost" className="w-auto h-auto">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </AlertCard>
              </TooltipTrigger>
              <TooltipContent className="text-xs font-medium p-2 rounded bg-slate-300 text-slate-950">
                <p>Apagar {clientName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
