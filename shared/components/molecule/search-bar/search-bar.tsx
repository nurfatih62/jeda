"use client";

import type { InputHTMLAttributes } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '../../atom/input/input';

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className = '', ...rest }: SearchBarProps) {
  return (
    <div
      className={`flex h-(--spacing-btn-h) max-w-(--max-w-search) flex-1 items-center gap-(--spacing-hero-gap) rounded-(--radius-search) border border-primary bg-white px-(--spacing-px-btn) ${className}`}
    >
      <Link
        href="/explore"
        aria-label="Buka halaman pencarian"
        className="flex shrink-0 items-center text-primary transition-colors hover:text-primary-hover"
      >
        <Search className="h-(--icon-size-search) w-(--icon-size-search)" strokeWidth={1.7} />
      </Link>
      <Input placeholder="Cari" {...rest} />
    </div>
  );
}