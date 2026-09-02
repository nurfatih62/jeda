"use client";

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'brand';
export type ButtonColorState = 'default' | 'success' | 'danger';
export type ButtonArrow = 'none' | 'left' | 'right';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Teks di dalam tombol */
  children: ReactNode;
  /** Gaya tampilan tombol */
  variant?: ButtonVariant;
  /** State warna tombol */
  colorState?: ButtonColorState;
  /** Panah pada tombol */
  arrow?: ButtonArrow;
  /** Menampilkan loading pada tombol */
  loading?: boolean;
  /** Menonaktifkan tombol */
  disabled?: boolean;
}

const baseClass =
  "font-sans inline-flex items-center justify-center gap-2.5 transition-colors";

const colorClass: Record<ButtonVariant, Record<ButtonColorState, string>> = {
  primary: {
    default: 'h-10 rounded-md px-4 text-base font-medium leading-6 bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
    success: 'h-10 rounded-md px-4 text-base font-medium leading-6 bg-success text-white hover:bg-success-hover active:bg-success-active',
    danger: 'h-10 rounded-md px-4 text-base font-medium leading-6 bg-danger text-white hover:bg-danger-hover active:bg-danger-active',
  },
  outline: {
    default:
      'h-10 rounded-md px-4 text-base font-medium leading-6 border border-primary bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active',
    success:
      'h-10 rounded-md px-4 text-base font-medium leading-6 border border-success bg-transparent text-success hover:bg-success-overlay-hover active:bg-success-overlay-active',
    danger:
      'h-10 rounded-md px-4 text-base font-medium leading-6 border border-danger bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active',
  },
  ghost: {
    default:
      'h-10 rounded-md px-4 text-base font-medium leading-6 bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active',
    success:
      'h-10 rounded-md px-4 text-base font-medium leading-6 bg-transparent text-success hover:bg-success-overlay-hover active:bg-success-overlay-active',
    danger:
      'h-10 rounded-md px-4 text-base font-medium leading-6 bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active',
  },
  brand: {
    default: 'w-[562px] h-[54px] px-[16px] py-[8px] bg-[#146C5D] text-white hover:bg-[#13574C] active:bg-[#0B3F37] disabled:bg-[rgba(20,108,93,0.5)] text-[20px] font-medium leading-[24px] rounded-[6px]',
    success: 'w-[562px] h-[54px] px-[16px] py-[8px] bg-[#146C5D] text-white hover:bg-[#13574C] active:bg-[#0B3F37] disabled:bg-[rgba(20,108,93,0.5)] text-[20px] font-medium leading-[24px] rounded-[6px]',
    danger: 'w-[562px] h-[54px] px-[16px] py-[8px] bg-[#146C5D] text-white hover:bg-[#13574C] active:bg-[#0B3F37] disabled:bg-[rgba(20,108,93,0.5)] text-[20px] font-medium leading-[24px] rounded-[6px]',
  },
};

export function Button({
  children,
  variant = 'primary',
  colorState = 'default',
  arrow = 'none',
  loading = false,
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`${baseClass} ${colorClass[variant][colorState]} ${
        isDisabled ? 'pointer-events-none cursor-not-allowed opacity-100' : ''
      } ${className}`}
      {...rest}
    >
      {loading && <LoaderCircle size={20} strokeWidth={2} className="animate-spin" />}
      {!loading && arrow === 'left' && <ArrowLeft size={20} strokeWidth={2} />}
      <span>{children}</span>
      {!loading && arrow === 'right' && <ArrowRight size={20} strokeWidth={2} />}
    </button>
  );
}