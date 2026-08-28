import { ArticleCardSkeleton } from '../shared/components/organism/article-card/article-card-skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-341 px-11.5 pt-19.25">
      <div className="mb-6 flex items-center gap-2.5">
        <div className="h-10 w-24 animate-pulse rounded-md bg-card-border/40" />
        <div className="h-10 w-24 animate-pulse rounded-md bg-card-border/40" />
      </div>
      <div className="flex flex-col gap-6 pb-15">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    </div>
  );
}
