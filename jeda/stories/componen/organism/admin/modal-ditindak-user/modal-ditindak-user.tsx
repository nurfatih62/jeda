"use client";

import React from "react";

export interface ModalDitindakUserProps {
  /** Status modal terbuka */
  isOpen?: boolean;
  /** Tipe akun/entitas */
  accountType?: string;
  /** Username atau nama akun yang dilaporkan */
  username?: string;
  /** Deskripsi detail mengenai akun */
  accountMeta?: string;
  /** Alasan laporan */
  reportReason?: string;
  /** Callback saat modal ditutup */
  onClose?: () => void;
  /** Callback saat tombol 'Suspend' diklik */
  onSuspendUser?: () => void;
  /** Callback saat tombol 'Peringatkan pengguna' diklik */
  onWarnUser?: () => void;
  /** Callback saat tombol 'Tolak laporan' diklik */
  onRejectReport?: () => void;
  /** Class tambahan */
  className?: string;
}

export const ModalDitindakUser: React.FC<ModalDitindakUserProps> = ({
  isOpen = true,
  accountType = "Akun",
  username = "akun @ceritakelam99",
  accountMeta = "Akun terdaftar 2 hari lalu, menggunakan nama dan foto mirip Author lain.",
  reportReason = "Akun palsu (impersonasi)",
  onClose,
  onSuspendUser,
  onWarnUser,
  onRejectReport,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Container Modal */}
      <div
        className={`relative w-full max-w-[497px] bg-white rounded-[6px] p-8 shadow-[2px_4px_4px_rgba(0,0,0,0.2)] font-['Poppins'] flex flex-col gap-[18px] ${className}`}
      >
        {/* Header Modal */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="font-bold text-[24px] leading-[26px] text-[#146C5D] m-0">
            Detail laporan
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#146C5D] hover:bg-[#146C5D]/10 rounded-full transition-colors cursor-pointer border-none bg-transparent"
            aria-label="Tutup Modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* Informasi Akun */}
        <div className="w-full bg-[#FBF8F2] rounded-[6px] p-3 flex flex-col justify-center min-h-[110px]">
          <span className="font-normal text-[12px] leading-[26px] text-black">
            {accountType}
          </span>
          <h3 className="font-bold text-[14px] leading-[26px] text-black m-0">
            {username}
          </h3>
          <p className="font-normal text-[12px] leading-[26px] text-black m-0 mt-1">
            {accountMeta}
          </p>
        </div>

        {/* Alasan Laporan */}
        <div className="w-full bg-[#FBF8F2] rounded-[6px] p-3 flex flex-col justify-center h-[77px]">
          <span className="font-normal text-[12px] leading-[26px] text-black">
            Alasan Laporan
          </span>
          <h3 className="font-bold text-[14px] leading-[26px] text-black m-0">
            {reportReason}
          </h3>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-1.5 w-full pt-2">
          {/* Tombol Suspend */}
          <button
            type="button"
            onClick={onSuspendUser}
            className="w-full h-[42px] bg-[#DC2626]/16 border border-[#DC2626] rounded-[6px] text-[#DC2626] font-bold text-[14px] leading-[26px] flex items-center justify-center hover:bg-[#DC2626]/25 transition-colors cursor-pointer"
          >
            Suspend
          </button>

          {/* Tombol Peringatkan Pengguna */}
          <button
            type="button"
            onClick={onWarnUser}
            className="w-full h-[42px] bg-[#D97706]/16 border border-[#D97706] rounded-[6px] text-[#D97706] font-bold text-[14px] leading-[26px] flex items-center justify-center hover:bg-[#D97706]/25 transition-colors cursor-pointer"
          >
            Peringatkan pengguna
          </button>

          {/* Tombol Tolak Laporan */}
          <button
            type="button"
            onClick={onRejectReport}
            className="w-full h-[42px] bg-[#146C5D]/16 border border-[#146C5D] rounded-[6px] text-[#146C5D] font-bold text-[14px] leading-[26px] flex items-center justify-center hover:bg-[#146C5D]/25 transition-colors cursor-pointer"
          >
            Tolak laporan
          </button>
        </div>
      </div>
    </div>
  );
};