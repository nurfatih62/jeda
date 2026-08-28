"use client";

import { Engagement } from '../engagement/engagement';
import { IconButton } from '../../atom/button/icon-button';
import { Share2, Flag } from 'lucide-react';

export interface ArticleActionsProps {
  likes: number;
  comments: number;
  liked?: boolean;
  onLikeClick?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

export function ArticleActions({
  likes,
  comments,
  liked,
  onLikeClick,
  onShare,
  onReport,
}: ArticleActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Engagement likes={likes} comments={comments} liked={liked} onLikeClick={onLikeClick} />
      <span className="flex-1" />
      <IconButton
        icon={<Share2 size={24} strokeWidth={2} />}
        aria-label="Bagikan"
        variant="ghost"
        className="p-0 text-text-muted hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary-border"
        onClick={onShare}
      />
      <IconButton
        icon={<Flag size={24} strokeWidth={2} />}
        aria-label="Laporkan"
        variant="ghost"
        className="p-0 text-text-muted hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary-border"
        onClick={onReport}
      />
    </div>
  );
}
