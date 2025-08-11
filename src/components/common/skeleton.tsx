import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted/60', className)} />
  );
}

export function BlogsSkeleton() {
  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto mt-16 flex max-w-4xl flex-col justify-center px-8 text-start">
        <div className="item-center flex justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="mt-4 mb-8 h-6 w-96" />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="grid max-w-4xl grid-cols-1 justify-items-center gap-4 p-4 md:grid-cols-2 md:grid-rows-2">
          {/* First blog card (larger) */}
          <div className="w-full md:row-span-2 md:w-96">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Skeleton className="mb-4 h-6 w-3/4" />
              <Skeleton className="mb-4 h-20 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Second and third blog cards */}
          {[1, 2].map((i) => (
            <div key={i} className="w-full">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Skeleton className="mb-4 h-6 w-3/4" />
                <Skeleton className="mb-4 h-12 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResearchSkeleton() {
  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto mt-16 flex max-w-4xl flex-col justify-center px-8 text-start">
        <div className="item-center flex justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="mt-4 mb-8 h-6 w-96" />
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="flex w-full flex-col items-center gap-4 p-4 md:px-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <Skeleton className="mb-4 h-6 w-4/5" />
                <Skeleton className="mb-4 h-16 w-full" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleIndexSkeleton() {
  return (
    <div className="mx-auto">
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="mb-4 h-6 w-4/5" />
            <Skeleton className="mb-4 h-20 w-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
