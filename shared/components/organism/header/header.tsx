"use client";

import type { InputHTMLAttributes } from 'react';
import { Logo } from '../../atom/logo/logo';
import { Button } from '../../atom/button/button';
import { SearchBar } from '../../molecule/search-bar/search-bar';

export interface HeaderProps {
  onLoginClick?: () => void;
  searchProps?: InputHTMLAttributes<HTMLInputElement>;
  /** Sembunyikan logo (dipakai AppShell saat Sidebar expanded — logo pindah ke sana). */
  showLogo?: boolean;
}

export function Header({ onLoginClick, searchProps, showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-22 w-full items-center justify-between border border-text-primary bg-[#F2F4ED] px-5 py-5.75 gap-7.5">
      {showLogo && <Logo size={40} />}
      <div className="flex-1 max-w-244.75">
        <SearchBar {...searchProps} />
      </div>
      <Button variant="primary" onClick={onLoginClick} className="w-24.5 h-10 shrink-0">
        Masuk
      </Button>
    </header>
  );
}