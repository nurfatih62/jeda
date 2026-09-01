"use client";

import Link from 'next/link';
import { Home, Search, BookCopy, User, Menu, ArrowLeft } from 'lucide-react';
import { Logo } from '../../atom/logo/logo';

export type SidebarActiveKey = 'home' | 'search' | 'library' | 'profile';

export interface SidebarProps {
  active?: SidebarActiveKey;
  /** Kalau true, sidebar melebar + label teks + logo muncul, toggle icon jadi panah. */
  expanded?: boolean;
  /** Dipanggil saat tombol toggle (hamburger/panah) diklik. */
  onToggle?: () => void;
}

const items: { key: SidebarActiveKey; href: string; icon: typeof Home; label: string }[] = [
  { key: 'home', href: '/', icon: Home, label: 'Beranda' },
  { key: 'search', href: '/explore', icon: Search, label: 'Eksplor' },
  { key: 'library', href: '/library', icon: BookCopy, label: 'Library' },
  { key: 'profile', href: '/profile', icon: User, label: 'Profil' },
];

/**
 * Sidebar navigasi kiri, full-height sesuai spesifikasi Figma.
 * - Warna background: bg-header-bg (#F2F4ED)
 * - Border hanya di sebelah kanan menggunakan `border-r`.
 */
export function Sidebar({ active = 'home', expanded = false, onToggle }: SidebarProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      className={`sticky top-0 flex h-screen shrink-0 flex-col bg-header-bg border-r border-sidebar-border transition-[width] duration-200 ease-in-out ${
        expanded ? 'w-64 items-stretch gap-2.5 px-3 pt-6' : 'w-sidebar-collapsed items-center gap-2.5 pt-6'
      }`}
    >
      {/* Bagian Header Sidebar (Logo & Toggle Button) */}
      <div className={`mb-6 flex items-center ${expanded ? 'justify-between px-1' : 'justify-center'}`}>
        {expanded && <Logo size={28} />}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={expanded ? 'Tutup sidebar' : 'Buka sidebar'}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-primary transition-all active:scale-95 hover:bg-primary-overlay-hover active:bg-primary-overlay-active"
          >
            {expanded ? <ArrowLeft size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        )}
      </div>

      {/* Daftar Menu Navigasi */}
      {items.map(({ key, href, icon: Icon, label }) => {
        const isActive = key === active;
        return (
          <Link
            key={key}
            href={href}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center rounded-sm transition-all no-underline ${
              isActive 
                ? 'text-white bg-primary shadow-sm' 
                : 'text-text-muted hover:bg-primary-overlay-hover hover:text-primary'
            } ${expanded ? 'h-14 gap-3 px-6' : 'h-14 w-19 justify-center'}`}
          >
            <Icon size={24} strokeWidth={2} className="shrink-0" />
            {expanded && (
              <span className="font-sans whitespace-nowrap text-base font-medium">
                {label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}