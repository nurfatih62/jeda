"use client";

import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label di atas input */
  label?: string;
  /** Teks bantuan di bawah input */
  helperText?: string;
  /** Status error */
  error?: boolean;
  /** Pesan error */
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, errorMessage, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col items-start gap-[1px] w-full">
        <div className="flex flex-col items-start gap-[10px] w-full">
          {label && (
            <label className="font-['Poppins'] font-medium text-[16px] leading-[40px] text-[#1B4E46]">
              {label}
            </label>
          )}
          <input
            ref={ref}
            className={`
              box-border w-full h-[40px] px-4 bg-white text-[#1B4E46] placeholder:text-[#1B4E46]/60 
              font-['Nunito'] font-medium text-[14px]
              border ${error ? "border-red-500" : "border-[#1B4E46]"} rounded-[8px]
              focus:outline-none focus:ring-1 focus:ring-[#1B4E46]
              ${className}
            `}
            {...props}
          />
        </div>
        {(helperText || (error && errorMessage)) && (
          <span
            className={`
              font-['Poppins'] font-medium text-[14px] leading-[24px] 
              ${error ? "text-red-500" : "text-[#1B4E46]/75"}
            `}
          >
            {error ? errorMessage : helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";