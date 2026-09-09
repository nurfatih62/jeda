"use client";

import React, { useState, useRef, useEffect } from "react";

export interface InputCommentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Nilai awal jika menggunakan uncontrolled component */
  defaultValue?: string;
}

export const InputComment: React.FC<InputCommentProps> = ({
  value,
  defaultValue = "",
  onChange,
  placeholder = "Tulis komentar...",
  className = "",
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>(String(defaultValue));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;

  // Cek apakah input memiliki isi
  const hasValue = currentValue.length > 0;

  // Fungsi untuk menyesuaikan tinggi secara otomatis ke bawah
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset tinggi terlebih dahulu
      textarea.style.height = `${textarea.scrollHeight}px`; // Sesuaikan dengan tinggi konten
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [currentValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    adjustHeight();
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`relative inline-flex w-191.5 min-h-13 ${className}`}>
      <textarea
        ref={textareaRef}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={1}
        className={`
          box-border flex flex-row items-start w-full
          py-2 px-3 gap-2.5
          bg-sidebar-text-hover rounded-md
          font-['Poppins'] font-medium text-[14px] leading-5
          outline-none resize-none overflow-hidden transition-colors duration-150
          placeholder:text-[#C2C7D0]
          ${
            hasValue
              ? "border border-btn-hover text-btn-hover"
              : "border border-[#C2C7D0] text-btn-hover"
          }
        `}
        style={{ minHeight: "52px" }}
        {...props}
      />

      {/* Ikon Resize di sudut kanan bawah */}
      <div className="absolute right-1 bottom-1 w-3.75 h-3.75 pointer-events-none flex items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L1 9M9 5L5 9M9 9H9"
            stroke="#C2C7D0"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};