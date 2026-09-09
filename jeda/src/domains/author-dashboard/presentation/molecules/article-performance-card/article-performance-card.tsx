"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export interface ArticlePerformanceCardProps {
  /** Jumlah views (misal: "2.4K") */
  views?: string | number;
  /** Label teks views (default: "Views") */
  viewsLabel?: string;
  /** Jumlah likes (misal: "318") */
  likes?: string | number;
  /** Label teks likes (default: "Likes") */
  likesLabel?: string;
  /** Jumlah komentar (misal: "47") */
  comments?: string | number;
  /** Label teks komentar (default: "Komentar") */
  commentsLabel?: string;
  /** Teks persentase pertumbuhan di kiri bawah (default: "12% dari minggu lalu") */
  growthText?: string;
  /** Teks tautan underline di kanan bawah (default: "12% dari minggu lalu") */
  footerLinkText?: string;
  /** Callback ketika tautan kanan bawah diklik */
  onFooterLinkClick?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ArticlePerformanceCard: React.FC<ArticlePerformanceCardProps> = ({
  views = "2.4K",
  viewsLabel = "Views",
  likes = "318",
  likesLabel = "Likes",
  comments = "47",
  commentsLabel = "Komentar",
  growthText = "12% dari minggu lalu",
  footerLinkText = "12% dari minggu lalu",
  onFooterLinkClick,
  className = "",
}) => {
  return (
    <div
      className={`
        box-border flex flex-col justify-center items-start
        w-full max-w-[958px] gap-[27px] p-0
        ${className}
      `}
    >
      {/* Statistik di homepage */}
      <div
        className="
          box-border flex flex-col items-start
          w-full max-w-[637px] h-[177.01px] bg-[#FBF8F2] rounded-[8px]
          px-[42px] py-[31px] gap-[10px]
        "
      >
        {/* Frame 238440 */}
        <div className="flex flex-col items-start w-full max-w-[553px] h-[115.01px] gap-[16px]">
          {/* Frame 238438 */}
          <div className="flex flex-col items-center w-full max-w-[553px] h-[75.01px] gap-[17px]">
            {/* Frame 238437 */}
            <div className="flex flex-row items-end justify-between w-full max-w-[517px] h-[58.01px]">
              {/* Views (Frame 238433) */}
              <div className="flex flex-col items-start w-[56px] h-[55px] gap-[5px]">
                <span className="w-[56px] h-[26px] font-['Poppins'] font-bold text-[24px] leading-[26px] text-center text-[#1B4E46]">
                  {views}
                </span>
                <span className="w-[56px] h-[24px] font-['Poppins'] font-medium text-[16px] leading-[24px] text-center text-[rgba(27,78,70,0.75)]">
                  {viewsLabel}
                </span>
              </div>

              {/* Line 11 (Pemisah Vertikal 1) */}
              <div className="w-[58.01px] h-[0px] border border-[#1B4E46] rotate-[-90deg] self-center" />

              {/* Likes (Frame 238434) */}
              <div className="flex flex-col justify-center items-center w-[56px] h-[55px] gap-[5px]">
                <span className="w-[56px] h-[26px] font-['Poppins'] font-bold text-[24px] leading-[26px] text-center text-[#1B4E46]">
                  {likes}
                </span>
                <span className="w-[56px] h-[24px] font-['Poppins'] font-medium text-[16px] leading-[24px] text-center text-[rgba(27,78,70,0.75)]">
                  {likesLabel}
                </span>
              </div>

              {/* Line 12 (Pemisah Vertikal 2) */}
              <div className="w-[58.01px] h-[0px] border border-[#1B4E46] rotate-[-90deg] self-center" />

              {/* Komentar (Frame 238435) */}
              <div className="flex flex-col items-center w-[89px] h-[55px] gap-[5px]">
                <span className="w-[89px] h-[26px] font-['Poppins'] font-bold text-[24px] leading-[26px] text-center text-[#1B4E46]">
                  {comments}
                </span>
                <span className="w-[101px] h-[24px] font-['Poppins'] font-medium text-[16px] leading-[24px] text-center text-[rgba(27,78,70,0.75)] -ml-[6px]">
                  {commentsLabel}
                </span>
              </div>
            </div>

            {/* Line 10 (Garis Horizontal) */}
            <div className="w-full max-w-[553px] h-[0px] border border-[#1B4E46]" />
          </div>

          {/* Frame 238439 (Bagian Bawah: Indikator & Link) */}
          <div className="flex flex-row items-center justify-between w-full max-w-[553px] h-[24px]">
            {/* Frame 238436 (Indikator Kiri) */}
            <div className="flex flex-row items-center w-[216px] h-[24px] gap-[14px]">
              <div className="w-[24px] h-[24px] flex items-center justify-center text-[#1B4E46]">
                <ArrowUp className="w-6 h-6" />
              </div>
              <span className="w-[192px] h-[24px] font-['Poppins'] font-bold text-[16px] leading-[24px] text-center text-[#1B4E46]">
                {growthText}
              </span>
            </div>

            {/* Teks Kanan Bawah (Underline) */}
            {footerLinkText && (
              <button
                type="button"
                onClick={onFooterLinkClick}
                className="w-[192px] h-[24px] font-['Poppins'] font-normal text-[14px] leading-[24px] text-center underline text-[#1B4E46] bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity"
              >
                {footerLinkText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ArticlePerformanceCard.displayName = "ArticlePerformanceCard";

export default ArticlePerformanceCard;