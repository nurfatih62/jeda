"use client";

import React from "react";
import { Search } from "lucide-react";

export interface InputSheardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Placeholder untuk input pencarian */
  placeholder?: string;
}

export const InputSheard: React.FC<InputSheardProps> = ({
  placeholder = "Cari",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        relative flex items-center box-border
        w-244.75 h-10
        bg-sidebar-text-hover hover:bg-[#F7F7F7]
        border border-btn-hover rounded-lg
        transition-all duration-150
        ${className}
      `}
    >
      {/* Ikon Cari (Lucide Search) - Warna #1B4E46 */}
      <Search
        className="absolute left-4 w-5 h-5 text-btn-hover pointer-events-none"
      />

      {/* Elemen Input - Teks #1B4E46 */}
      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full h-full bg-transparent outline-none
          pl-11.5 pr-4 py-2.5
          font-['Poppins'] font-medium text-[14px] leading-5
          text-btn-hover placeholder:text-[#C2C7D0]
        `}
        {...props}
      />
    </div>
  );
};