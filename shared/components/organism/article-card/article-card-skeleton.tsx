import { Skeleton } from '../../atom/skeleton/skeleton';

/** Placeholder ArticleCard saat data (faker) masih di-generate/loading. */
export function ArticleCardSkeleton() {
  return (
    <div
      className="relative flex min-h-49.25 gap-2 rounded-lg border border-card-border bg-background p-4"
      aria-hidden="true"
    >
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

      <div className="flex flex-1 flex-col gap-3.5 pr-78.75 max-[900px]:pr-0">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-6.5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>

      <div className="absolute right-4.5 top-4 h-41.25 w-74.75 max-[900px]:static max-[900px]:h-50 max-[900px]:w-full">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
}
