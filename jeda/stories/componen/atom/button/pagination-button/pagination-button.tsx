"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Teks label pada tombol */
  label?: string;
  /** Arah navigasi: 'prev' (sebelumnya) atau 'next' (berikutnya) */
  direction?: "prev" | "next";
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  direction = "prev",
  className = "",
  disabled,
  ...props
}) => {
  // Menentukan label default otomatis (mengubah "Sebelum" menjadi "Sebelumnya")
  const defaultLabel = direction === "prev" ? "Sebelumnya" : "Berikutnya";
  const displayLabel = label ?? defaultLabel;

  // Menentukan ikon panah otomatis berdasarkan arah
  const IconComponent = direction === "prev" ? ArrowLeft : ArrowRight;

  // Menyesuaikan lebar tombol berdasarkan spesifikasi Figma (prev: 161px, next: 144.33px)
  const widthClass = direction === "prev" ? "w-40.25" : "w-36.0825";

  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #146C5D",
      }}
      className={`
        box-border flex flex-row justify-center items-center
        px-4 py-2 gap-2.5
        ${widthClass} h-10
        rounded-md
        hover:opacity-90
        active:scale-95
        text-white font-medium text-[16px] leading-6
        transition-all duration-150 cursor-pointer border-none outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
      {...props}
    >
      {/* Ikon di kiri khusus untuk arah 'prev' */}
      {direction === "prev" && (
        <IconComponent size={16} className="shrink-0 text-white stroke-[2.2]" />
      )}
      
      <span className="truncate">{displayLabel}</span>

      {/* Ikon di kanan khusus untuk arah 'next' */}
      {direction === "next" && (
        <IconComponent size={16} className="shrink-0 text-white stroke-[2.2]" />
      )}
    </button>
  );
};