"use client";

import React from "react";

export interface ModalKonfirmasiHapusProps {
  /** Controlling status terbuka modal */
  isOpen?: boolean;
  /** Judul konfirmasi */
  title?: string;
  /** Pesan deskripsi konfirmasi */
  description?: string;
  /** Label untuk tombol konfirmasi */
  confirmLabel?: string;
  /** Label untuk tombol batal */
  cancelLabel?: string;
  /** Callback saat tombol 'Batal' diklik atau modal ditutup */
  onCancel?: () => void;
  /** Callback saat tombol 'Konfirmasi' diklik */
  onConfirm?: () => void;
  /** Class CSS tambahan */
  className?: string;
}

export const ModalKonfirmasiHapus: React.FC<ModalKonfirmasiHapusProps> = ({
  isOpen = true,
  title = "Hapus konten ini?",
  description = 'Konten akan dihapus permanen dari platform. Tindakan ini akan tercatat sebagai "Ditindak".',
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onCancel,
  onConfirm,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Box */}
      <div
        className={`relative w-full max-w-[689px] h-auto min-h-[364px] bg-white rounded-[6px] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] font-['Poppins'] flex flex-col justify-center items-center px-8 py-[53px] ${className}`}
      >
        <div className="flex flex-col items-center w-full max-w-[423px] gap-[91px]">
          {/* Header & Description */}
          <div className="flex flex-col items-center w-full gap-[29px] text-center">
            <h2 className="font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
              {title}
            </h2>
            <p className="font-medium text-[20px] leading-[28px] text-[#1B4E46]/75 m-0 max-w-[395px]">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-6 w-full">
            {/* Tombol Batal */}
            <button
              type="button"
              onClick={onCancel}
              className="w-[181px] h-[40px] px-4 py-2 border border-[#146C5D] rounded-[6px] bg-transparent text-[#146C5D] font-medium text-[16px] leading-[24px] flex items-center justify-center hover:bg-[#146C5D]/10 transition-colors cursor-pointer"
            >
              {cancelLabel}
            </button>

            {/* Tombol Konfirmasi */}
            <button
              type="button"
              onClick={onConfirm}
              className="w-[165px] h-[40px] px-4 py-2 bg-[#F87171] border-none rounded-[6px] text-white font-medium text-[16px] leading-[24px] flex items-center justify-center hover:bg-[#ef4444] transition-colors cursor-pointer"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};