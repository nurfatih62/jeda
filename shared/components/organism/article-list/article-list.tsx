"use client";

import { ArticleCard } from "../article-card/article-card";
import type { ArticleCardData } from "../article-card/article-card";

export interface ArticleListProps {
  articles: ArticleCardData[];
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
}

export function ArticleList({
  articles,
  onShare,
  onReport,
}: ArticleListProps) {
  return (
    <div className="flex flex-col gap-6 pb-15">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onShare={onShare}
          onReport={onReport}
        />
      ))}
    </div>
  );
}