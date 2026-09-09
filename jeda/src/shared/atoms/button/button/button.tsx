"use client";

import React from "react";

export type ButtonVariant = "solid" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Varian tombol: "solid" atau "outline" */
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  children = "Masuk",
  variant = "solid",
  className = "",
  ...props
}) => {
  const variantStyles = {
    // Varian Solid
    solid: `
      bg-[#10564A] text-white 
      hover:bg-[#13574C] 
      active:bg-[#0B3F37]
    `,
    // Varian Outline dengan spesifikasi warna kustom
    outline: `
      bg-transparent text-[#146C5D] border border-[#146C5D] 
      hover:bg-[#146C5D]/50 hover:text-white hover:border-[#146C5D] 
      active:bg-[#146C5D] active:text-white active:border-[#146C5D]
    `,
  };

  return (
    <button
      className={`
        box-border inline-flex items-center justify-center 
        px-4 py-2 gap-2.5 h-10 w-auto 
        rounded-md font-medium text-[16px] leading-6 
        transition-all duration-150 cursor-pointer outline-none 
        ${variantStyles[variant]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};