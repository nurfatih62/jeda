"use client";

import React, { useState } from "react";
import { InputComment } from "@/domains/article/presentation/atoms/input-comment/input-comment";
import { IconButton } from "@/shared/atoms/icon/icon button/icon";
import { Dropdown, DropdownOption } from "@/shared/atoms/dropdown/dropdown";
import { CommentCard, CommentCardData } from "@/domains/article/presentation/molecules/comment-card/comment-card";

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
          <CommentCard
            key={comment.id ?? index}
            comment={comment as CommentCardData}
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