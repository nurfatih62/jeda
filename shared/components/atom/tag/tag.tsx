"use client";

import type { HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends HTMLAttributes<HTMLButtonElement> {
  /** Teks di dalam tag */
  children?: ReactNode;
  /** Status apakah tag sedang dipilih/diklik (stay hijau) */
  selected?: boolean;
}

export function Tag({
  children = 'Click Me!',
  selected = false,
  className = '',
  ...rest
}: TagProps) {
  return (
    <button
      type="button"
      className={`box-border inline-flex items-center justify-center gap-2.5 px-tab-x py-2 rounded-[24px] font-Poppins font-medium text-btn leading-[24px] text-center transition-colors outline-none cursor-pointer ${
        selected
          ? 'border border-transparent bg-sort-accent text-white'
          : 'border border-sort-accent bg-transparent text-sort-accent hover:bg-primary-overlay-hover'
      } ${className}`}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}