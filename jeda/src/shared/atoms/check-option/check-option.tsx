"use client";

import React from "react";
import { Check } from "lucide-react";

export interface CheckOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Teks label yang ditampilkan di sebelah kanan */
  label?: string;
  /** Status apakah opsi ini sedang dicentang */
  checked?: boolean;
  /** Pilihan ukuran komponen: 'default' atau 'sm' (kecil) */
  size?: "default" | "sm";
}

export const CheckOption: React.FC<CheckOptionProps> = ({
  label = "Spam atau iklan",
  checked = false,
  size = "default",
  className = "",
  ...props
}) => {
  const isSmall = size === "sm";

  return (
    <button
      type="button"
      aria-pressed={checked}
      className={`
        box-border flex flex-row items-center
        py-2.5 px-6.25 gap-5.25
        rounded-md
        bg-transparent
        cursor-pointer select-none outline-none
        transition-all duration-150
        ${isSmall ? "w-56 h-13" : "w-59.75 h-13.5"}
        ${className}
      `}
      {...props}
    >
      {/* Kotak/Lingkaran Checkbox di Kiri */}
      <div
        className={`
          box-border flex items-center justify-center
          border border-btn-hover
          rounded-[18px]
          transition-all duration-150
          ${isSmall ? "w-5 h-5" : "w-8.75 h-8.5"}
          ${checked ? "bg-btn-hover text-white" : "bg-transparent text-transparent"}
        `}
      >
        {checked && <Check size={isSmall ? 12 : 18} className="stroke-[2.5]" />}
      </div>

      {/* Label Tulisan di Kanan */}
      <span
        className={`
          font-['Poppins'] font-medium text-[16px] leading-8
          text-center text-btn-hover truncate
        `}
      >
        {label}
      </span>
    </button>
  );
};