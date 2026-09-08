"use client";

import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = '', ...rest }: TextareaProps) {
  return (
    <textarea
      className={`font-nunito w-full flex-1 border-none bg-transparent text-(length:--font-size-sm) font-medium leading-(--leading-loose) text-text-primary outline-none resize-none placeholder:text-placeholder ${className}`}
      {...rest}
    />
  );
}