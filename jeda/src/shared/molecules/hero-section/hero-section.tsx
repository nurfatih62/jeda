"use client";

import React from "react";
import { Typography, AuthStatus } from "@/shared/atoms/typography/typography";
import { Button } from "@/shared/atoms/button/button/button";

export interface HeroSectionProps {
  /** Status autentikasi / peran untuk teks default otomatis */
  authStatus?: AuthStatus;
  /** Teks judul utama */
  title?: string;
  /** Teks subtitle / deskripsi */
  subtitle?: string;
  /** Label tombol eksplorasi (outline) */
  exploreLabel?: string;
  /** Label tombol pendaftaran (solid) */
  registerLabel?: string;
  /** Callback saat tombol jelajahi diklik */
  onExploreClick?: () => void;
  /** Callback saat tombol daftar diklik */
  onRegisterClick?: () => void;
  /** Apakah tombol aksi ditampilkan (default: true untuk guest, false untuk logged-in/author) */
  showButtons?: boolean;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  authStatus = "guest",
  title,
  subtitle,
  exploreLabel = "Jelajahi dulu",
  registerLabel = "Daftar",
  onExploreClick,
  onRegisterClick,
  showButtons,
  className = "",
}) => {
  // Tombol aksi hanya muncul secara default jika guest
  const shouldShowButtons = showButtons !== undefined ? showButtons : authStatus === "guest";

  return (
    <div
      className={`
        box-border flex flex-col items-center 
        pt-8.75 px-4 gap-3 
        w-full max-w-331.25 mx-auto
        ${className}
      `}
    >
      {/* Frame 13: Container Judul & Subtitle dengan AuthStatus */}
      <div className="flex flex-col items-center gap-5.5 w-full max-w-259">
        <Typography variant="title" authStatus={authStatus}>
          {title}
        </Typography>
        <Typography variant="subtitle" authStatus={authStatus}>
          {subtitle}
        </Typography>
      </div>

      {/* Frame 50: Container Tombol Aksi (Hanya muncul untuk Guest) */}
      {shouldShowButtons && (
        <div className="flex flex-row justify-center items-center gap-3">
          <Button variant="outline" onClick={onExploreClick}>
            {exploreLabel}
          </Button>
          <Button variant="solid" onClick={onRegisterClick}>
            {registerLabel}
          </Button>
        </div>
      )}
    </div>
  );
};