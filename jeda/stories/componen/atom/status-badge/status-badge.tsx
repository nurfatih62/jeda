"use client";

import React from "react";

export type StatusBadgeTone =
  | "teal-solid"
  | "muted"
  | "amber"
  | "teal-soft"
  | "neutral"
  | "red-soft"
  | "blue-soft"
  | "gray-soft";

export interface StatusBadgeProps {
  /** Teks label badge */
  label?: string;
  /** Kunci warna — dipetakan persis dari gaya badge yang sudah ada di organism */
  tone?: StatusBadgeTone;
  /** Tambahan kelas CSS opsional (mis. font/leading khas tiap tabel admin) */
  className?: string;
}

const toneStyles: Record<StatusBadgeTone, string> = {
  // author-dashboard: badge "Publikasi"
  "teal-solid": "bg-[#146C5D]/50 text-[#1B4E46]",
  // author-dashboard: badge "Draft"
  muted: "bg-[rgba(16,29,19,0.16)] text-[#162D13]/75",
  // admin-laporan & admin-dashboard: "Pending" / "Publikasi"
  amber: "bg-[#D97706]/16 text-[#D97706]",
  // admin-laporan "Ditindak", manajemen-pengguna "Aktif"
  "teal-soft": "bg-[#146C5D]/16 text-[#146C5D]",
  // admin-laporan "Ditolak"
  neutral: "bg-[#000000]/10 text-[#000000]/60",
  // manajemen-pengguna "Disuspend"
  "red-soft": "bg-[#DC2626]/16 text-[#DC2626]",
  // manajemen-pengguna peran "Author"
  "blue-soft": "bg-[#0088FF]/16 text-[#0088FF]",
  // manajemen-pengguna peran "Reader"
  "gray-soft": "bg-[#999999]/16 text-[#6B7280]",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label = "Publikasi",
  tone = "teal-solid",
  className = "",
}) => {
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-sm font-normal whitespace-nowrap text-center ${toneStyles[tone]} ${className}`}
    >
      {label}
    </span>
  );
};

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
