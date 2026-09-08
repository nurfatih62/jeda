"use client";

import React from "react";
import { 
  Home, 
  Compass, 
  Library, 
  User, 
  LayoutDashboard, 
  Flag, 
  Users, 
  Tag, 
  type LucideIcon 
} from "lucide-react";

export type SidebarButtonVariant =
  | "home"
  | "explore"
  | "library"
  | "profile"
  | "dashboard"
  | "report"
  | "users"
  | "tags";

export interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Pilihan jenis menu sidebar (otomatis mengganti ikon dan label) */
  variant?: SidebarButtonVariant;
  /** Teks label (opsional, jika ingin custom) */
  label?: string;
  /** Komponen ikon (opsional, jika ingin custom) */
  icon?: LucideIcon;
  /** Status aktif tombol pada sidebar */
  active?: boolean;
  /** Mode kolaps (hanya menampilkan ikon) */
  collapsed?: boolean;
}

// Konfigurasi pemetaan ikon dan label berdasarkan varian
const variantConfig: Record<SidebarButtonVariant, { label: string; icon: LucideIcon }> = {
  home: { label: "Beranda", icon: Home },
  explore: { label: "Eksplor", icon: Compass },
  library: { label: "Library", icon: Library },
  profile: { label: "Profile", icon: User },
  dashboard: { label: "Dashboard", icon: LayoutDashboard },
  report: { label: "Laporan", icon: Flag },
  users: { label: "Pengguna", icon: Users },
  tags: { label: "Kategori", icon: Tag },
};

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  variant = "home",
  label,
  icon,
  active = false,
  collapsed = false,
  className = "",
  ...props
}) => {
  const currentConfig = variantConfig[variant] || variantConfig.home;
  const displayLabel = label ?? currentConfig.label;
  const IconComponent = icon ?? currentConfig.icon;

  return (
    <button
      type="button"
      title={collapsed ? displayLabel : undefined}
      aria-label={collapsed ? displayLabel : undefined}
      className={`
        group box-border flex items-center rounded-md
        font-medium text-[16px] leading-6 h-14 w-full
        transition-all duration-300 cursor-pointer border-none outline-none
        ${collapsed ? "justify-center px-0" : "justify-start px-4 gap-3.25"}
        ${
          active 
            ? "bg-[#10564A] text-white" 
            : "bg-transparent text-[#10564A] hover:bg-[#10564A]/10"
        }
        ${className}
      `}
      {...props}
    >
      {IconComponent && (
        <IconComponent 
          size={24} 
          className="shrink-0 stroke-[currentColor] transition-colors duration-150" 
        />
      )}
      {/* Teks label diberi efek transisi opacity & lebar agar mulus saat sidebar menyusut */}
      <span 
        className={`
          whitespace-nowrap overflow-hidden transition-all duration-300
          ${collapsed ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-150"}
        `}
      >
        {displayLabel}
      </span>
    </button>
  );
};