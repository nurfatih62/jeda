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
      ? 'border-[#1B4E46]'
      : 'border-[#C2C7D0] hover:border-[#1B4E46] focus:border-[#1B4E46]';
      
  const placeholderClass =
    variant === 'secondary'
      ? 'placeholder:text-[#146C5D] text-[#146C5D]'
      : 'placeholder:text-[#CCCCCC] text-[#146C5D] focus:placeholder:text-text-primary';

  const helperColorClass =
    helperType === 'success' ? 'text-[#408836]' : 'text-[#FF4040]';

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