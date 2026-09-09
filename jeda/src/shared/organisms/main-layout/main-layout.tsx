"use client";

import React, { useState } from "react";
import { Sidebar, SidebarProps } from "@/shared/organisms/sidebar/sidebar";
import { HeaderGuest, HeaderGuestProps } from "@/shared/organisms/header-guest/header-guest";

export interface MainLayoutProps {
  /** Props yang diteruskan ke komponen Sidebar */
  sidebarProps?: Omit<SidebarProps, "collapsed" | "onToggleCollapse">;
  /** Props yang diteruskan ke komponen HeaderGuest */
  headerProps?: HeaderGuestProps;
  /** Konten utama yang akan ditampilkan di bawah header */
  children?: React.ReactNode;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  sidebarProps,
  headerProps,
  children,
  className = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`flex w-full h-screen overflow-hidden bg-[#F2F4ED] ${className}`}>
      {/* Sidebar di sebelah kiri (Fixed/Tidak ikut scroll) */}
      <Sidebar
        {...sidebarProps}
        collapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        className="shrink-0 z-20 h-screen sticky top-0"
      />

      {/* Kontainer Utama di sebelah kanan (Header + Content) */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden min-w-0">
        {/* Header di bagian atas (Fixed/Tidak ikut scroll) */}
        <HeaderGuest
          {...headerProps}
          className="shrink-0 z-10 sticky top-0"
        />

        {/* Area Konten Utama (Hanya area ini yang dapat di-scroll) */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F9FAF6]">
          {children}
        </main>
      </div>
    </div>
  );
};