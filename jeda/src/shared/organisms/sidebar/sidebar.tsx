"use client";

import React, { useState, useEffect } from "react";
import { SidebarButton, SidebarButtonVariant } from "@/shared/atoms/button/sidebar-button/sidebar-button";
import { IconButton } from "@/shared/atoms/icon/icon button/icon";

export interface SidebarProps {
  /** Varian menu yang sedang aktif saat ini */
  activeVariant?: SidebarButtonVariant;
  /** Status apakah sidebar sedang dalam mode kolaps (kecil) */
  collapsed?: boolean;
  /** Peran pengguna untuk menentukan tombol tambahan */
  role?: "reader" | "author" | "admin";
  /** Handler ketika salah satu menu sidebar diklik */
  onSelect?: (variant: SidebarButtonVariant) => void;
  /** Handler ketika tombol panah kembali/collapse di klik */
  onToggleCollapse?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeVariant: controlledActiveVariant,
  collapsed: propCollapsed = true,
  role = "reader",
  onSelect,
  onToggleCollapse,
  className = "",
}) => {
  // Tentukan default variant berdasarkan role
  const initialVariant = controlledActiveVariant ?? (role === "admin" ? "dashboard" : "home");

  // State internal untuk menu aktif dan mode collapse
  const [activeVariant, setActiveVariant] = useState<SidebarButtonVariant>(initialVariant);
  const [collapsed, setCollapsed] = useState<boolean>(propCollapsed);

  // Sinkronisasi dengan props jika berubah dari luar
  useEffect(() => {
    if (controlledActiveVariant !== undefined) {
      setActiveVariant(controlledActiveVariant);
    } else if (role === "admin" && activeVariant === "home") {
      setActiveVariant("dashboard");
    }
  }, [controlledActiveVariant, role]);

  useEffect(() => {
    if (propCollapsed !== undefined) {
      setCollapsed(propCollapsed);
    }
  }, [propCollapsed]);

  // Daftar menu navigasi berdasarkan role
  const getMenuItems = (): { variant: SidebarButtonVariant; label: string }[] => {
    if (role === "admin") {
      return [
        { variant: "dashboard" as const, label: "Dashboard" },
        { variant: "report" as const, label: "Laporan" },
        { variant: "users" as const, label: "Pengguna" },
        { variant: "tags" as const, label: "Kategori" },
        { variant: "profile" as const, label: "Profil" },
      ];
    }

    return [
      { variant: "home" as const, label: "Beranda" },
      ...(role === "author"
        ? [{ variant: "dashboard" as const, label: "Dashboard" }]
        : []),
      { variant: "explore" as const, label: "Eksplor" },
      { variant: "library" as const, label: "Library" },
      { variant: "profile" as const, label: "Profil" },
    ];
  };

  const menuItems = getMenuItems();

  const handleSelect = (variant: SidebarButtonVariant) => {
    setActiveVariant(variant);
    onSelect?.(variant);
  };

  const handleToggleCollapse = () => {
    const nextCollapsed = !collapsed;
    setCollapsed(nextCollapsed); 
    onToggleCollapse?.();
  };

  return (
    <aside
      className={`
        box-border flex flex-col bg-[#F2F4ED] transition-all duration-300 overflow-hidden
        ${collapsed ? "w-21.75 px-1.25 items-center" : "w-64 px-4 items-start"}
        h-screen border-r border-[#10564A] relative
        ${className}
      `}
    >
      {/* Header Sidebar: Logo JEDA & Tombol Collapse / Menu */}
      <div 
        className={`
          flex items-center w-full mb-7 pt-8
          ${collapsed ? "justify-center px-0" : "justify-between px-2"}
        `}
      >
        {!collapsed && (
          <span className="font-serif font-bold text-[40px] leading-7 text-[#10564A] whitespace-nowrap overflow-hidden transition-all duration-300">
            JEDA
          </span>
        )}
        <IconButton
          variant={collapsed ? "menu" : "arrowLeft"}
          onClick={handleToggleCollapse}
          ariaLabel={collapsed ? "Buka Sidebar" : "Tutup atau Ciutkan Sidebar"}
        />
      </div>

      {/* Daftar Tombol Navigasi */}
      <nav className="flex flex-col gap-2.5 w-full items-center px-1">
        {menuItems.map((item) => (
          <SidebarButton
            key={item.variant}
            variant={item.variant}
            label={item.label}
            active={activeVariant === item.variant}
            collapsed={collapsed}
            onClick={() => handleSelect(item.variant)}
          />
        ))}
      </nav>
    </aside>
  );
};