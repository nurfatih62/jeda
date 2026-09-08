"use client";

import React from "react";

export interface ModalDitindakProps {
  /** Menyimpan status apakah modal terbuka */
  isOpen?: boolean;
  /** Tipe konten yang dilaporkan */
  contentType?: string;
  /** Judul konten yang dilaporkan */
  contentTitle?: string;
  /** Informasi metadata tambahan */
  contentMeta?: string;
  /** Alasan laporan */
  reportReason?: string;
  /** Callback ketika modal ditutup */
  onClose?: () => void;
  /** Callback saat tombol 'Hapus konten' diklik */
  onDeleteContent?: () => void;
  /** Callback saat tombol 'Peringatkan pengguna' diklik */
  onWarnUser?: () => void;
  /** Callback saat tombol 'Tolak laporan' diklik */
  onRejectReport?: () => void;
  /** Class tambahan */
  className?: string;
}

export const ModalDitindak: React.FC<ModalDitindakProps> = ({
  isOpen = true,
  contentType = "Artikel",
  contentTitle = "Kenapa Kita Suka Cerita Sedih",
  contentMeta = "Artikel oleh Asya mc, dipublikasikan 3 hari lalu. Views: 2.4K.",
  reportReason = "Informasi salah/hoaks",
  onClose,
  onDeleteContent,
  onWarnUser,
  onRejectReport,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-[497px] bg-white rounded-[6px] p-8 shadow-[2px_4px_4px_rgba(0,0,0,0.2)] font-['Poppins'] flex flex-col gap-6 ${className}`}
      >
        {/* Header: Title & Close Button */}
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

        {/* Card Informasional 1: Detail Konten */}
        <div className="w-full bg-[#FBF8F2] rounded-[6px] p-3 flex flex-col justify-center">
          <span className="font-normal text-[12px] leading-[26px] text-black">
            {contentType}
          </span>
          <h3 className="font-bold text-[14px] leading-[26px] text-black m-0">
            {contentTitle}
          </h3>
          <p className="font-normal text-[12px] leading-[26px] text-black m-0">
            {contentMeta}
          </p>
        </div>

        {/* Card Informasional 2: Alasan Laporan */}
        <div className="w-full bg-[#FBF8F2] rounded-[6px] p-3 flex flex-col justify-center">
          <span className="font-normal text-[12px] leading-[26px] text-black">
            Alasan Laporan
          </span>
          <h3 className="font-bold text-[14px] leading-[26px] text-black m-0">
            {reportReason}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full pt-2">
          {/* Tombol Hapus Konten */}
          <button
            type="button"
            onClick={onDeleteContent}
            className="w-full h-[42px] bg-[#DC2626]/16 border border-[#DC2626] rounded-[6px] text-[#DC2626] font-bold text-[14px] leading-[26px] flex items-center justify-center hover:bg-[#DC2626]/25 transition-colors cursor-pointer"
          >
            Hapus konten
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