"use client";

import React from "react";
import { IconButton } from "../../atom/icon/icon button/icon";

export interface InteractionToolbarProps {
  /** Jumlah likes */
  likeCount?: number | string;
  /** Jumlah komentar */
  commentCount?: number | string;
  /** Status apakah artikel sudah di-like */
  isLiked?: boolean;
  /** Status apakah artikel sudah disimpan */
  isSaved?: boolean;
  /** Status apakah artikel sudah dilaporkan */
  isReported?: boolean;
  /** Callback saat tombol like diklik */
  onLikeClick?: () => void;
  /** Callback saat tombol comment diklik */
  onCommentClick?: () => void;
  /** Callback saat tombol save diklik */
  onSaveClick?: () => void;
  /** Callback saat tombol share diklik */
  onShareClick?: () => void;
  /** Callback saat tombol report diklik */
  onReportReportClick?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const InteractionToolbar: React.FC<InteractionToolbarProps> = ({
  likeCount = 237,
  commentCount = 14,
  isLiked = false,
  isSaved = false,
  isReported = false,
  onLikeClick,
  onCommentClick,
  onSaveClick,
  onShareClick,
  onReportReportClick,
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-row justify-between items-center w-full max-w-170.25 h-10
        ${className}
      `}
    >
      {/* Sisi Kiri: Like & Comment */}
      <div className="flex flex-row items-center gap-4.25 h-10">
        {/* Like Group */}
        <div className="flex flex-row items-center">
          <IconButton
            variant="like"
            active={isLiked}
            onClick={onLikeClick}
            ariaLabel="Like button"
          />
          <span
            className="font-['Poppins'] font-medium text-[16px] leading-6 text-btn-hover ml-1"
          >
            {likeCount}
          </span>
        </div>

        {/* Comment Group */}
        <div className="flex flex-row items-center">
          <IconButton
            variant="comment"
            onClick={onCommentClick}
            ariaLabel="Comment button"
          />
          <span
            className="font-['Poppins'] font-medium text-[16px] leading-6 text-btn-hover ml-1"
          >
            {commentCount}
          </span>
        </div>
      </div>

      {/* Sisi Kanan: Save, Share, Report */}
      <div className="flex flex-row items-center gap-3.25">
        <IconButton
          variant="save"
          active={isSaved}
          onClick={onSaveClick}
          ariaLabel="Save button"
        />
        <IconButton
          variant="share"
          onClick={onShareClick}
          ariaLabel="Share button"
        />
        <IconButton
          variant="report"
          active={isReported}
          onClick={onReportReportClick}
          ariaLabel="Report button"
        />
      </div>
    </div>
  );
};