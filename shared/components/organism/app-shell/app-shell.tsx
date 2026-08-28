"use client";

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import type { SidebarActiveKey } from '../sidebar/sidebar';

export interface AppShellProps {
  activeSidebarKey?: SidebarActiveKey;
  children: ReactNode;
}

/**
 * Bungkus Header + Sidebar buat semua halaman.
 * State expand/collapse sidebar dipegang di sini (client), bisa dipicu dari
 * dua tempat: hamburger di Header, ATAU tombol tutup di dalam Sidebar sendiri
 * (yang cuma muncul pas expanded).
 */
export function AppShell({ activeSidebarKey = 'home', children }: AppShellProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  function toggleSidebar() {
    setSidebarExpanded((prev) => !prev);
  }

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar
          active={activeSidebarKey}
          expanded={sidebarExpanded}
          onToggle={toggleSidebar}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
