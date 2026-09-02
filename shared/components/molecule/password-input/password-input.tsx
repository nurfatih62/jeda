"use client";

import React, { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export type TextInputVariant = 'default' | 'secondary';

export type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: TextInputVariant;
  strength?: PasswordStrength;
  errorText?: string;
  matchStatus?: 'match' | 'mismatch';
};

export function PasswordInput({
  className = '',
  label,
  variant = 'default',
  strength,
  errorText,
  matchStatus,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const strengthValue = strength ?? 0;

  const borderClass =
    variant === 'secondary'
      ? 'border-[#1B4E46]'
      : 'border-[#C2C7D0] hover:border-[#1B4E46] focus:border-[#1B4E46]';
      
  const placeholderClass =
    variant === 'secondary'
      ? 'placeholder:text-[#146C5D] text-[#146C5D]'
      : 'placeholder:text-[#CCCCCC] text-[#146C5D] focus:placeholder:text-text-primary';

  const iconColorClass =
    variant === 'secondary'
      ? 'text-[#146C5D]'
      : 'text-[#146C5D] group-hover:text-[#146C5D] group-focus-within:text-[#146C5D]';

  const barColor = (index: number) => {
    if (strengthValue > 0 && strengthValue < 3) {
      return 'bg-[#F08181]';
    }
    if (strengthValue === 0) return 'bg-[#F08181]';
    return index < strengthValue ? 'bg-[#75BF85]' : 'bg-[rgba(204,204,204,0.8)]';
  };

  const hasStrength = strengthValue > 0;

  return (
    <div className="flex flex-col gap-[10px] w-full">
      {label && (
        <label className="font-poppins text-btn font-medium leading-[40px] text-text-primary">
          {label}
        </label>
      )}
      <div className="group relative flex items-center h-[40px] w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`h-full w-full rounded-[8px] border ${borderClass} bg-white px-3 pr-10 font-nunito text-[14px] font-medium ${placeholderClass} outline-none transition-colors duration-200 ${className}`}
          {...rest}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center bg-transparent border-none cursor-pointer p-0 transition-colors duration-200 ${iconColorClass}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>

      {hasStrength && (
        <div className="flex items-center gap-sm w-full">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.75 flex-1 rounded-xs ${barColor(i)}`}
            />
          ))}
        </div>
      )}

      {errorText && (
        <span className="font-poppins text-[12px] font-normal leading-[24px] text-[#FF4040]">
          {errorText}
        </span>
      )}

      {matchStatus && (
        <span
          className={`font-nunito text-[14px] font-medium leading-5 ${
            matchStatus === 'match' ? 'text-[#408836]' : 'text-[#D02A11]'
          }`}
        >
          {matchStatus === 'match' ? 'Password cocok' : 'Password belum cocok'}
        </span>
      )}
    </div>
  );
}