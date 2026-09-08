"use client";

import React from "react";
import { Button } from "../../../atom/button/button/button";
import { EditProfileForm } from "../edit-profile-form/edit-profile-form";
import { ChangePasswordForm } from "../change-password-form/change-password-form";

export type ProfilePageVariant = "guest" | "user" | "author";

export interface ProfilePageProps {
  /** Varian halaman: "guest" (belum login), "user" (sudah login biasa), "author" (sudah jadi author, tanpa tombol gabung) */
  variant?: ProfilePageVariant;
  /** Judul utama halaman (default: "Profil") */
  title?: string;
  
  // --- Props untuk Varian Guest / Belum Login ---
  /** Judul banner ajakan bergabung */
  bannerTitle?: string;
  /** Deskripsi banner ajakan bergabung */
  bannerDescription?: string;
  /** Teks tombol sekunder/outline (default: "Daftar") */
  secondaryButtonText?: string;
  /** Teks tombol utama/solid (default: "Masuk") */
  primaryButtonText?: string;
  /** Handler ketika tombol outline/sekunder diklik */
  onSecondaryClick?: () => void;
  /** Handler ketika tombol solid/utama diklik */
  onPrimaryClick?: () => void;

  // --- Props untuk Varian User / Author (Sudah Login) ---
  /** Nama awal / username saat ini */
  initialUsername?: string;
  /** Deskripsi / bio awal saat ini */
  initialDescription?: string;
  /** URL avatar saat ini */
  initialAvatar?: string;
  /** Teks tombol aksi di header (default: "Gabung sebagai author") */
  joinAuthorButtonText?: string;
  /** Handler saat tombol aksi di header diklik */
  onJoinAuthor?: () => void;
  /** Handler saat form edit profil disubmit */
  onEditProfileSubmit?: (data: { username: string; description: string; avatarFile?: File }) => void;
  /** Handler saat form ubah password disubmit */
  onChangePasswordSubmit?: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
  /** Handler saat link "Lupa password lama?" diklik */
  onForgotPassword?: () => void;

  /** Tambahan kelas CSS */
  className?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  variant = "guest",
  title = "Profil",
  
  // Guest defaults
  bannerTitle = "Bergabung untuk mendapat pengalaman lebih",
  bannerDescription = "Ayo bergabung untuk dapat membuat profil menyesuaikan dengan dirimu, dilihat oleh orang lain dan pengalaman lainnya",
  secondaryButtonText = "Daftar",
  primaryButtonText = "Masuk",
  onSecondaryClick,
  onPrimaryClick,

  // Logged-in defaults
  initialUsername,
  initialDescription,
  initialAvatar,
  joinAuthorButtonText = "Gabung sebagai author",
  onJoinAuthor,
  onEditProfileSubmit,
  onChangePasswordSubmit,
  onForgotPassword,

  className = "",
}) => {
  // === 1. TAMPILAN JIKA SUDAH LOGIN (USER ATAU AUTHOR) ===
  if (variant === "user" || variant === "author") {
    return (
      <div
        className={`
          w-full max-w-[1183px] min-h-[768px] mx-auto flex flex-col 
          p-4 sm:p-6 box-border bg-transparent gap-[63px] ${className}
        `}
      >
        {/* Header Halaman: Judul "Profil" & Tombol Aksi (Hanya muncul jika varian "user") */}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
            {title}
          </h1>
          {variant === "user" && (
            <Button
              variant="solid"
              onClick={onJoinAuthor}
              className="w-auto h-[40px] px-[16px] py-[8px]"
            >
              {joinAuthorButtonText}
            </Button>
          )}
        </div>

        {/* Bagian 1: Form Edit Profil */}
        <EditProfileForm
          initialUsername={initialUsername}
          initialDescription={initialDescription}
          initialAvatar={initialAvatar}
          onSubmit={onEditProfileSubmit}
        />

        {/* Garis Pemisah (Divider) */}
        <div className="w-full border-t border-[#1B4E46]" />

        {/* Bagian 2: Form Ubah Password */}
        <ChangePasswordForm
          onForgotPassword={onForgotPassword}
          onSubmit={onChangePasswordSubmit}
        />
      </div>
    );
  }

  // === 2. TAMPILAN GUEST / BELUM LOGIN (Default) ===
  return (
    <div
      className={`
        w-full max-w-[1152px] min-h-[768px] mx-auto flex flex-col 
        p-4 sm:p-6 box-border bg-transparent ${className}
      `}
    >
      {/* Header: Judul "Profil" */}
      <div className="w-full flex items-start mb-16">
        <h1 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
          {title}
        </h1>
      </div>

      {/* Bagian Konten Tengah (Banner Ajakan Bergabung) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-[1036px] mx-auto gap-6 pb-20">
        {/* Teks Judul & Deskripsi Banner */}
        <div className="flex flex-col items-center gap-5 w-full">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[40px] sm:leading-[32px] text-[#1B4E46] m-0">
            {bannerTitle}
          </h2>
          <p className="font-['Poppins'] font-medium text-[20px] sm:text-[24px] leading-[28px] text-[#1B4E46]/75 max-w-[900px] m-0">
            {bannerDescription}
          </p>
        </div>

        {/* Tombol Aksi (Outline & Solid) */}
        <div className="flex flex-row justify-center items-center gap-3 mt-4">
          <Button variant="outline" onClick={onSecondaryClick}>
            {secondaryButtonText}
          </Button>
          <Button variant="solid" onClick={onPrimaryClick}>
            {primaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProfilePage.displayName = "ProfilePage";