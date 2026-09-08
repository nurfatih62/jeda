"use client";

import React, { useState, useEffect } from "react";
import { IconButton } from "../../icon/icon button/icon";

export interface ButtonTagsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Teks label pada tombol */
  label?: string;
  /** Status apakah tombol sedang dalam keadaan aktif/diklik (Controlled prop) */
  active?: boolean;
  /** Status awal jika komponen berdiri sendiri (Uncontrolled) */
  defaultActive?: boolean;
  /** Fungsi callback ketika tombol diklik */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ButtonTags: React.FC<ButtonTagsProps> = ({
  label = "Click Me!",
  active: controlledActive,
  defaultActive = false,
  onClick,
  className = "",
  disabled,
  ...props
}) => {
  const [internalActive, setInternalActive] = useState(defaultActive);
  const [isHovered, setIsHovered] = useState(false);
  const [isX, setIsX] = useState(defaultActive);
  
  const isControlled = controlledActive !== undefined;
  const isActive = isControlled ? controlledActive : internalActive;

  // Sinkronisasi state jika props active berubah dari luar (Controlled)
  useEffect(() => {
    if (controlledActive !== undefined) {
      setIsX(controlledActive);
    }
  }, [controlledActive]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isActive) {
      setIsX(true); // Dari default ke hover: + berputar jadi X
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isActive) {
      setIsX(false); // Saat dilepas (mouse leave): kembali ke default +
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextActive = isControlled ? !controlledActive : !internalActive;

    if (!isControlled) {
      setInternalActive(nextActive);
    }

    if (nextActive) {
      // Jika diklik menjadi aktif
      setIsX(true);
    } else {
      // Jika diklik lagi saat aktif (menjadi tidak aktif tapi masih di hover): X berputar kembali ke +
      setIsX(false);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`
        box-border inline-flex flex-row justify-center items-center 
        w-fit h-auto min-h-[42px]
        px-4 py-2 gap-1 rounded-3xl cursor-pointer select-none
        border border-[#10564A]
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? /* State Clicked / Active */
              "bg-[#146C5D] text-white"
            : /* State Default & Hover */
              "bg-transparent text-[#146C5D] hover:bg-[rgba(20,108,93,0.16)]"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {/* Label Text: Menggunakan w-fit & whitespace-nowrap agar melebar otomatis sesuai panjang teks */}
      <span className="font-poppins font-medium text-[16px] leading-6 text-center whitespace-nowrap shrink-0">
        {label}
      </span>

      {/* ICONS Container */}
      <span
        className={`inline-flex items-center justify-center w-6 h-6 shrink-0 transition-transform duration-300 ease-in-out ${
          isX ? "-rotate-45" : "rotate-0"
        } ${isActive ? "[&_svg]:stroke-white" : "[&_svg]:stroke-[#10564A]"}`}
      >
        <IconButton
          variant="plus"
          disabled={true}
          ariaLabel="icon-button"
        />
      </span>
    </button>
  );
};