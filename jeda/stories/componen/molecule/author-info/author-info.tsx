"use client";

import React from "react";

export interface AuthorInfoProps {
  /** Nama author/pembuat artikel */
  authorName?: string;
  /** Tanggal publikasi artikel */
  date?: string;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  authorName = "Asya mc",
  date = "15 Agustus 2026",
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-row items-center gap-1.5 h-7 
        font-['Poppins'] text-[14px] leading-7 text-[rgba(27,78,70,0.75)]
        ${className}
      `}
    >
      {/* Nama Author */}
      <span className="font-bold text-center">
        {authorName}
      </span>

      {/* Titik Pemisah (Ellipse 1) */}
      <span className="w-1 h-1 bg-[#198876] rounded-full shrink-0" />

      {/* Tanggal */}
      <span className="font-medium text-center">
        {date}
      </span>
    </div>
  );
};