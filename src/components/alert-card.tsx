import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

interface AlertCardProps {
  children: React.ReactNode
  title: string
  description: string
  onConfirm: () => void
  disabled?: boolean
  variant?: 'destructive' | 'default'
  className?: string
}

export function AlertCard({
  children,
  description,
  title,
  variant = 'default',
  disabled,
  onConfirm,
  className,
}: AlertCardProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={cn('w-full', className)}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              variant === 'destructive' && 'bg-red-500 hover:bg-red-400',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            {variant === 'destructive' ? 'Apagar' : 'Continuar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
