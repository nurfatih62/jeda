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
    <header className="sticky top-0 z-50 flex h-21 items-center gap-7.75 border-b border-primary-border bg-header-bg px-5.25">
      {showLogo && <Logo />}
      <SearchBar {...searchProps} />
      <Button variant="primary" onClick={onLoginClick} className="w-25 shrink-0">
        Masuk
      </Button>
    </header>
  );
}
