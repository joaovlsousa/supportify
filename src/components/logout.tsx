'use client'

import axios, { AxiosError } from 'axios'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface LogOutProps {
  className?: string
  variant?: 'ghost' | 'destructive'
}

export function LogOut({ className, variant = 'ghost' }: LogOutProps) {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  async function handleLogOut() {
    setTransition(async () => {
      try {
        const res = await axios.delete('/api/logout')

        if (res.status === 200) {
          router.replace('/sign-in')
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error)
        }
      }
    })
  }

  function toasterLogOut() {
    toast.promise(handleLogOut(), {
      error: 'Não foi possível sair',
      loading: 'Saindo...',
      success: 'Sucesso',
    })
  }

  return (
    <Button
      variant={variant}
      onClick={toasterLogOut}
      disabled={isPending}
      className={cn('w-full h-full p-0 justify-start', className)}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </Button>
  )
}
