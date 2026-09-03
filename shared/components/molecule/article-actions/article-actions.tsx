"use client";

import { Bookmark, Share2, Flag } from 'lucide-react';
import { Engagement } from '../engagement/engagement';
import { IconButton } from '../../atom/button/icon-button';

export interface ArticleActionsProps {
  likes: number;
  comments: number;
  liked?: boolean;
  onLikeClick?: () => void;
  onCommentClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Tambahan prop comment click
  bookmarked?: boolean;
  onBookmarkClick?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  isLoggedIn?: boolean; 
  onRequireLogin?: () => void; 
  hideBookmark?: boolean;
  hideReport?: boolean;
}

const ghostIconClass =
  'p-0 text-text-muted hover:bg-transparent hover:text-primary active:bg-transparent active:text-primary-border';

export function ArticleActions({
  likes,
  comments,
  liked,
  onLikeClick,
  onCommentClick,
  bookmarked = false,
  onBookmarkClick,
  onShare,
  onReport,
  isLoggedIn = false,
  onRequireLogin,
  hideBookmark = false,
  hideReport = false,
}: ArticleActionsProps) {
  
  const handleProtectedAction = (action?: () => void) => {
    if (!isLoggedIn) {
      if (onRequireLogin) onRequireLogin();
      else alert('Silakan masuk terlebih dahulu untuk melakukan aksi ini.');
      return;
    }
    if (action) action();
  };

  return (
    <div className="flex items-center gap-gap">
      {/* Engagement mencakup Like dan Komentar */}
      <Engagement 
        likes={likes} 
        comments={comments} 
        liked={liked} 
        onLikeClick={() => handleProtectedAction(onLikeClick)} 
        onCommentClick={onCommentClick}
      />
      <span className="flex-1" />
      
      {/* Bookmark */}
      {!hideBookmark && <IconButton
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
        onClick={() => handleProtectedAction(onBookmarkClick)}
      />}
      
      {/* Share (Bisa diakses tanpa login) */}
      <IconButton
        icon={<Share2 size={24} strokeWidth={2} />}
        aria-label="Bagikan"
        variant="ghost"
        className={ghostIconClass}
        onClick={onShare}
      />

      {/* Report */}
      {!hideReport && <IconButton
        icon={<Flag size={24} strokeWidth={2} />}
        aria-label="Laporkan"
        variant="ghost"
        colorState={isLoggedIn ? 'danger' : 'default'}
        className={ghostIconClass}
        onClick={() => handleProtectedAction(onReport)}
      />}
    </div>
  );
}