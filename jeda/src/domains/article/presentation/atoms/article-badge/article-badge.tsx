"use client";

import React from "react";

export type ArticleBadgeVariant =
  | "paling-banyak-dibaca"
  | "trending"
  | "cocok-denganmu"
  | "terbaru"
  | "lanjutkan-membaca"
  | "draft";

export interface ArticleBadgeProps {
  /** Varian preset badge */
  variant?: ArticleBadgeVariant;
  /** Teks kustom (opsional, untuk override teks default varian) */
  label?: string;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

const badgeConfig: Record<
  ArticleBadgeVariant,
  { label: string; bgClass: string; textClass: string }
> = {
  "paling-banyak-dibaca": {
    label: "Paling banyak dibaca",
    bgClass: "bg-[#FEEAEA]",
    textClass: "text-[#FF4040]",
  },
  "trending": {
    label: "Trending",
    bgClass: "bg-[#FFECC4]",
    textClass: "text-[#FF8C00]",
  },
  "cocok-denganmu": {
    label: "Cocok denganmu",
    bgClass: "bg-[rgba(117,191,133,0.16)]",
    textClass: "text-[#408836]",
  },
  "terbaru": {
    label: "Terbaru",
    bgClass: "bg-[#D3EAFF]",
    textClass: "text-[#364B88]",
  },
  "lanjutkan-membaca": {
    label: "Lanjutkan membaca",
    bgClass: "bg-[#FEFBB5]",
    textClass: "text-[#D2CB00]",
  },
  "draft": {
    label: "Draft",
    bgClass: "bg-[#E0E0E0]",
    textClass: "text-[#424242]",
  },
};

export const ArticleBadge: React.FC<ArticleBadgeProps> = ({
  variant = "paling-banyak-dibaca",
  label,
  className = "",
}) => {
  const config = badgeConfig[variant] || badgeConfig["paling-banyak-dibaca"];
  const displayLabel = label || config.label;

  return (
    <div
      className={`
        flex flex-row justify-center items-center 
        w-45 h-5 px-1 py-0.5 gap-2.5 rounded-xs 
        ${config.bgClass} ${className}
      `}
    >
      <span
        className={`
          font-sans font-medium text-[12px] leading-4 
          flex items-center text-right ${config.textClass}
        `}
      >
        {displayLabel}
      </span>
    </div>
  );
};