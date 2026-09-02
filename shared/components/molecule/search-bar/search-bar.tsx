"use client";

import React, { useState, KeyboardEvent } from 'react';
import type { FormEvent, InputHTMLAttributes } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '../../atom/input/input';

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  basePath?: string;
};

export function SearchBar({ className = '', basePath = '/homepage', placeholder, ...rest }: SearchBarProps) {
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

  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (router && searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      if (keyword.trim()) {
        params.set('keyword', keyword.trim());
      } else {
        params.delete('keyword');
      }
      params.delete('page');

      router.push(`${basePath}?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-(--spacing-btn-h) max-w-(--max-w-search) flex-1 items-center gap-(--spacing-hero-gap) rounded-(--radius-search) bg-white px-(--spacing-px-btn) transition-colors duration-200 border border-primary hover:border-text-primary focus-within:border-text-primary focus-within:bg-[#F7F7F7] ${className}`}
    >
      <button
        type="submit"
        aria-label="Cari"
        className="flex shrink-0 items-center text-primary transition-colors hover:text-text-primary bg-transparent border-none cursor-pointer"
      >
        <Search className="h-(--icon-size-search) w-(--icon-size-search)" strokeWidth={1.7} />
      </button>
      <Input
        placeholder={placeholder || "Cari artikel..."}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}