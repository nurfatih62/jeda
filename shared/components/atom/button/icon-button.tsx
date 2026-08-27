"use client";

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Menu } from 'lucide-react';

export type IconButtonVariant = 'primary' | 'outline' | 'ghost';
export type IconButtonColorState = 'default' | 'danger';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Gaya tampilan tombol */
  variant?: IconButtonVariant;
  /** Warna tombol */
  colorState?: IconButtonColorState;
  /** Icon tombol */
  icon?: ReactNode;
  /** Menonaktifkan tombol */
  disabled?: boolean;
}

const baseClass =
  'inline-flex items-center justify-center gap-2.5 rounded-md p-2.5 transition-colors';

const colorClass: Record<IconButtonVariant, Record<IconButtonColorState, string>> = {
  primary: {
    default: 'bg-[#198876] text-white hover:bg-[#187364] active:bg-[#18584D]',
    danger: 'bg-[#F87171] text-white hover:bg-[#F24D4D] active:bg-[#CB1E1E]',
  },
  outline: {
    default:
      'border border-[#198876] bg-transparent text-[#198876] hover:bg-[rgba(25,136,118,0.16)] active:bg-[rgba(25,136,118,0.32)]',
    danger:
      'border border-[#F87171] bg-transparent text-[#F87171] hover:bg-[rgba(248,113,113,0.16)] active:bg-[rgba(248,113,113,0.32)]',
  },
  ghost: {
    default:
      'bg-transparent text-[#198876] hover:bg-[rgba(25,136,118,0.16)] active:bg-[rgba(25,136,118,0.32)]',
    danger:
      'bg-transparent text-[#F87171] hover:bg-[rgba(248,113,113,0.16)] active:bg-[rgba(248,113,113,0.32)]',
  },
};

export function IconButton({
  variant = 'primary',
  colorState = 'default',
  icon = <Menu size={24} strokeWidth={2} />,
  disabled = false,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${baseClass} ${colorClass[variant][colorState]} ${
        disabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
      } ${className}`}
      {...rest}
    >
      {icon}
    </button>
  );
}
