import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface ErrorProps {
  label: string
}

export function Error({ label }: ErrorProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <div className="flex items-center justify-center p-1 bg-muted-foreground rounded-full">
        <Image src="/error.svg" alt="error" width={64} height={64} />
      </div>
      <p className="text-sm text-muted-foreground text-center">{label}</p>
      <Button asChild>
        <Link href="/home">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o início
        </Link>
      </Button>
    </div>
  )
}

export function ErrorSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Skeleton className="h-8 w-60" />
      <Skeleton className="h-8 w-36" />
    </div>
  )
}
