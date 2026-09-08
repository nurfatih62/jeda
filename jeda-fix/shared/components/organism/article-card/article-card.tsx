"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '../../atom/avatar/avatar';
import { Image } from '../../atom/image/image';
import { AuthorMeta } from '../../molecule/author-meta/author-meta';
import { ArticleActions } from '../../molecule/article-actions/article-actions';

export interface ArticleCardData {
  id: string;
  author: string;
  authorUsername?: string;
  date: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  avatarUrl: string;
  imageUrl: string;
  trendPercent?: number;
}

export interface ArticleCardProps {
  article: ArticleCardData;
  liked?: boolean;
  showTrendBadge?: boolean;
  onLikeClick?: (id: string) => void;
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
  isLoggedIn?: boolean;
  onRequireLogin?: () => void;
  isRecommended?: boolean;
}

export function ArticleCard({ 
  article, 
  liked = false, 
  showTrendBadge = false, 
  onLikeClick, 
  onShare, 
  onReport,
  isLoggedIn = false,
  onRequireLogin,
  isRecommended = false,
}: ArticleCardProps) {
  const authorName = article.author?.trim() || 'Pengguna';
  const [likes, setLikes] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(liked);
  const handleAuthorClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = `/profile?username=${encodeURIComponent(article.authorUsername || authorName)}`;
  };

  const handleShare = async () => {
    const articleUrl = `${window.location.origin}/article/${article.id}`;
    if (navigator.share) {
      await navigator.share({ title: article.title, url: articleUrl });
      return;
    }
    await navigator.clipboard.writeText(articleUrl);
  };

  const handleRequireLogin = () => {
    window.location.href = `/login?redirectTo=${encodeURIComponent(`/article/${article.id}`)}`;
  };

  return (
    <article className={`relative flex min-h-card-min-h gap-gap rounded-lg border p-4 ${
        isLoggedIn
          ? 'border-primary-border bg-header-bg'
          : 'border-card-border bg-background'
      }`}>
        <button
          type="button"
          aria-label={`Lihat profil ${authorName}`}
          onClick={handleAuthorClick}
          className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Avatar src={article.avatarUrl} alt={authorName} size="md" />
        </button>
        <div className="flex flex-1 flex-col gap-3.5 pr-card-pr max-[900px]:pr-0">
          <div className="flex flex-col gap-2">
            {showTrendBadge && article.trendPercent !== undefined && (
              <span className="inline-flex w-fit items-center rounded-md bg-badge-trend-bg px-2.5 py-1">
                <span className="font-nunito text-xs font-bold leading-4 text-badge-trend-text">
                  Paling banyak dibaca
                </span>
              </span>
            )}
            {isRecommended && (
              <span className="inline-flex w-fit items-center rounded-md bg-success-surface px-2.5 py-1">
                <span className="font-nunito text-xs font-bold leading-4 text-success-text">
                  Cocok denganmu
                </span>
              </span>
            )}
            <AuthorMeta author={authorName} date={article.date} onAuthorClick={handleAuthorClick} />
            
            <Link href={`/article/${article.id}`} className="no-underline">
              <h2 className="font-sans text-2xl font-bold leading-6.5 text-text-primary hover:text-primary">
                {article.title}
              </h2>
              <p className="font-sans max-w-card-max-w text-base font-medium leading-6 text-text-muted">
                {article.description}
              </p>
            </Link>
          </div>
          
          <ArticleActions
            likes={likes}
            comments={article.comments}
            liked={isLiked}
            isLoggedIn={isLoggedIn}
            onRequireLogin={onRequireLogin ?? handleRequireLogin}
            onLikeClick={() => {
              if (isLoggedIn) {
                setLikes((value) => value + (isLiked ? -1 : 1));
                setIsLiked((value) => !value);
              }
              onLikeClick?.(article.id);
            }}
            onCommentClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              // Menggunakan navigasi Link standar alih-alih router.push agar aman di Storybook
              window.location.href = `/article/${article.id}/comments`;
            }}
            onShare={async () => {
              await handleShare();
              onShare?.(article.id);
            }}
            onReport={() => {
              onReport?.(article.id);
            }}
          />
        </div>
        <Link
          href={`/article/${article.id}`}
          aria-label={`Baca artikel ${article.title}`}
          className="absolute right-gap top-4 h-(--spacing-card-img-h) w-(--spacing-card-img-w) max-[900px]:static max-[900px]:h-card-img-mobile-h max-[900px]:w-full"
        >
          <Image src={article.imageUrl} alt={article.title} radius={8} />
        </Link>
      </article>
  );
}