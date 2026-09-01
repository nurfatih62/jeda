"use client";

import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...rest }: InputProps) {
  return (
    <input
      className={`font-nunito w-full flex-1 border-none bg-transparent text-(length:--font-size-sm) font-medium leading-(--leading-loose) text-text-primary outline-none placeholder:text-placeholder ${className}`}
      {...rest}
    />
  );
}