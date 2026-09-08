"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase/client';
import { ArticleCard } from '../article-card/article-card';
import type { ArticleCardData } from '../article-card/article-card';

export interface ArticleListProps {
  articles: ArticleCardData[];
  /** Tambahkan properti ini untuk meneruskan status badge tren */
  showTrendBadge?: boolean;
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
  isRecommended?: boolean;
}

export function ArticleList({ 
  articles, 
  showTrendBadge = false, // Default false agar di halaman lain tetap aman
  onShare, 
  onReport,
  isRecommended = false,
}: ArticleListProps) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setAuthenticated(Boolean(data.session?.user));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const loggedIn = authenticated;

  return (
    <div className="flex flex-col gap-6 pb-16">
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          showTrendBadge={showTrendBadge} // Teruskan ke ArticleCard di sini
          isLoggedIn={loggedIn}
          isRecommended={isRecommended && loggedIn && index === 0}
          onShare={onShare} 
          onReport={onReport} 
        />
      ))}
    </div>
  );
}