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
    default: 'bg-[#147364] text-white hover:bg-[#0F5A4E] active:bg-[#0B4038]',
    success: 'bg-[#0E7A5A] text-white hover:bg-[#0B5F46] active:bg-[#083F2F]',
    danger: 'bg-[#CB1E1E] text-white hover:bg-[#A81818] active:bg-[#7A1212]',
  },
  outline: {
    default:
      'border border-[#147364] bg-transparent text-[#147364] hover:bg-[rgba(20,115,100,0.12)] active:bg-[rgba(20,115,100,0.24)]',
    success:
      'border border-[#0E7A5A] bg-transparent text-[#0E7A5A] hover:bg-[rgba(14,122,90,0.12)] active:bg-[rgba(14,122,90,0.24)]',
    danger:
      'border border-[#CB1E1E] bg-transparent text-[#CB1E1E] hover:bg-[rgba(203,30,30,0.12)] active:bg-[rgba(203,30,30,0.24)]',
  },
  ghost: {
    default:
      'bg-transparent text-[#147364] hover:bg-[rgba(20,115,100,0.12)] active:bg-[rgba(20,115,100,0.24)]',
    success:
      'bg-transparent text-[#0E7A5A] hover:bg-[rgba(14,122,90,0.12)] active:bg-[rgba(14,122,90,0.24)]',
    danger:
      'bg-transparent text-[#CB1E1E] hover:bg-[rgba(203,30,30,0.12)] active:bg-[rgba(203,30,30,0.24)]',
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
