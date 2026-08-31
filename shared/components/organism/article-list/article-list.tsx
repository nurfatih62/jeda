"use client";

import { ArticleCard } from '../article-card/article-card';
import type { ArticleCardData } from '../article-card/article-card';

export interface ArticleListProps {
  articles: ArticleCardData[];
  /** Tambahkan properti ini untuk meneruskan status badge tren */
  showTrendBadge?: boolean;
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
}

export function ArticleList({ 
  articles, 
  showTrendBadge = false, // Default false agar di halaman lain tetap aman
  onShare, 
  onReport 
}: ArticleListProps) {
  return (
    <div className="flex flex-col gap-6 pb-15">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          showTrendBadge={showTrendBadge} // Teruskan ke ArticleCard di sini
          onShare={onShare} 
          onReport={onReport} 
        />
      ))}
    </div>
  );
}