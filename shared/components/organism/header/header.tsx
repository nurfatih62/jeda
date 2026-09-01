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
    <header className="sticky top-0 z-50 flex h-header-h items-center gap-header-gap border-b border-primary-border bg-header-bg px-header-px">
      {showLogo && <Logo />}
      <SearchBar {...searchProps} />
      <Button variant="primary" onClick={onLoginClick} className="w-btn-login shrink-0">
        Masuk
      </Button>
    </header>
  );
}