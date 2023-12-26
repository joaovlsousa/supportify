'use client'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { AlertCard } from '@/components/alert-card'
import { Loader } from '@/components/layout/loader'
import { Button } from '@/components/ui/button'

export function DeleteUser() {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  async function onSubmit() {
    setTransition(async () => {
      try {
        const res = await axios.delete('/api/u')

        if (res.status === 200) {
          toast.success('Conta apagada')
          router.push('/')
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error)
        }
      }
    })
  }

  return (
    <div className="flex items-center p-3 rounded-md border border-red-700 bg-red-700/30">
      <p className="text-xs font-medium text-muted-foreground">
        <span className="font-semibold text-red-700">CUIDADO:</span> Ao realizar
        essa ação você perderá todos os seus dados
      </p>
      <AlertCard
        title="Tem certeza disso?"
        description="Todos os seus dados serão apagados"
        variant="destructive"
        onConfirm={onSubmit}
        className="w-auto"
      >
        <Button variant="destructive" disabled={isPending} className="ml-auto">
          {isPending ? <Loader label="Apagando conta..." /> : 'Apagar conta'}
        </Button>
      </AlertCard>
    </div>
  )
}
