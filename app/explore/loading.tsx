import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { ArticleCardSkeleton } from '../../shared/components/organism/article-card/article-card-skeleton';

export default function Loading() {
  return (
    <AppShell activeSidebarKey="search">
      <main className="px-11.5 py-11">
        {/* 1. Judul "Eksplor topik" */}
        <div className="mb-11 h-9 w-48 animate-pulse rounded-md bg-card-border/40" />

        {/* 2. Topic Tags (Dibuat 6 buah sesuai array TOPICS asli) */}
        <div className="flex gap-2.5 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10.5 w-32 shrink-0 animate-pulse rounded-full bg-card-border/40"
            />
          ))}
        </div>

        {/* 3. SortSelect */}
        <div className="mt-6">
          <div className="h-10 w-36 animate-pulse rounded-md bg-card-border/40" />
        </div>

        {/* 4. Article List (3 kartu) */}
        <div className="mt-11 flex flex-col gap-6">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </main>
    </AppShell>
  );
}