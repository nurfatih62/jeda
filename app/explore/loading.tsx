import { ArticleCardSkeleton } from '../../shared/components/organism/article-card/article-card-skeleton';

export default function Loading() {
  return (
    <div className="flex">
      <div className="sticky top-21 h-[calc(100vh-84px)] w-27 shrink-0 bg-[#F2F4ED]" />
      <main className="min-w-0 flex-1 px-11.5 py-11">
        <div className="mb-11 h-9 w-64 animate-pulse rounded-md bg-card-border/40" />
        <div className="mb-11 flex gap-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10.5 w-32 shrink-0 animate-pulse rounded-full bg-card-border/40"
            />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </main>
    </div>
  );
}
