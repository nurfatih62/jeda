"use client";

import React, { useState } from 'react';
import { Avatar } from '../../atom/avatar/avatar';
import { AuthorMeta } from '../author-meta/author-meta';
import { ArticleActions } from '../article-actions/article-actions';
import { Typography } from '../../typography/typography';

export interface ArticleCommentItemProps {
  avatarSrc?: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  liked?: boolean;
  bookmarked?: boolean;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onBookmarkClick?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  className?: string;
  isReply?: boolean; // Penanda apakah ini komentar balasan
  isLoggedIn?: boolean;
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
  onCommentClick,
  onBookmarkClick,
  onShare,
  onReport,
  className = '',
  isReply = false,
  isLoggedIn = false,
}: ArticleCommentItemProps) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localLiked, setLocalLiked] = useState(liked);
  return (
    <div 
      className={`flex flex-col w-full ${
        isReply 
          ? 'ml-8 sm:ml-12 border-l-2 border-swatch-border pl-4 mt-3' 
          : 'mb-4'
      }`}
    >
      <div className={`flex flex-col gap-4 w-full p-4 bg-background rounded-lg border border-swatch-border ${className}`}>
        {/* Bagian Atas: Avatar & AuthorMeta */}
        <div className="flex items-center gap-3">
          <Avatar src={avatarSrc} size="md" />
          <AuthorMeta author={author} date={date} />
        </div>

        {/* Bagian Tengah: Isi Teks Komentar */}
        <Typography variant="body" className="text-text-primary">
          {content}
        </Typography>

        {/* Bagian Bawah: Aksi (Like, Comment, Bookmark, Share, Report) */}
        <ArticleActions
          likes={localLikes}
          comments={comments}
          liked={localLiked}
          onLikeClick={() => {
            if (isLoggedIn) {
              setLocalLikes((value) => value + (localLiked ? -1 : 1));
              setLocalLiked((value) => !value);
            }
            onLikeClick?.();
          }}
          onCommentClick={onCommentClick}
          bookmarked={bookmarked}
          onBookmarkClick={onBookmarkClick}
          onShare={onShare}
          onReport={onReport}
          isLoggedIn={isLoggedIn}
          hideBookmark
          hideReport={!isLoggedIn}
          onRequireLogin={() => {
            window.location.href = '/login';
          }}
        />
      </div>
    </div>
  );
}