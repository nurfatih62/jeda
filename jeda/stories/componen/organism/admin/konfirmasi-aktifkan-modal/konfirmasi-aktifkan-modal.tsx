"use client";

import React from "react";

export interface KonfirmasiAktifkanModalProps {
  /** Controlling visibility modal */
  isOpen: boolean;
  /** Nama pengguna yang akan diaktifkan kembali */
  userName?: string;
  /** Handler saat tombol Batal diklik */
  onClose: () => void;
  /** Handler saat tombol Konfirmasi diklik */
  onConfirm: () => void;
  /** Custom class CSS tambahan untuk wrapper modal */
  className?: string;
}

export const KonfirmasiAktifkanModal: React.FC<
  KonfirmasiAktifkanModalProps
> = ({
  isOpen,
  userName = "Budi R.",
  onClose,
  onConfirm,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-['Poppins']">
      {/* Modal Box */}
      <div
        className={`relative w-full max-w-[689px] min-h-[373px] bg-white rounded-[6px] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] p-[53px_32px] sm:p-[53px_132px] flex flex-col justify-center items-center ${className}`}
      >
        <div className="flex flex-col items-center w-full max-w-[423px] gap-[91px]">
          {/* Header & Subtitle Section */}
          <div className="flex flex-col items-center gap-[29px] w-full text-center">
            <h2 className="font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0 max-w-[460px]">
              Aktifkan kembali akun {userName}?
            </h2>
            <p className="font-medium text-[20px] leading-[28px] text-[#1B4E46]/75 m-0 max-w-[395px]">
              Aktifkan kembali akun {userName}?
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex flex-row items-center justify-center gap-[93px] w-full">
            {/* Button Batal */}
            <button
              type="button"
              onClick={onClose}
              className="w-[181px] h-[40px] px-4 py-2 border border-[#1B4E46] rounded-[6px] bg-transparent text-[#1B4E46] font-medium text-[16px] leading-[24px] hover:bg-[#1B4E46]/10 transition-colors cursor-pointer flex items-center justify-center"
            >
              Batal
            </button>

            {/* Button Konfirmasi */}
            <button
              type="button"
              onClick={onConfirm}
              className="w-[165px] h-[40px] px-4 py-2 bg-[#146C5D] rounded-[6px] text-white font-medium text-[16px] leading-[24px] hover:bg-[#146C5D]/90 transition-colors cursor-pointer flex items-center justify-center border-none shadow-[inset_0_0_0_100px_rgba(0,0,0,0.2)]"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};