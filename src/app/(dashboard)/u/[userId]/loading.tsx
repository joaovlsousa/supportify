import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingUserPage() {
  return (
    <main className="scroll-smooth h-full flex justify-center px-2 md:px-0">
      <div className="w-full h-full space-y-4 md:w-[42rem]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-60 h-8" />
            </div>
            <Skeleton className="w-32 h-10 rounded-md" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="h-20 pt-2 space-y-1">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-40 h-4" />
            </div>
          </div>

          <Skeleton className="md:w-3/5 h-28 rounded-md" />
          <Skeleton className="md:w-3/5 h-28 rounded-md" />
          <Skeleton className="md:w-3/5 h-28 rounded-md" />
          <Skeleton className="md:w-3/5 h-28 rounded-md" />
        </section>
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-64 h-10" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-28 rounded-md" />
            <Skeleton className="h-28 rounded-md" />
          </div>
        </section>
      </div>
    </main>
  )
}
