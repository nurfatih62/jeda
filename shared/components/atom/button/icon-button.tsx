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
    default: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
    danger: 'bg-danger text-white hover:bg-danger-hover active:bg-danger-active',
  },
  outline: {
    default:
      'border border-primary bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active',
    danger:
      'border border-danger bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active',
  },
  ghost: {
    default:
      'bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active',
    danger:
      'bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active',
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
