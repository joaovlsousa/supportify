import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'

interface LoaderProps {
  className?: string
  label?: string
}

export function Loader({ className = '', label = '' }: LoaderProps) {
  return (
    <div className="flex items-center gap-x-2">
      <LoaderIcon
        className={cn('w-4 h-4 animate-spin', className, label && 'mr-2')}
      />
      <h3 className="text-muted-foreground">{label}</h3>
    </div>
  )
}
