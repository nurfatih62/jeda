"use client";

import type { InputHTMLAttributes } from 'react';
import { Logo } from '../../atom/logo/logo';
import { Button } from '../../atom/button/button';
import { IconButton } from '../../atom/button/icon-button';
import { Menu } from 'lucide-react';
import { SearchBar } from '../../molecule/search-bar/search-bar';

export interface HeaderProps {
  onMenuClick?: () => void;
  onLoginClick?: () => void;
  searchProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function Header({ onMenuClick, onLoginClick, searchProps }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-21 items-center gap-7.75 border border-primary-border bg-header-bg px-5.25">
      <IconButton
        icon={<Menu size={24} strokeWidth={2} />}
        aria-label="Menu"
        variant="ghost"
        onClick={onMenuClick}
        className="h-11 w-11.5 p-0 text-primary hover:bg-transparent active:bg-transparent"
      />
      <Logo />
      <SearchBar {...searchProps} />
      <Button variant="primary" onClick={onLoginClick} className="w-25 shrink-0">
        Masuk
      </Button>
    </header>
  );
}
