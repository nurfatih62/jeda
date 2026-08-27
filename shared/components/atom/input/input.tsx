"use client";

import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...rest }: InputProps) {
  return (
    <input
      className={`font-nunito w-full flex-1 border-none bg-transparent text-sm font-medium leading-5 text-text-primary outline-none placeholder:text-placeholder ${className}`}
      {...rest}
    />
  );
}
