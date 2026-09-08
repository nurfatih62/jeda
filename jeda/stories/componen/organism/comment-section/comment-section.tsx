"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { InputComment } from "../../atom/input/input-comment/input-comment";
import { IconButton } from "../../atom/icon/icon button/icon";
import { Dropdown, DropdownOption } from "../../atom/dropdown/dropdown";

export interface CommentItemProps {
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
  /** Daftar balasan komentar (nested) */
  replies?: CommentItemProps[];
}

export interface CommentSectionProps {
  totalComments?: number;
  userInitial?: string;
  filterOptions?: DropdownOption[];
  selectedFilter?: string | number;
  comments?: CommentItemProps[];
  onBackClick?: () => void;
  onSubmitComment?: (commentText: string) => void;
  onFilterChange?: (value: string | number) => void;
  onLikeComment?: (commentId?: string | number) => void;
  onReplyComment?: (commentId?: string | number) => void;
  onShareComment?: (commentId?: string | number) => void;
  onReportComment?: (commentId?: string | number) => void;
  onSaveComment?: (commentId?: string | number) => void;
  className?: string;
}

// Sub-komponen untuk merender tiap item komentar & balasan
const SingleCommentCard: React.FC<{
  comment: CommentItemProps;
  onLikeComment?: (id?: string | number) => void;
  onReplyComment?: (id?: string | number) => void;
  onShareComment?: (id?: string | number) => void;
  onReportComment?: (id?: string | number) => void;
  onSaveComment?: (id?: string | number) => void;
  depth?: number;
}> = ({
  comment,
  onLikeComment,
  onReplyComment,
  onShareComment,
  onReportComment,
  onSaveComment,
  depth = 0,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Box Komentar */}
      <div className="w-full bg-[#FFFDF5] border border-[#1B4E46]/10 rounded-xl p-5 flex flex-col gap-3 transition-colors duration-150">
        {/* Header Penulis */}
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

        {/* Gambar Lampiran */}
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

        {/* Teks Komentar */}
        <p className="text-sm font-medium text-[#1B4E46]/80 leading-relaxed m-0">
          {comment.text}
        </p>

        {/* Action Bar */}
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
            {/* Tombol Bookmark (Hanya muncul jika komentar utama / depth === 0) */}
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

      {/* Render Balasan Komentar (Nested Replies) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-8 border-l-2 border-[#1B4E46]/10 flex flex-col gap-3 mt-1">
          {comment.replies.map((reply, index) => (
            <SingleCommentCard
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

export const CommentSection: React.FC<CommentSectionProps> = ({
  totalComments = 5,
  userInitial = "JD",
  filterOptions,
  selectedFilter = "Populer",
  comments = [],
  onBackClick,
  onSubmitComment,
  onFilterChange,
  onLikeComment,
  onReplyComment,
  onShareComment,
  onReportComment,
  onSaveComment,
  className = "",
}) => {
  const [commentText, setCommentText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (commentText.trim()) {
        onSubmitComment?.(commentText);
        setCommentText("");
      }
    }
  };

  return (
    <section
      className={`w-full max-w-285.75 mx-auto flex flex-col items-start gap-6 font-['Poppins'] ${className}`}
    >
      <div>
        <IconButton
          variant="arrowLeft"
          onClick={onBackClick}
          ariaLabel="Kembali"
        />
      </div>

      <h1 className="text-[32px] font-bold text-btn-hover m-0 flex items-center gap-2 leading-none">
        Komentar <span className="text-btn-hover/60">({totalComments})</span>
      </h1>

      <div className="w-full flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-btn-hover text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {userInitial}
        </div>

        <div className="flex-1">
          <InputComment
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCommentText(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Tulis komentar..."
            className="w-full"
          />
        </div>
      </div>

      <div className="w-45">
        <Dropdown
          variant="filter"
          options={filterOptions}
          value={selectedFilter}
          onSelect={onFilterChange}
        />
      </div>

      <div className="w-full max-w-270.75 flex flex-col items-start gap-4">
        {comments.map((comment, index) => (
          <SingleCommentCard
            key={comment.id ?? index}
            comment={comment}
            onLikeComment={onLikeComment}
            onReplyComment={onReplyComment}
            onShareComment={onShareComment}
            onReportComment={onReportComment}
            onSaveComment={onSaveComment}
            depth={0}
          />
        ))}
      </div>
    </section>
  );
};

CommentSection.displayName = "CommentSection";

export default CommentSection;