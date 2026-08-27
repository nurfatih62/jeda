"use client";

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
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
  "font-sans inline-flex h-10 items-center justify-center gap-2.5 rounded-md px-4 text-base font-medium leading-6 transition-colors";

const colorClass: Record<ButtonVariant, Record<ButtonColorState, string>> = {
  primary: {
    default: 'bg-[#198876] text-white hover:bg-[#187364] active:bg-[#18584D]',
    success: 'bg-[#10B981] text-white hover:bg-[#10845E] active:bg-[#0E5E43]',
    danger: 'bg-[#F87171] text-white hover:bg-[#F24D4D] active:bg-[#CB1E1E]',
  },
  outline: {
    default:
      'border border-[#198876] bg-transparent text-[#198876] hover:bg-[rgba(25,136,118,0.16)] active:bg-[rgba(25,136,118,0.32)]',
    success:
      'border border-[#10B981] bg-transparent text-[#10B981] hover:bg-[rgba(16,185,129,0.16)] active:bg-[rgba(16,185,129,0.32)]',
    danger:
      'border border-[#F87171] bg-transparent text-[#F87171] hover:bg-[rgba(248,113,113,0.16)] active:bg-[rgba(248,113,113,0.32)]',
  },
  ghost: {
    default:
      'bg-transparent text-[#198876] hover:bg-[rgba(25,136,118,0.16)] active:bg-[rgba(25,136,118,0.32)]',
    success:
      'bg-transparent text-[#10B981] hover:bg-[rgba(16,185,129,0.16)] active:bg-[rgba(16,185,129,0.32)]',
    danger:
      'bg-transparent text-[#F87171] hover:bg-[rgba(248,113,113,0.16)] active:bg-[rgba(248,113,113,0.32)]',
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
        isDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
      } ${className}`}
      {...rest}
    >
      {loading && <LoaderCircle size={16} strokeWidth={2} className="animate-spin" />}
      {!loading && arrow === 'left' && <ArrowLeft size={16} strokeWidth={2} />}
      <span>{children}</span>
      {!loading && arrow === 'right' && <ArrowRight size={16} strokeWidth={2} />}
    </button>
  );
}
