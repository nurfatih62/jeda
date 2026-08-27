"use client";

import type { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../atom/input/input';

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className = '', ...rest }: SearchBarProps) {
  return (
    <div
      className={`flex h-10 max-w-265.5 flex-1 items-center gap-2.5 rounded-lg border border-primary bg-white px-4 ${className}`}
    >
      <Search className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} />
      <Input placeholder="Cari" {...rest} />
    </div>
  );
}
