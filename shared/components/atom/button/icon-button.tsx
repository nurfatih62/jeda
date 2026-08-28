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
    default: 'bg-[#147364] text-white hover:bg-[#0F5A4E] active:bg-[#0B4038]',
    danger: 'bg-[#CB1E1E] text-white hover:bg-[#A81818] active:bg-[#7A1212]',
  },
  outline: {
    default:
      'border border-[#147364] bg-transparent text-[#147364] hover:bg-[rgba(20,115,100,0.12)] active:bg-[rgba(20,115,100,0.24)]',
    danger:
      'border border-[#CB1E1E] bg-transparent text-[#CB1E1E] hover:bg-[rgba(203,30,30,0.12)] active:bg-[rgba(203,30,30,0.24)]',
  },
  ghost: {
    default:
      'bg-transparent text-[#147364] hover:bg-[rgba(20,115,100,0.12)] active:bg-[rgba(20,115,100,0.24)]',
    danger:
      'bg-transparent text-[#CB1E1E] hover:bg-[rgba(203,30,30,0.12)] active:bg-[rgba(203,30,30,0.24)]',
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
