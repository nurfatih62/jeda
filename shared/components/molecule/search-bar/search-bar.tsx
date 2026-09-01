"use client";

import React, { useState } from 'react';
import type { InputHTMLAttributes, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '../../atom/input/input';

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  basePath?: string;
};

export function SearchBar({ className = '', basePath = '/homepage', ...rest }: SearchBarProps) {
  let router: ReturnType<typeof useRouter> | null = null;
  let searchParams: URLSearchParams | null = null;
  let initialKeyword = '';

  try {
    router = useRouter();
    const rawSearchParams = useSearchParams();
    searchParams = rawSearchParams;
    initialKeyword = rawSearchParams.get('keyword') || '';
  } catch {
    // Aman untuk Storybook jika router tidak tersedia
  }

  // Simpan nilai input dalam state lokal agar bisa diproses saat Enter ditekan
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman secara default

    if (router && searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      if (keyword.trim()) {
        params.set('keyword', keyword.trim());
      } else {
        params.delete('keyword');
      }
      // Reset ke halaman 1 setiap kali melakukan pencarian baru
      params.delete('page');

      router.push(`${basePath}?${params.toString()}`);
    } else {
      console.log('Search submitted:', keyword);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-(--spacing-btn-h) max-w-(--max-w-search) flex-1 items-center gap-(--spacing-hero-gap) rounded-(--radius-search) border border-primary bg-white px-(--spacing-px-btn) ${className}`}
    >
      <button
        type="submit"
        aria-label="Cari"
        className="flex shrink-0 items-center text-primary transition-colors hover:text-primary-hover bg-transparent border-none cursor-pointer"
      >
        <Search className="h-(--icon-size-search) w-(--icon-size-search)" strokeWidth={1.7} />
      </button>
      <Input 
        placeholder="Cari artikel..." 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        {...rest} 
      />
    </form>
  );
}