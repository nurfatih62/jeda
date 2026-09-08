"use client";

import React from "react";

export interface ButtonSendOutlineProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Teks di dalam tombol, default "Saya mengerti" */
  children?: React.ReactNode;
}

export const ButtonSendOutline: React.FC<ButtonSendOutlineProps> = ({
  children = "Saya mengerti",
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        box-border flex flex-row justify-center items-center
        py-2 px-4 gap-2.5
        w-140.5 h-13.5
        bg-white
        border border-[#10564A]
        rounded-md
        hover:bg-[#DCF7F3]
        active:scale-[0.98]
        font-['Poppins'] font-medium text-xl leading-6
        text-[#10564A]
        transition-all duration-150 cursor-pointer outline-none select-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
      {...props}
    >
      <span className="truncate">{children}</span>
    </button>
  );
};