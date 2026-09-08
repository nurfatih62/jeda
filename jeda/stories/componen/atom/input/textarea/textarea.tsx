"use client";

import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label di atas textarea */
  label?: string;
  /** Teks bantuan di bawah textarea */
  helperText?: string;
  /** Status error */
  error?: boolean;
  /** Pesan error */
  errorMessage?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, errorMessage, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col items-start gap-[16px] w-full">
        <div className="flex flex-col items-start gap-[1px] w-full">
          {label && (
            <label className="font-['Poppins'] font-medium text-[16px] leading-[40px] text-[#1B4E46]">
              {label}
            </label>
          )}
          <textarea
            ref={ref}
            className={`
              box-border flex flex-row items-start px-[12px] py-[8px] gap-[10px] w-full h-[52px]
              bg-white text-[#1B4E46] placeholder:text-[#1B4E46]/60 font-['Nunito'] font-medium text-[14px]
              border ${error ? "border-red-500" : "border-[#1B4E46]"} rounded-[6px]
              focus:outline-none focus:ring-1 focus:ring-[#1B4E46] resize-none
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

Textarea.displayName = "Textarea";