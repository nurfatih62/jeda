"use client";

import { Bookmark, Share2, Flag } from 'lucide-react';
import { Engagement } from '../engagement/engagement';
import { IconButton } from '../../atom/button/icon-button';

export interface ArticleActionsProps {
  likes: number;
  comments: number;
  liked?: boolean;
  onLikeClick?: () => void;
  bookmarked?: boolean;
  onBookmarkClick?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

const ghostIconClass =
  'p-0 text-text-muted hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary-border';

export function ArticleActions({
  likes,
  comments,
  liked,
  onLikeClick,
  bookmarked = false,
  onBookmarkClick,
  onShare,
  onReport,
}: ArticleActionsProps) {
  return (
    <div className="flex items-center gap-gap">
      <Engagement likes={likes} comments={comments} liked={liked} onLikeClick={onLikeClick} />
      <span className="flex-1" />
      <IconButton
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
      />
      <IconButton
        icon={<Share2 size={24} strokeWidth={2} />}
        aria-label="Bagikan"
        variant="ghost"
        className={ghostIconClass}
        onClick={onShare}
      />
      <IconButton
        icon={<Flag size={24} strokeWidth={2} />}
        aria-label="Laporkan"
        variant="ghost"
        className={ghostIconClass}
        onClick={onReport}
      />
    </div>
  );
}