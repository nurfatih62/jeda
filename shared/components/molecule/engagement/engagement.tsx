"use client";

import React from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export interface EngagementProps {
  likes: number;
  comments: number;
  /** Status sudah di-like atau belum. Kalau true, icon like terisi warna. */
  liked?: boolean;
  /** Dipanggil saat tombol like diklik. */
  onLikeClick?: () => void;
  /** Dipanggil saat bagian komentar diklik. */
  onCommentClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const iconBase = 'h-6 w-6 transition-colors';
const countClass = "font-sans text-base font-medium leading-6";

export function Engagement({ 
  likes, 
  comments, 
  liked = false, 
  onLikeClick, 
  onCommentClick 
}: EngagementProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Tombol Like */}
      <button
        type="button"
        onClick={onLikeClick}
        aria-pressed={liked}
        aria-label={liked ? 'Batalkan suka artikel ini' : 'Suka artikel ini'}
        className="flex items-center gap-1.5 rounded-md cursor-pointer bg-transparent border-none outline-none"
      >
        <ThumbsUp
          className={`${iconBase} ${liked ? 'fill-primary-hover text-primary-hover' : 'fill-none text-text-muted'}`}
          strokeWidth={2}
        />
        <span className={`${countClass} ${liked ? 'text-primary-hover' : 'text-text-muted'}`}>
          {likes}
        </span>
      </button>

      {/* Tombol Komentar (Sekarang Interaktif) */}
      <button
        type="button"
        onClick={onCommentClick}
        aria-label="Lihat komentar artikel ini"
        className="flex items-center gap-1.5 rounded-md cursor-pointer bg-transparent border-none outline-none group hover:opacity-80 transition-opacity"
      >
        <MessageSquare className={`${iconBase} text-text-muted group-hover:text-primary`} strokeWidth={2} />
        <span className={`${countClass} text-text-muted group-hover:text-primary`}>
          {comments}
        </span>
      </button>
    </div>
  );
}