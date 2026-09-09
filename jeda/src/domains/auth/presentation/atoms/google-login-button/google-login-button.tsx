"use client";

import React from "react";

export interface GoogleLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Teks label tombol, default "Masuk dengan Google" */
  children?: React.ReactNode;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  children = "Masuk dengan Google",
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`
        box-border flex flex-row items-center justify-center
        py-1.75 px-23 gap-6.5
        w-131.25 h-14
        bg-white
        border border-transparent hover:border-btn-hover
        rounded-md
        font-['Poppins'] font-medium text-2xl leading-7
        text-btn-hover
        transition-all duration-150 cursor-pointer outline-none select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {/* Logo Google */}
      <svg
        className="w-10 h-10 shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
          fill="#4285F4"
        />
        <path
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24Z"
          fill="#34A853"
        />
        <path
          d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.39l4.09-3.15Z"
          fill="#FBBC05"
        />
        <path
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96Z"
          fill="#EA4335"
        />
      </svg>

      {/* Teks Label */}
      <span className="text-center truncate">{children}</span>
    </button>
  );
};