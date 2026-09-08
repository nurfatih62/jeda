import { Skeleton } from '../../atom/skeleton/skeleton';

/**
 * Placeholder ArticleCard saat data (faker) masih di-generate/loading.
 * Ukuran tiap bar disamain persis sama tinggi baris asli di ArticleCard:
 * - AuthorMeta: leading-7 (28px) -> h-skeleton-author
 * - Title: leading-6.5 (26px)   -> h-skeleton-title
 * - Deskripsi: leading-6 (24px) -> h-6 per baris
 * - Baris aksi: like+komentar (kiri) + spacer + bookmark/share/flag (kanan)
 */
export function ArticleCardSkeleton() {
  return (
    <div
      className="relative flex min-h-card-min-h gap-2 rounded-lg border border-card-border bg-background p-4"
      aria-hidden="true"
    >
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

      <div className="flex flex-1 flex-col gap-3.5 pr-card-pr max-[900px]:pr-0">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-skeleton-author w-40" />
          <Skeleton className="h-skeleton-title w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
          <span className="flex-1" />
          <Skeleton className="h-6 w-6 shrink-0" />
          <Skeleton className="h-6 w-6 shrink-0" />
          <Skeleton className="h-6 w-6 shrink-0" />
        </div>
      </div>

      <div className="absolute right-gap top-4 h-(--spacing-card-img-h) w-(--spacing-card-img-w) max-[900px]:static max-[900px]:h-card-img-mobile-h max-[900px]:w-full">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
}