"use client";

import type { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import { Logo } from '../../atom/logo/logo';
import { Button } from '../../atom/button/button';
import { IconButton } from '../../atom/button/icon-button';
import { SearchBar } from '../../molecule/search-bar/search-bar';
import { Avatar } from '../../atom/avatar/avatar';
import { supabase } from '../../../../lib/supabase/client';

export interface HeaderProps {
  /** Status apakah pengguna sudah login atau belum */
  isLoggedIn?: boolean;
  /** Nama pengguna untuk teks alt atau inisial avatar */
  userName?: string;
  /** URL foto profil opsional */
  userAvatar?: string;
  onLoginClick?: () => void;
  onNotificationClick?: () => void;
  onLogout?: () => void;
  searchProps?: InputHTMLAttributes<HTMLInputElement>;
  /** Sembunyikan logo (dipakai AppShell saat Sidebar expanded) */
  showLogo?: boolean;
}

export function Header({ 
  isLoggedIn = false, 
  userName = 'John Doe', 
  userAvatar,
  onLoginClick, 
  onNotificationClick,
  onLogout,
  searchProps, 
  showLogo = true 
}: HeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error && error.name !== 'AuthSessionMissingError') {
      console.error('Gagal keluar dari akun:', error);
      return;
    }
    setIsProfileMenuOpen(false);
    onLogout?.();
    window.location.href = '/';
  }

  return (
    <header className={`sticky top-0 z-50 flex h-21.5 w-full items-center justify-between px-[21px] gap-11 ${
      isLoggedIn 
        ? 'bg-[#F2F4ED] border-b border-text-primary' 
        : 'border border-text-primary bg-header-bg py-5.75'
    }`}>
      {/* Logo atau Teks JEDA */}
      {showLogo && (
        isLoggedIn ? (
          <span className="font-['IBM_Plex_Serif'] font-bold text-[40px] leading-[28px] text-[#146C5D]">
            JEDA
          </span>
        ) : (
          <Logo size={40} />
        )
      )}

      {/* Search Bar */}
      <div className="flex-1 max-w-234">
        <SearchBar {...searchProps} placeholder={searchProps?.placeholder ?? 'Cari'} />
      </div>

      {/* Bagian Kanan: Button Masuk (Guest) atau Ikon & Avatar (Logged In) */}
      {isLoggedIn ? (
        <div className="flex items-center gap-[10px]">
          <IconButton
            variant="ghost"
            onClick={onNotificationClick}
            className="h-10 w-10 rounded-sm p-2"
            aria-label="Notifikasi"
            icon={<Bell size={24} strokeWidth={2} />}
          />

          {/* Dropdown Profile / Avatar Inisial */}
          <div className="relative">
            <button
              type="button"
              aria-label="Buka menu profil"
              aria-expanded={isProfileMenuOpen}
              onClick={() => setIsProfileMenuOpen((open) => !open)}
              className="block cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Avatar src={userAvatar} alt={userName} size="xl" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-54 flex-col gap-4 rounded-md bg-white p-2.5 shadow-lg">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex h-10 items-center rounded-md border border-primary px-4 font-sans text-sm font-medium text-primary no-underline hover:bg-primary-overlay-hover"
                >
                  Profil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 items-center justify-between rounded-md border border-danger px-4 font-sans text-sm font-medium text-danger hover:bg-danger-overlay-hover"
                >
                  Keluar
                  <ArrowRight size={20} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href="/login" onClick={onLoginClick}>
          <Button variant="primary" className="w-24.5 h-10 shrink-0">
            Masuk
          </Button>
        </Link>
      )}
    </header>
  );
}