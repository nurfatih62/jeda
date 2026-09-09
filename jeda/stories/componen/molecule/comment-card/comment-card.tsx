"use client";

import React from "react";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { IconButton } from "../../atom/icon/icon button/icon";

export interface CommentCardData {
  id?: string | number;
  authorName: string;
  authorAvatar: string;
  date: string;
  text: string;
  thumbnailUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  replies?: CommentCardData[];
}

export interface CommentCardProps {
  /** Data komentar */
  comment: CommentCardData;
  /** Kedalaman nesting (0 = utama). Tombol bookmark hanya muncul di depth 0 */
  depth?: number;
  onLikeComment?: (id?: string | number) => void;
  onReplyComment?: (id?: string | number) => void;
  onShareComment?: (id?: string | number) => void;
  onReportComment?: (id?: string | number) => void;
  onSaveComment?: (id?: string | number) => void;
  className?: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  depth = 0,
  onLikeComment,
  onReplyComment,
  onShareComment,
  onReportComment,
  onSaveComment,
  className = "",
}) => {
  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      <div className="w-full bg-[#FFFDF5] border border-[#1B4E46]/10 rounded-xl p-5 flex flex-col gap-3 transition-colors duration-150">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src={comment.authorAvatar}
              alt={comment.authorName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#1B4E46]">
              {comment.authorName}
            </span>
            <span className="text-xs text-[#1B4E46]/60">•</span>
            <span className="text-xs text-[#1B4E46]/60">{comment.date}</span>
          </div>
        </div>

        {comment.thumbnailUrl && (
          <div className="relative w-full max-w-[280px] h-[160px] rounded-lg overflow-hidden border border-[#1B4E46]/10 my-1">
            <Image
              src={comment.thumbnailUrl}
              alt="Komentar lampiran"
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="text-sm font-medium text-[#1B4E46]/80 leading-relaxed m-0">
          {comment.text}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-[#1B4E46]/5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onLikeComment?.(comment.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1B4E46]/70 hover:text-[#1B4E46] transition-colors"
            >
              <IconButton
                variant="like"
                active={comment.isLiked}
                ariaLabel="Suka"
              />
              <span>{comment.likesCount ?? 0}</span>
            </button>

            <button
              type="button"
              onClick={() => onReplyComment?.(comment.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1B4E46]/70 hover:text-[#1B4E46] transition-colors"
            >
              <IconButton variant="comment" ariaLabel="Balas Komentar" />
              <span>{comment.commentsCount ?? 0}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {depth === 0 && (
              <button
                type="button"
                onClick={() => onSaveComment?.(comment.id)}
                aria-label="Simpan Bookmark"
                className="group flex h-10 w-10 items-center justify-center rounded-md p-2 transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
              >
                <Bookmark
                  size={24}
                  strokeWidth={2}
                  className={`transition-colors duration-150 group-hover:stroke-icon-save-default/50 ${
                    comment.isSaved
                      ? "stroke-icon-save-active fill-icon-save-active-fill"
                      : "stroke-icon-save-default fill-transparent"
                  }`}
                />
              </button>
            )}

            <IconButton
              variant="share"
              onClick={() => onShareComment?.(comment.id)}
              ariaLabel="Bagikan"
            />
            <IconButton
              variant="report"
              onClick={() => onReportComment?.(comment.id)}
              ariaLabel="Laporkan"
            />
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-8 border-l-2 border-[#1B4E46]/10 flex flex-col gap-3 mt-1">
          {comment.replies.map((reply, index) => (
            <CommentCard
              key={reply.id ?? index}
              comment={reply}
              onLikeComment={onLikeComment}
              onReplyComment={onReplyComment}
              onShareComment={onShareComment}
              onReportComment={onReportComment}
              onSaveComment={onSaveComment}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CommentCard.displayName = "CommentCard";

export default CommentCard;
