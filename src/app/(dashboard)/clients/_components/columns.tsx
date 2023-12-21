'use client'

import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'

import { formatDate } from '@/lib/utils'
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
import { Trash, UserCog } from 'lucide-react'

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
    accessorKey: 'createdAt',
    header: 'Data de cadastro',
    cell: ({ row }) => {
      const createdAt: Date = new Date(row.getValue('createdAt'))
      const formattedDate = formatDate(createdAt)

      return <p>{formattedDate}</p>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original
      const clientName = client.name.split(' ').at(0)

      async function deleteClient() {
        try {
          const res = await axios.delete('/api/clients')

          if (res.status === 200) {
            toast.success(`O cliente ${clientName} foi apagado`)
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.error)
          }
        }
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
                  onConfirm={deleteClient}
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
