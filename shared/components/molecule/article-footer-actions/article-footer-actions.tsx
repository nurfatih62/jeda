"use client";

import React from 'react';
import { Bookmark, Share2, Flag } from 'lucide-react';
import { Engagement } from '../engagement/engagement';
import { IconButton } from '../../atom/button/icon-button';

export interface ArticleFooterActionsProps {
  likes: number;
  comments: number;
  liked?: boolean;
  onLikeClick?: () => void;
  bookmarked?: boolean;
  onBookmarkClick?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  className?: string;
  isLoggedIn?: boolean;
}

const ghostIconClass =
  'p-0 text-text-muted hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary-border';

export function ArticleFooterActions({
  likes,
  comments,
  liked,
  onLikeClick,
  bookmarked = false,
  onBookmarkClick,
  onShare,
  onReport,
  className = '',
  isLoggedIn = false,
}: ArticleFooterActionsProps) {
  return (
    <div className={`flex flex-col items-center w-full gap-[28px] ${className}`}>
      {/* Garis Pembatas Atas */}
      <hr className="w-full border-t border-text-primary m-0" />

      {/* Konten Utama (Menggunakan komponen Engagement & IconButton yang sudah ada) */}
      <div className="flex items-center justify-between w-full px-1">
        <Engagement likes={likes} comments={comments} liked={liked} onLikeClick={onLikeClick} />
        
        <div className="flex items-center gap-6-75">
          {isLoggedIn ? <IconButton
            icon={
              <Bookmark
                size={24}
                strokeWidth={2}
                className={bookmarked ? 'fill-primary text-primary' : 'fill-none'}
              />
            }
            aria-label={bookmarked ? 'Batalkan simpan artikel' : 'Simpan artikel'}
            variant="ghost"
            className={ghostIconClass}
            onClick={onBookmarkClick}
          /> : null}
          <IconButton
            icon={<Share2 size={24} strokeWidth={2} />}
            aria-label="Bagikan"
            variant="ghost"
            className={ghostIconClass}
            onClick={onShare}
          />
          {isLoggedIn ? <IconButton
            icon={<Flag size={24} strokeWidth={2} />}
            aria-label="Laporkan"
            variant="ghost"
            className={ghostIconClass}
            onClick={onReport}
          /> : null}
        </div>
      </div>

      {/* Garis Pembatas Bawah */}
      <hr className="w-full border-t border-text-primary m-0" />
    </div>
  );
}