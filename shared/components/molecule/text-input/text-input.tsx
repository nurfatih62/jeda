"use client";

import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type TextInputVariant = 'default' | 'secondary';

export type TextInputHelperType = 'error' | 'success';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: TextInputVariant;
  helperText?: ReactNode;
  helperType?: TextInputHelperType;
};

export function TextInput({
  className = '',
  label,
  variant = 'default',
  helperText,
  helperType = 'error',
  ...rest
}: TextInputProps) {
  const borderClass =
    variant === 'secondary'
      ? 'border-primary'
      : 'border-border-default hover:border-primary focus:border-primary';

  const placeholderClass =
    variant === 'secondary'
      ? 'placeholder:text-text-primary text-text-primary'
      : 'placeholder:text-text-subtle text-primary focus:placeholder:text-text-primary';

  const helperColorClass =
    helperType === 'success' ? 'text-success' : 'text-danger';

  return (
    <div className="flex flex-col gap-[10px] w-full">
      {label && (
        <label className="font-poppins text-btn font-medium leading-[40px] text-text-primary">
          {label}
        </label>
      )}
      <input
        className={`h-[40px] w-full rounded-[8px] border ${borderClass} bg-white px-3 font-nunito text-[14px] font-medium ${placeholderClass} outline-none transition-colors duration-200 ${className}`}
        {...rest}
      />
      {helperText && (
        <span
          className={`font-poppins text-[12px] font-normal leading-[24px] ${helperColorClass}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}