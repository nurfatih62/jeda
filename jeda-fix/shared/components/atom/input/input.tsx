"use client";

import React, { useRef, useEffect } from 'react';

export type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input({ className = '', value, onChange, ...rest }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset tinggi agar bisa mengecil jika teks dihapus
      textarea.style.height = `${textarea.scrollHeight}px`; // Set sesuai tinggi konten
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      onChange={(e) => {
        adjustHeight();
        if (onChange) onChange(e);
      }}
      className={`font-nunito w-full flex-1 border-none bg-transparent text-(length:--font-size-sm) font-medium leading-(--leading-loose) text-text-primary outline-none resize-none placeholder:text-placeholder overflow-hidden ${className}`}
      {...rest}
    />
  );
}