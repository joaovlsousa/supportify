import { ErrorSkeleton } from '@/components/layout/error'
import { Skeleton } from '@/components/ui/skeleton'

export function DataTableSkeleton() {
  return (
    <main className="h-full px-4">
      <div className="md:hidden">
        <ErrorSkeleton />
      </div>
      <div className="hidden md:block">
        <header className="space-y-1">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-8 w-60 rounded-md" />
        </header>
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-x-10">
            <Skeleton className="h-11 w-64" />
            <Skeleton className="h-11 w-64" />
            <Skeleton className="h-11 w-64" />
          </div>
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
