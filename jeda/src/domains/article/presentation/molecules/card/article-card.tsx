"use client";

import React from "react";
import { Avatar } from "@/shared/atoms/avatar/avatar";
import { ArticleBadge, ArticleBadgeVariant } from "@/domains/article/presentation/atoms/article-badge/article-badge";
import { AuthorInfo } from "@/domains/article/presentation/molecules/author-info/author-info";
import { ArticleContentCard } from "@/domains/article/presentation/molecules/article-content-card/article-content-card";
import { InteractionToolbar } from "@/domains/article/presentation/molecules/interaction-toolbar/interaction-toolbar";

// Tambahkan "none" untuk opsi tanpa badge
export type ArticleCardBadgeVariant = ArticleBadgeVariant | "none";

export interface ArticleCardProps {
  /** Variant badge (pilih "none" jika tidak ingin menampilkan badge) */
  badgeVariant?: ArticleCardBadgeVariant;
  /** Teks badge kustom (opsional) */
  badge?: string;
  /** Nama author/pembuat artikel */
  authorName: string;
  /** URL foto profil author */
  authorAvatar?: string;
  /** Tanggal publikasi artikel */
  date: string;
  /** Judul artikel */
  title: string;
  /** Ringkasan / deskripsi isi artikel */
  description: string;
  /** Jumlah suka */
  likesCount?: number | string;
  /** Jumlah komentar */
  commentsCount?: number | string;
  /** URL gambar thumbnail artikel di sebelah kanan */
  thumbnailUrl?: string;
  /** Opsi untuk menampilkan/menyembunyikan thumbnail */
  showThumbnail?: boolean;
  /** Tambahan kelas kustom untuk judul */
  titleClassName?: string;
  /** Tambahan kelas kustom untuk deskripsi */
  descriptionClassName?: string;
  /** Handler interaksi */
  onLike?: () => void;
  onComment?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  badgeVariant = "paling-banyak-dibaca",
  badge,
  authorName = "Asya mc",
  authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  date = "15 Agustus 2026",
  title = "Lorem ipsum dolor sit amet",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  likesCount = 237,
  commentsCount = 12,
  thumbnailUrl = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
  showThumbnail = true,
  titleClassName = "",
  descriptionClassName = "",
  onLike,
  onComment,
  onBookmark,
  onShare,
  onReport,
  className = "",
}) => {
  // Cek apakah badge harus ditampilkan
  const showBadge = badgeVariant && badgeVariant !== "none";
  const shouldShowThumbnail = showThumbnail && Boolean(thumbnailUrl);

  return (
    <div
      className={`
        box-border flex flex-col sm:flex-row justify-between items-start sm:items-center 
        px-4.75 py-7 gap-5 w-full max-w-284 min-h-63.25 h-auto 
        bg-[#FBF8F2] border border-btn-hover/52 rounded-lg 
        transition-all duration-200 hover:shadow-sm ${className}
      `}
    >
      {/* Sisi Kiri: Avatar, Metadata, Judul, Deskripsi & Aksi */}
      <div className="flex flex-row items-start gap-4 flex-1 h-full w-full min-w-0">
        {/* Avatar Author */}
        <Avatar
          src={authorAvatar}
          alt={authorName}
          size="sm"
          className="shrink-0 mt-1"
        />

        {/* Konten Utama */}
        <div className="flex flex-col justify-between flex-1 h-full gap-4 min-w-0">
          <div className="flex flex-col gap-2.5">
            {/* Badge & Metadata (Author & Tanggal) */}
            <div className="flex flex-col gap-1.5">
              {showBadge && (
                <ArticleBadge variant={badgeVariant as ArticleBadgeVariant} label={badge} />
              )}
              <AuthorInfo authorName={authorName} date={date} />
            </div>

            {/* Judul & Deskripsi */}
            <ArticleContentCard
              title={title}
              description={description}
              titleClassName={titleClassName}
              descriptionClassName={descriptionClassName}
            />
          </div>

          {/* Baris Aksi Bawah */}
          <InteractionToolbar
            likeCount={likesCount}
            commentCount={commentsCount}
            onLikeClick={onLike}
            onCommentClick={onComment}
            onSaveClick={onBookmark}
            onShareClick={onShare}
            onReportReportClick={onReport}
          />
        </div>
      </div>

      {/* Sisi Kanan: Gambar Thumbnail */}
      {shouldShowThumbnail && (
        <img
          src={thumbnailUrl}
          alt="Thumbnail Artikel"
          className="w-full sm:w-63.25 h-41.25 rounded-lg object-cover shrink-0"
        />
      )}
    </div>
  );
};