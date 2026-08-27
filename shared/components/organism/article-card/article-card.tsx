"use client";

import { useState } from "react";

import { Avatar } from "../../atom/avatar/avatar";
import { Image } from "../../atom/image/image";
import { AuthorMeta } from "../../molecule/author-meta/author-meta";
import { ArticleActions } from "../../molecule/article-actions/article-actions";

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
}

export interface ArticleCardProps {
  article: ArticleCardData;
  onShare?: (id: string) => void;
  onReport?: (id: string) => void;
}

export function ArticleCard({
  article,
  onShare,
  onReport,
}: ArticleCardProps) {
  const [likes, setLikes] = useState(article.likes);

  return (
    <article className="relative flex min-h-49.25 gap-2 rounded-lg border border-card-border bg-background p-4">
      {/* AVATAR */}
      <Avatar
        src={article.avatarUrl}
        alt={article.author}
        size="md"
      />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-3.5 pr-78.75 max-[900px]:pr-0">
        {/* AUTHOR + ARTICLE */}
        <div className="flex flex-col gap-2">
          <AuthorMeta
            author={article.author}
            date={article.date}
          />

          {/* TITLE */}
          <h2 className="font-sans text-2xl font-bold leading-6.5 text-text-primary">
            {article.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="font-sans max-w-178 text-base font-medium leading-6 text-text-muted">
            {article.description}
          </p>
        </div>

        {/* ACTIONS */}
        <ArticleActions
          likes={likes}
          comments={article.comments}
          onLike={() => setLikes((current) => current + 1)}
          onShare={() => onShare?.(article.id)}
          onReport={() => onReport?.(article.id)}
        />
      </div>

      {/* COVER IMAGE */}
      <div className="absolute right-4.5 top-4 h-41.25 w-74.75 max-[900px]:static max-[900px]:h-50 max-[900px]:w-full">
        <Image
          src={article.imageUrl}
          alt={article.title}
          radius={8}
        />
      </div>
    </article>
  );
}