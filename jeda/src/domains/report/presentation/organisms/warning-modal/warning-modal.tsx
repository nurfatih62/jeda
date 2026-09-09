"use client";

import React from "react";
import { Button } from "@/shared/atoms/button/button/button";

export interface WarningModalProps {
  title?: string;
  articleTitle?: string;
  reason?: string;
  buttonText?: string;
  onConfirm?: () => void;
  className?: string;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  title = "Kamu menerima peringatan",
  articleTitle = "Belajar Menulis Tiap Hari",
  reason = "Pelecehan atau bullying",
  buttonText = "Saya mengerti",
  onConfirm,
  className = "",
}) => {
  return (
    <div
      className={`
        relative w-full max-w-[832px] bg-white rounded-[6px] 
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8 md:p-12 
        flex flex-col items-center justify-between text-center 
        font-['Poppins',sans-serif] ${className}
      `}
    >
      {/* Header & Deskripsi Utama */}
      <div className="flex flex-col items-center gap-[24px] w-full max-w-[641px] mt-[20px]">
        <h2 className="font-bold text-[32px] md:text-[36px] leading-[32px] text-[#D97706]">
          {title}
        </h2>

        <p className="font-medium text-[20px] md:text-[24px] leading-[32px] text-[#1B4E46]/75">
          Komentarmu pada artikel{" "}
          <span className="font-bold text-[#1B4E46]">{`"${articleTitle}"`}</span>{" "}
          telah dihapus karena melanggar ketentuan komunitas kami.
        </p>
      </div>

      {/* Detail Alasan & Peringatan */}
      <div className="flex flex-col items-center gap-[8px] w-full max-w-[641px] my-[32px]">
        <p className="font-medium text-[20px] md:text-[24px] leading-[28px] text-[#1B4E46]/75">
          Alasan: <span className="font-bold text-[#1B4E46]">{reason}</span>
        </p>

        <p className="font-medium text-[14px] md:text-[16px] leading-[28px] text-[#1B4E46]/75">
          Pelanggaran berulang dapat menyebabkan akunmu dinonaktifkan.
        </p>
      </div>

      {/* Tombol Konfirmasi */}
      <div className="w-full max-w-[562px]">
        <Button
          type="button"
          variant="solid"
          onClick={onConfirm}
          className="w-full h-[54px] bg-[#146C5D] hover:bg-[#1B4E46] text-white font-medium text-[20px] leading-[24px] rounded-[6px] transition-colors"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

WarningModal.displayName = "WarningModal";
export default WarningModal;