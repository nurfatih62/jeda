"use client";

import Link from 'next/link';
import { Home, Search, BookCopy, User, PanelLeftClose } from 'lucide-react';
import { Logo } from '../../atom/logo/logo';

export type SidebarActiveKey = 'home' | 'search' | 'library' | 'profile';

export interface SidebarProps {
  active?: SidebarActiveKey;
  /** Kalau true, sidebar melebar + label teks + logo + tombol tutup muncul. */
  expanded?: boolean;
  /** Dipanggil saat tombol tutup (di dalam sidebar, cuma muncul pas expanded) diklik. */
  onToggle?: () => void;
}

const items: { key: SidebarActiveKey; href: string; icon: typeof Home; label: string }[] = [
  { key: 'home', href: '/', icon: Home, label: 'Beranda' },
  { key: 'search', href: '/explore', icon: Search, label: 'Eksplor' },
  { key: 'library', href: '/library', icon: BookCopy, label: 'Library' },
  { key: 'profile', href: '/login', icon: User, label: 'Profil' },
];

/**
 * Sidebar navigasi kiri.
 * - Collapsed: 108px, cuma icon, dibedain aktif/nonaktif lewat opacity
 *   (bukan background fill — sesuai spec Figma, gak ada bg solid di item aktif).
 * - Expanded: 256px, ada logo JEDA + tombol tutup di atas, icon+label di tiap item.
 */
export function Sidebar({ active = 'home', expanded = false, onToggle }: SidebarProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      className={`sticky top-21 flex h-[calc(100vh-84px)] shrink-0 flex-col bg-[#F2F4ED] transition-[width] duration-200 ease-in-out ${
        expanded ? 'm-5 w-64 items-stretch gap-2.5 rounded-lg p-3' : 'w-27 items-center gap-2.5 pt-8'
      }`}
    >
      {expanded && (
        <div className="mb-6 flex items-center justify-between px-1 pt-1">
          <Logo size={28} />
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Tutup sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-primary hover:bg-primary-overlay-hover"
            >
              <PanelLeftClose size={20} strokeWidth={2} />
            </button>
          )}
        </div>
      )}

      {items.map(({ key, href, icon: Icon, label }) => {
        const isActive = key === active;
        return (
          <Link
            key={key}
            href={href}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center rounded-md text-primary transition-opacity ${
              isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
            } ${expanded ? 'h-14 gap-3 px-6' : 'h-14 w-19 justify-center'}`}
          >
            <Icon size={24} strokeWidth={2} className="shrink-0" />
            {expanded && (
              <span className="font-sans whitespace-nowrap text-base font-medium">{label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
