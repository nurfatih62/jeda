import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { ArticleCardSkeleton } from '../../shared/components/organism/article-card/article-card-skeleton';

export default function Loading() {
  return (
    <AppShell activeSidebarKey="home">
      {/* 1. Skeleton untuk Hero Section (Meniru ukuran box Hero asli) */}
      <div className="mb-12 h-80 w-full animate-pulse bg-card-border/20" />

      <div className="mx-auto max-w-341 px-11.5">
        {/* 2. Skeleton untuk TabsLink (Populer & Terbaru) */}
        <div className="mb-8 pt-7.75">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-20 animate-pulse rounded-md bg-card-border/40" />
            <div className="h-6 w-20 animate-pulse rounded-md bg-card-border/40" />
          </div>
          <div className="relative mt-2 h-px bg-card-border/40">
            <div className="absolute -top-px h-0.75 w-20 animate-pulse bg-card-border/60" />
          </div>
        </div>

        {/* 3. Skeleton untuk Article List (Menampilkan 6 kartu sesuai ARTICLE_COUNT) */}
        <div className="flex flex-col gap-6">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </div>
    </AppShell>
  );
}