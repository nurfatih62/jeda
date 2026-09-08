"use client";

import React from "react";

export interface ArticleContentCardProps {
  /** Judul artikel */
  title: string;
  /** Deskripsi / ringkasan isi artikel */
  description: string;
  /** Tambahan kelas kustom untuk elemen judul (misal: line-clamp-2) */
  titleClassName?: string;
  /** Tambahan kelas kustom untuk elemen deskripsi (misal: line-clamp-3) */
  descriptionClassName?: string;
  /** Tambahan kelas CSS opsional untuk kontainer */
  className?: string;
}

export const ArticleContentCard: React.FC<ArticleContentCardProps> = ({
  title = "Lorem ipsum dolor sit amet",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  titleClassName = "",
  descriptionClassName = "",
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col items-start gap-1.5 w-full max-w-178 
        ${className}
      `}
    >
      {/* Judul Artikel (Heading 24px) */}
      <h2
        className={`
          font-['Poppins'] font-bold text-[24px] leading-6.5 
          text-btn-hover m-0 self-stretch ${titleClassName}
        `}
      >
        {title}
      </h2>

      {/* Deskripsi Artikel (Paragraph 16px) */}
      <p
        className={`
          font-['Poppins'] font-medium text-[16px] leading-6 
          text-[rgba(27,78,70,0.75)] m-0 ${descriptionClassName}
        `}
      >
        {description}
      </p>
    </div>
  );
};