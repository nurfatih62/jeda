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
 * Layout: Sidebar (full-height, kolom kiri) bersebelahan dengan kolom kanan
 * (Header di atas + main content di bawahnya) — BUKAN Header full-width lalu
 * Sidebar+main di bawahnya. Ini sesuai referensi desain: Sidebar mentok dari
 * atas ke bawah, Header cuma di kolom kanan.
 *
 * Saat Sidebar expanded: logo JEDA pindah ke dalam Sidebar, jadi Header
 * matiin logo-nya sendiri (showLogo={false}) biar gak dobel.
 */
export function AppShell({ activeSidebarKey = 'home', children }: AppShellProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  function toggleSidebar() {
    setSidebarExpanded((prev) => !prev);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        active={activeSidebarKey}
        expanded={sidebarExpanded}
        onToggle={toggleSidebar}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header showLogo={!sidebarExpanded} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
 