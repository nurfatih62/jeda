"use client";

import React from "react";
import { Button } from "../../atom/button/button/button";
import { IconButton } from "../../atom/icon/icon button/icon";

export type ConfirmationModalVariant = "profile" | "password" | "custom";

export interface ConfirmationModalProps {
  /** Varian modal: "profile", "password", atau "custom" */
  variant?: ConfirmationModalVariant;
  /** Status apakah modal sedang terbuka */
  isOpen?: boolean;
  /** Judul utama modal (opsional, otomatis mengikuti varian jika kosong) */
  title?: string;
  /** Subteks deskripsi modal (opsional, otomatis mengikuti varian jika kosong) */
  description?: string;
  /** Label tombol batal */
  cancelText?: string;
  /** Label tombol konfirmasi */
  confirmText?: string;
  /** Callback ketika tombol kembali/tutup atau batal diklik */
  onClose?: () => void;
  /** Callback ketika tombol konfirmasi diklik */
  onConfirm?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  variant = "profile",
  isOpen = true,
  title,
  description,
  cancelText = "Batal",
  confirmText = "Ya, simpan",
  onClose,
  onConfirm,
  className = "",
}) => {
  if (!isOpen) return null;

  // Preset teks berdasarkan desain Figma untuk Ubah Profil & Ubah Password
  let presetTitle = "Yakin mau ubah profil?";
  let presetDescription = "Perubahan akan langsung terlihat oleh pengguna lain.";

  if (variant === "password") {
    presetTitle = "Yakin mau ubah password?";
    presetDescription = "Kamu mungkin perlu login ulang di perangkat lain setelah ini.";
  }

  const displayTitle = title !== undefined ? title : presetTitle;
  const displayDescription = description !== undefined ? description : presetDescription;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`
          relative box-border flex flex-col items-center justify-between
          w-full max-w-[739px] h-[466px] bg-white
          shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[6px] p-8 sm:p-12
          ${className}
        `}
      >
        {/* Tombol Back / Close di kiri atas */}
        <div className="absolute left-[46px] top-[30px]">
          <IconButton
            variant="arrowLeft"
            ariaLabel="Kembali"
            onClick={onClose}
          />
        </div>

        {/* Konten Teks Tengah */}
        <div className="flex flex-col items-center text-center gap-[29px] w-full max-w-[585px] mt-16">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
            {displayTitle}
          </h2>
          <p className="font-['Poppins'] font-medium text-[24px] leading-[28px] text-[#1B4E46]/75 m-0">
            {displayDescription}
          </p>
        </div>

        {/* Tombol Aksi Bawah (Batal & Ya, simpan) */}
        <div className="flex flex-row justify-between items-center w-full max-w-[337px] mb-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-[74px] h-[40px] text-[#146C5D] border-[#146C5D]"
          >
            {cancelText}
          </Button>

          <Button
            variant="solid"
            onClick={onConfirm}
            className="w-[122px] h-[40px] bg-[#146C5D] hover:bg-[#10564A] text-white"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.displayName = "ConfirmationModal";