"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface SendLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Status saat tombol sedang memproses login */
  isLoading?: boolean;
  /** Teks di dalam tombol, default "Masuk" */
  children?: React.ReactNode;
}

export const SendLoginButton: React.FC<SendLoginButtonProps> = ({
  isLoading = false,
  disabled = false,
  children,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Memproses...
        </span>
      );
    }

    if (!children || (typeof children === "string" && children.trim() === "")) {
      return "Masuk";
    }

    return children;
  };

  return (
    <button
      disabled={isDisabled}
      className={`
        box-border flex flex-row justify-center items-center
        py-2 px-4 gap-2.5
        w-140.5 h-13.5
        rounded-md
        font-['Poppins'] font-medium text-xl leading-6
        text-white
        transition-all duration-150 select-none
        cursor-pointer
        disabled:cursor-not-allowed
        ${
          isDisabled
            ? "bg-[#10564A]/50 opacity-70"
            : "bg-[#10564A] hover:bg-[#0D473E] active:bg-btn-active"
        }
        ${className}
      `}
      {...props}
    >
      {renderContent()}
    </button>
  );
};