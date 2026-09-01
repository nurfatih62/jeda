"use client";

import { ThumbsUp, MessageSquare } from 'lucide-react';

export interface EngagementProps {
  likes: number;
  comments: number;
  /** Status sudah di-like atau belum. Kalau true, icon like terisi warna. */
  liked?: boolean;
  /** Dipanggil saat tombol like diklik. */
  onLikeClick?: () => void;
}

const iconBase = 'h-6 w-6 transition-colors';
const countClass = "font-sans text-base font-medium leading-6";

export function Engagement({ likes, comments, liked = false, onLikeClick }: EngagementProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onLikeClick}
        aria-pressed={liked}
        aria-label={liked ? 'Batalkan suka artikel ini' : 'Suka artikel ini'}
        className="flex items-center gap-1.5 rounded-md"
      >
        <ThumbsUp
          className={`${iconBase} ${liked ? 'fill-primary-hover text-primary-hover' : 'fill-none text-text-muted'}`}
          strokeWidth={2}
        />
        <span className={`${countClass} ${liked ? 'text-primary-hover' : 'text-text-muted'}`}>
          {likes}
        </span>
      </button>
      <span className="flex items-center gap-1.5">
        <MessageSquare className="h-6 w-6 text-text-muted" strokeWidth={2} />
        <span className={`${countClass} text-text-muted`}>{comments}</span>
      </span>
    </div>
  );
}