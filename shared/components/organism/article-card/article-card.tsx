"use client";

import { Avatar } from '../../atom/avatar/avatar';
import { Image } from '../../atom/image/image';
import { AuthorMeta } from '../../molecule/author-meta/author-meta';
import { ArticleActions } from '../../molecule/article-actions/article-actions';

export interface ArticleCardData {
  id: string;
  author: string;
  date: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  avatarUrl: string;
  imageUrl: string;
  /** Persentase tren (opsional). Diisi -> muncul badge "+X%" (dipakai tab Populer). */
  trendPercent?: number;
}

export interface ArticleCardProps {
  article: ArticleCardData;
  liked?: boolean;
  onLikeClick?: (id: string) => void;
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
}

export function ArticleCard({ 
  article, 
  liked = false, 
  onLikeClick, 
  onShare, 
  onReport 
}: ArticleCardProps) {
  return (
    <article className="relative flex min-h-49.25 gap-2 rounded-lg border border-card-border bg-background p-4">
      <Avatar src={article.avatarUrl} alt={article.author} size="md" />
      <div className="flex flex-1 flex-col gap-3.5 pr-78.75 max-[900px]:pr-0">
        <div className="flex flex-col gap-2">
          {article.trendPercent !== undefined && (
            <span className="inline-flex w-fit items-center rounded-sm bg-badge-trend-bg px-1 py-0.5">
              <span className="font-nunito text-xs font-medium leading-4 text-badge-trend-text">
                +{article.trendPercent}%
              </span>
            </span>
          )}
          <AuthorMeta author={article.author} date={article.date} />
          <h2 className="font-sans text-2xl font-bold leading-6.5 text-text-primary">
            {article.title}
          </h2>
          <p className="font-sans max-w-178 text-base font-medium leading-6 text-text-muted">
            {article.description}
          </p>
        </div>
        <ArticleActions
          likes={article.likes}
          comments={article.comments}
          liked={liked}
          onLikeClick={() => onLikeClick?.(article.id)}
          onShare={() => onShare?.(article.id)}
          onReport={() => onReport?.(article.id)}
        />
      </div>
      <div className="absolute right-gap top-4 h-41.25 w-74.75 max-[900px]:static max-[900px]:h-50 max-[900px]:w-full">
        <Image src={article.imageUrl} alt={article.title} radius={8} />
      </div>
    </article>
  );
}