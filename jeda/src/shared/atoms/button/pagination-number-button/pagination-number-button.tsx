"use client";

import React from "react";

export interface PaginationNumberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Nomor halaman atau teks yang ditampilkan */
  page?: number | string;
  /** Status aktif halaman saat ini */
  active?: boolean;
}

export const PaginationNumberButton: React.FC<PaginationNumberButtonProps> = ({
  page = 1,
  active = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        background: active
          ? "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #146C5D"
          : "transparent",
      }}
      className={`
        box-border flex flex-row justify-center items-center
        px-3 py-2
        min-w-9.5 h-10
        rounded-md
        text-[16px] leading-6 font-medium
        transition-all duration-150 cursor-pointer outline-none whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${
          active
            ? "text-white active:scale-95 border-transparent"
            : "border border-[#146C5D] text-[#146C5D] hover:bg-[#146C5D]/10 active:scale-95"
        }
        ${className}
      `}
      {...props}
    >
      <span>{page}</span>
    </button>
  );
};