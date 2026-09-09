"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  PenLine,
  BookOpenText,
  ChartColumnBig,
  MessageSquareMore,
  TriangleAlert,
} from "lucide-react";
import { BenefitListItem } from "@/domains/auth/presentation/molecules/benefit-list-item/benefit-list-item";

export interface BecomeAuthorModalProps {
  onClose?: () => void;
  onSuccessSubmit?: () => void;
  onStartWriting?: () => void;
  className?: string;
}

type ModalStep = "offer" | "confirm" | "success";

export const BecomeAuthorModal: React.FC<BecomeAuthorModalProps> = ({
  onClose,
  onSuccessSubmit,
  onStartWriting,
  className = "",
}) => {
  const [step, setStep] = useState<ModalStep>("offer");

  const handleConfirm = () => {
    onSuccessSubmit?.();
    setStep("success");
  };

  return (
    <div
      className={`w-full max-w-[832px] mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col font-['Poppins'] ${className}`}
    >
      {/* Step 1: Offer Screen */}
      {step === "offer" && (
        <div className="flex flex-col h-[871px] p-8 md:p-12 relative">
          {/* Tombol Back / Close */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-8 left-8 text-[#1B4E46] hover:opacity-70 transition-opacity p-1 cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Header / Title */}
          <div className="flex flex-col items-center gap-3 text-center mt-4 mb-6 shrink-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B4E46] leading-tight">
              Mulai menulis di JEDA
            </h1>
            <p className="text-lg md:text-xl font-medium text-[#1B4E46]/75 max-w-[641px] leading-relaxed">
              Jadi Author menambah kemampuan menulis ke akunmu — kamu enggak
              kehilangan apa pun dari akses Reader yang sudah kamu punya.
            </p>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
            {/* Section: YANG TETAP SAMA */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B4E46]/75">
                YANG TETAP SAMA
              </h2>
              <div className="flex flex-col gap-3">
                <BenefitListItem
                  align="start"
                  icon={<Check size={20} />}
                  text="Membaca, menyukai, komentar, dan bookmark tetap jalan seperti biasa"
                />
                <BenefitListItem
                  align="start"
                  icon={<Check size={20} />}
                  text="Riwayat baca dan seluruh aktivitasmu sebagai Reader tetap tersimpan"
                />
              </div>
            </div>

            {/* Section: YANG KAMU DAPAT */}
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B4E46]/75">
                YANG KAMU DAPAT
              </h2>
              <div className="flex flex-col gap-4">
                <BenefitListItem
                  icon={<PenLine size={22} />}
                  text="Tulis artikel dengan editor kaya fitur"
                />
                <BenefitListItem
                  icon={<BookOpenText size={22} />}
                  text="Simpan sebagai draft dengan auto-save, atau publikasikan langsung"
                />
                <BenefitListItem
                  icon={<ChartColumnBig size={22} />}
                  text="Dashboard performa: views, likes, komentar, dan simpan"
                />
                <BenefitListItem
                  icon={<MessageSquareMore size={22} />}
                  text="Kelola komentar yang masuk ke artikelmu sendiri"
                />
              </div>
            </div>

            {/* Warning Card */}
            <div className="bg-[#FFEEDA] border border-[#D97706]/20 rounded-2xl p-4 flex items-start gap-3">
              <TriangleAlert className="text-[#D97706] shrink-0 mt-0.5" size={24} />
              <p className="text-base font-medium text-[#D97706] leading-snug">
                Status Author bersifat permanen. Setelah diaktifkan, kamu tidak
                bisa kembali menjadi Reader murni lewat aplikasi.
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-100 shrink-0">
            <button
              type="button"
              onClick={() => setStep("confirm")}
              className="w-full h-13.5 bg-[#146C5D] hover:bg-[#1B4E46] text-white font-medium text-lg rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer"
            >
              Jadi author
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full h-13.5 bg-white border border-[#146C5D] text-[#146C5D] hover:bg-gray-50 font-medium text-lg rounded-lg transition-colors duration-150 flex items-center justify-center cursor-pointer"
            >
              Nanti dulu
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Confirmation Dialog */}
      {step === "confirm" && (
        <div className="flex flex-col items-center justify-center h-[871px] p-10 md:p-16 text-center gap-8">
          <div className="flex flex-col gap-3 max-w-[620px]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4E46]">
              Yakin mau jadi Author?
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#1B4E46]/75 leading-relaxed">
              Status ini permanen dan tidak bisa dibatalkan. Akses Reader-mu
              tetap ada, hanya bertambah kemampuan menulis.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 w-full max-w-[420px] mt-2">
            <button
              type="button"
              onClick={() => setStep("offer")}
              className="flex-1 h-12 bg-white border border-[#1B4E46] text-[#1B4E46] hover:bg-gray-50 font-medium text-base rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 h-12 bg-[#1B4E46] hover:bg-[#146C5D] text-white font-medium text-base rounded-lg transition-colors cursor-pointer"
            >
              Ya, jadi author
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success Screen */}
      {step === "success" && (
        <div className="flex flex-col items-center justify-center h-[871px] p-10 md:p-16 text-center gap-8">
          <div className="flex flex-col gap-3 max-w-[620px]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4E46] leading-tight">
              Selamat, kamu resmi jadi Author!
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#1B4E46]/75">
              Mulai tulis artikel pertamamu sekarang.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartWriting}
            className="w-full max-w-[480px] h-13.5 bg-[#1B4E46] hover:bg-[#146C5D] text-white font-medium text-lg rounded-lg transition-colors cursor-pointer"
          >
            Tulis artikel pertama
          </button>
        </div>
      )}
    </div>
  );
};

BecomeAuthorModal.displayName = "BecomeAuthorModal";

export default BecomeAuthorModal;