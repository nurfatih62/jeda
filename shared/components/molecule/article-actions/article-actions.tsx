"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
} from "lucide-react";

export interface ArticleActionsProps {
  likes: number;
  comments: number;
  onLike?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

export function ArticleActions({
  likes,
  comments,
  onLike,
  onShare,
  onReport,
}: ArticleActionsProps) {
  return (
    <div className="flex items-center gap-5">
      {/* LIKE */}
      <button
        type="button"
        onClick={onLike}
        aria-label={`Suka, ${likes} suka`}
        className="flex items-center gap-1 text-text-muted"
      >
        <Heart
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span aria-hidden="true">{likes}</span>
      </button>

      {/* COMMENT */}
      <button
        type="button"
        aria-label={`Komentar, ${comments} komentar`}
        className="flex items-center gap-1 text-text-muted"
      >
        <MessageCircle
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span aria-hidden="true">{comments}</span>
      </button>

      {/* SHARE */}
      <button
        type="button"
        onClick={onShare}
        aria-label="Bagikan artikel"
        className="text-text-muted"
      >
        <Share2
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {/* REPORT */}
      <button
        type="button"
        onClick={onReport}
        aria-label="Laporkan artikel"
        className="text-text-muted"
      >
        <Flag
          size={18}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}