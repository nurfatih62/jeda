"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ThumbsUp, MessageSquare, Bookmark, Share2, Flag } from "lucide-react";

import { Button } from "../../atom/button/button/button";
import { PaginationButton } from "../../atom/button/pagination-button/pagination-button";
import { PaginationNumberButton } from "../../atom/button/pagination-number-button/pagination-number-button";
import { PaginationEllipsis } from "../../atom/pagination-ellipsis/pagination-ellipsis";

export interface RecommendedArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  authorName: string;
  publishedDate: string;
  imageUrl: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  content: string;
  likesCount: number;
  repliesCount: number;
}

export interface ArticleDetailSectionProps {
  tags?: string[];
  authorName?: string;
  authorAvatar?: string;
  publishedDate?: string;
  title?: string;
  subtitle?: string;
  coverImage?: string;
  content?: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: CommentItem[];
  /** Varian status autentikasi */
  authStatus?: "guest" | "logged-in" | "author";
  /** List rekomendasi artikel untuk varian logged-in & author */
  recommendedArticles?: RecommendedArticle[];
  currentPage?: number;
  totalPages?: number;
  onBackClick?: () => void;
  onLikeClick?: () => void;
  onBookmarkClick?: () => void;
  onShareClick?: () => void;
  onReportClick?: () => void;
  onPageChange?: (page: number) => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  /** Judul banner ajakan gabung (varian guest, default ikut Figma) */
  guestBannerTitle?: string;
  /** Deskripsi banner ajakan gabung (varian guest, default ikut Figma) */
  guestBannerDescription?: string;
  /** Teks tombol outline banner guest (default: "Daftar") */
  guestSecondaryButtonText?: string;
  /** Teks tombol solid banner guest (default: "Masuk") */
  guestPrimaryButtonText?: string;
  onLoadMoreComments?: () => void;
  onArticleCardClick?: (id: string) => void;
  className?: string;
}

export const ArticleDetailSection: React.FC<ArticleDetailSectionProps> = ({
  tags = ["Makanan", "Wisata"],
  authorName = "Asya mc",
  authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  publishedDate = "15 Agustus 2026",
  title = "Lorem ipsum dolor sit amet",
  subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamIodu Ijijcaaijecaimai",
  coverImage = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80",
  content = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
  likesCount = 237,
  commentsCount = 12,
  comments = [
    {
      id: "1",
      authorName: "Asya mc",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      date: "15 Agustus 2026",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      likesCount: 237,
      repliesCount: 12,
    },
  ],
  authStatus = "guest",
  recommendedArticles = [
    {
      id: "rec-1",
      category: "Makanan",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
      authorName: "Asya mc",
      publishedDate: "15 Agustus 2026",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "rec-2",
      category: "Makanan",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
      authorName: "Asya mc",
      publishedDate: "15 Agustus 2026",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "rec-3",
      category: "Makanan",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
      authorName: "Asya mc",
      publishedDate: "15 Agustus 2026",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
  ],
  currentPage = 1,
  totalPages = 3,
  onBackClick,
  onLikeClick,
  onBookmarkClick,
  onShareClick,
  onReportClick,
  onPageChange,
  onLoginClick,
  onRegisterClick,
  guestBannerTitle = "Bergabung untuk mendapat pengalaman lebih",
  guestBannerDescription = "Bergabung untuk mendapat artikel terkait lainnya dan interaksi dengan artikel",
  guestSecondaryButtonText = "Daftar",
  guestPrimaryButtonText = "Masuk",
  onLoadMoreComments,
  onArticleCardClick,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-309 mx-auto px-4 py-8 flex flex-col items-center gap-10 font-['Poppins'] ${className}`}>
      
      {/* Tombol Back & Baris Tags */}
      <div className="w-full max-w-284 flex flex-col gap-6">
        <button
          type="button"
          onClick={onBackClick}
          className="w-10 h-10 flex items-center justify-center rounded-full text-btn-hover hover:bg-btn-hover/10 transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={24} />
        </button>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-[39px] py-2 rounded-full bg-linear-to-b from-black/20 to-black/20 bg-[#146C5D] text-white font-medium text-base shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Header Artikel */}
      <div className="w-full max-w-284 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {authorAvatar && (
              <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
            )}
          </div>
          <div className="flex items-center gap-2 text-btn-hover/75 font-medium text-base">
            <span className="font-bold text-btn-hover/75">{authorName}</span>
            <span className="w-1 h-1 rounded-full bg-[#198876]" />
            <span>{publishedDate}</span>
          </div>
        </div>

        <h1 className="text-[36px] leading-[26px] font-bold text-btn-hover">
          {title}
        </h1>

        <p className="text-[20px] leading-6 font-medium text-btn-hover/75">
          {subtitle}
        </p>
      </div>

      {/* Gambar Sampul */}
      <div className="w-full max-w-250 h-75 sm:h-112.5 md:h-131.25 relative rounded-md overflow-hidden shadow-sm bg-gray-100">
        <Image src={coverImage} alt={title} fill className="object-cover" priority />
      </div>

      {/* Konten Teks Artikel */}
      <div className="w-full max-w-265.5 flex flex-col gap-6 text-btn-hover text-[20px] leading-6 font-medium whitespace-pre-line">
        {content}
      </div>

      {/* Pagination */}
      <div className="w-full max-w-268.5 flex justify-center items-center gap-3 pt-4">
        <PaginationButton
          direction="prev"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        />
        <PaginationNumberButton
          page={1}
          active={currentPage === 1}
          onClick={() => onPageChange?.(1)}
        />
        {totalPages > 1 && (
          <PaginationNumberButton
            page={2}
            active={currentPage === 2}
            onClick={() => onPageChange?.(2)}
          />
        )}
        {totalPages > 3 && <PaginationEllipsis onJump={(page: number) => onPageChange?.(page)} />}
        {totalPages > 2 && (
          <PaginationNumberButton
            page={totalPages}
            active={currentPage === totalPages}
            onClick={() => onPageChange?.(totalPages)}
          />
        )}
        <PaginationButton
          direction="next"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        />
      </div>

      {/* Baris Interaksi Artikel */}
      <div className="w-full max-w-258.5 flex flex-col gap-4 my-2">
        <div className="w-full h-px bg-btn-hover" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onLikeClick}
              className="flex items-center gap-2 text-btn-hover hover:opacity-80 transition-opacity font-medium text-base"
            >
              <ThumbsUp size={24} className="stroke-2" />
              <span>{likesCount}</span>
            </button>
            <div className="flex items-center gap-2 text-btn-hover font-medium text-base">
              <MessageSquare size={24} className="stroke-2" />
              <span>{commentsCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBookmarkClick}
              className="text-btn-hover hover:opacity-80 transition-opacity"
              aria-label="Simpan Artikel"
            >
              <Bookmark size={24} className="stroke-2" />
            </button>
            <button
              type="button"
              onClick={onShareClick}
              className="text-btn-hover hover:opacity-80 transition-opacity"
              aria-label="Bagikan"
            >
              <Share2 size={24} className="stroke-2" />
            </button>
            <button
              type="button"
              onClick={onReportClick}
              className="text-btn-hover hover:opacity-80 transition-opacity"
              aria-label="Laporkan"
            >
              <Flag size={24} className="stroke-2" />
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-btn-hover" />
      </div>

      {/* BANNER AJAKAN GABUNG — hanya untuk guest (sesuai Figma Frame 117/42) */}
      {authStatus === "guest" && (
        <div className="w-full max-w-268.5 flex flex-col items-center text-center gap-3 py-4">
          <h2 className="font-bold text-[32px] leading-8 text-btn-hover m-0">
            {guestBannerTitle}
          </h2>
          <p className="font-medium text-[20px] leading-7 text-btn-hover/75 m-0">
            {guestBannerDescription}
          </p>
          <div className="flex flex-row justify-center items-center gap-3 mt-3">
            <Button
              variant="outline"
              onClick={onRegisterClick}
              className="w-20.75"
            >
              {guestSecondaryButtonText}
            </Button>
            <Button
              variant="solid"
              onClick={onLoginClick}
              className="w-24.5"
            >
              {guestPrimaryButtonText}
            </Button>
          </div>
        </div>
      )}

      {/* MENAMPILKAN REKOMENDASI ARTIKEL JIKA USER SUDAH LOGGED-IN / AUTHOR */}
      {authStatus !== "guest" && (
        <div className="w-full max-w-[1131px] flex flex-col gap-[21px] my-6">
          <h3 className="font-bold text-[20px] leading-7 text-[rgba(27,78,70,0.75)]">
            Rekomendasi artikel terkait
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[39px] justify-items-center">
            {recommendedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onArticleCardClick?.(article.id)}
                className="w-[351px] h-[408px] bg-white border border-[rgba(16,29,19,0.16)] rounded-[16px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)] py-[27px] px-0 flex flex-col items-center justify-start gap-[20px] cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="w-full flex flex-col items-center gap-[20px]">
                  {/* Rectangle 24 (Gambar Card) */}
                  <div className="relative w-[253px] h-[165px] rounded-[8px] overflow-hidden shrink-0">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Frame Content Card */}
                  <div className="w-[321px] flex flex-col items-start gap-0">
                    {/* Category Tag */}
                    <span className="text-[#101D13] font-normal text-sm h-[28px] flex items-center px-[13px]">
                      {article.category}
                    </span>

                    {/* Title & Description */}
                    <div className="w-[321px] p-[10px] flex flex-col items-start">
                      <div className="flex flex-col items-start gap-0 w-[301px]">
                        <h4 className="font-bold text-[18px] leading-[28px] text-[#101D13] line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="font-normal text-[14px] leading-[28px] text-[rgba(27,78,70,0.75)] line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                    </div>

                    {/* Author & Date Meta */}
                    <div className="flex items-center gap-[2px]">
                      <span className="font-bold text-[14px] leading-[28px] text-[rgba(27,78,70,0.75)]">
                        {article.authorName}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#198876]" />
                      <span className="font-medium text-[12px] leading-[28px] text-[rgba(27,78,70,0.75)]">
                        {article.publishedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bagian Komentar */}
      <div className="w-full max-w-237 flex flex-col gap-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="w-full bg-[#FBF8F2] border border-btn-hover/10 rounded-lg p-5 flex flex-col gap-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                {comment.authorAvatar && (
                  <Image
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-btn-hover/75 text-base">{comment.authorName}</span>
                  <span className="w-1 h-1 rounded-full bg-[#198876]" />
                  <span className="text-btn-hover/75 font-medium text-sm">{comment.date}</span>
                </div>
                <p className="text-btn-hover/75 font-medium text-base leading-6">
                  {comment.content}
                </p>
              </div>
            </div>

            {/* Sub-baris interaksi komentar */}
            <div className="flex items-center justify-between pt-2 border-t border-btn-hover/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-btn-hover/75 font-medium text-base">
                  <ThumbsUp size={20} className="stroke-2" />
                  <span>{comment.likesCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-btn-hover/75 font-medium text-base">
                  <MessageSquare size={20} className="stroke-2" />
                  <span>{comment.repliesCount}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-btn-hover/75 hover:opacity-80 transition-opacity"
                  aria-label="Bagikan Komentar"
                >
                  <Share2 size={20} className="stroke-2" />
                </button>
                <button
                  type="button"
                  className="text-btn-hover/75 hover:opacity-80 transition-opacity"
                  aria-label="Laporkan Komentar"
                >
                  <Flag size={20} className="stroke-2" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Tombol Muat Lebih Banyak Komentar */}
        <div className="flex justify-center mt-2">
          <Button variant="solid" onClick={onLoadMoreComments} className="px-8 min-w-65.75">
            Lihat lebih banyak komentar
          </Button>
        </div>
      </div>

    </div>
  );
};

ArticleDetailSection.displayName = "ArticleDetailSection";

export default ArticleDetailSection;