"use client";

import { Heart, MessageCircle, Share2, Flag } from "lucide-react";

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
        className="flex items-center gap-1 text-text-muted"
      >
        <Heart size={18} strokeWidth={2} />
        <span>{likes}</span>
      </button>

      {/* COMMENT */}
      <button
        type="button"
        className="flex items-center gap-1 text-text-muted"
      >
        <MessageCircle size={18} strokeWidth={2} />
        <span>{comments}</span>
      </button>

      {/* SHARE */}
      <button
        type="button"
        onClick={onShare}
        className="text-text-muted"
      >
        <Share2 size={18} strokeWidth={2} />
      </button>

      {/* REPORT */}
      <button
        type="button"
        onClick={onReport}
        className="text-text-muted"
      >
        <Flag size={18} strokeWidth={2} />
      </button>
    </div>
  );
}