"use client";

import React from "react";

export interface ButtonVerifikasiProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Status tombol: true (on/aktif), false (off/redup rgba 20, 108, 93, 0.5) */
  isOn?: boolean;
  /** Teks atau konten di dalam tombol */
  children?: React.ReactNode;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ButtonVerifikasi: React.FC<ButtonVerifikasiProps> = ({
  isOn = true,
  children = "Verifikasi",
  className = "",
  disabled,
  ...props
}) => {
  // Pengaturan gaya berdasarkan kondisi On / Off
  const statusStyles = isOn
    ? "bg-[#146C5D] text-white hover:bg-[#10564A] active:bg-[#0B3F37] cursor-pointer"
    : "bg-[rgba(20,108,93,0.5)] text-white/90 cursor-not-allowed";

  return (
    <button
      type="button"
      disabled={!isOn || disabled}
      className={`
        box-border flex flex-row justify-center items-center 
        px-[16px] py-[8px] gap-[10px]
        w-[562px] h-[54px]
        font-['Poppins'] font-medium text-[20px] leading-[24px]
        transition-all duration-150 rounded-[6px] border-none
        ${statusStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonVerifikasi.displayName = "ButtonVerifikasi";