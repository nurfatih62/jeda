"use client";

import React from 'react';
import { Avatar } from '../../atom/avatar/avatar';
import { AuthorMeta } from '../author-meta/author-meta';
import { ArticleActions } from '../article-actions/article-actions';
import { Typography } from '../../typography/typography';

export interface ArticleCommentItemProps {
  /** URL foto profil penulis */
  avatarSrc?: string;
  /** Nama penulis */
  author: string;
  /** Tanggal postingan */
  date: string;
  /** Isi teks atau komentar */
  content: string;
  /** Jumlah likes */
  likes: number;
  /** Jumlah komentar */
  comments: number;
  /** Status like */
  liked?: boolean;
  /** Status bookmark */
  bookmarked?: boolean;
  /** Callback like */
  onLikeClick?: () => void;
  /** Callback bookmark */
  onBookmarkClick?: () => void;
  /** Callback share */
  onShare?: () => void;
  /** Callback report */
  onReport?: () => void;
  /** Kelas tambahan opsional */
  className?: string;
}

export function ArticleCommentItem({
  avatarSrc,
  author,
  date,
  content,
  likes,
  comments,
  liked,
  bookmarked,
  onLikeClick,
  onBookmarkClick,
  onShare,
  onReport,
  className = '',
}: ArticleCommentItemProps) {
  return (
    <div className={`flex flex-col gap-4 w-full p-4 bg-background rounded-lg border border-swatch-border ${className}`}>
      {/* Bagian Atas: Avatar & AuthorMeta */}
      <div className="flex items-center gap-3">
        <Avatar src={avatarSrc} size="md" />
        <AuthorMeta author={author} date={date} />
      </div>

      {/* Bagian Tengah: Isi Teks Komentar / Artikel */}
      <Typography variant="body" className="text-text-primary">
        {content}
      </Typography>

      {/* Bagian Bawah: Aksi (Like, Comment, Bookmark, Share, Report) */}
      <ArticleActions
        likes={likes}
        comments={comments}
        liked={liked}
        onLikeClick={onLikeClick}
        bookmarked={bookmarked}
        onBookmarkClick={onBookmarkClick}
        onShare={onShare}
        onReport={onReport}
      />
    </div>
  );
}