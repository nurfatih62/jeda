"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { RadioOption } from "@/shared/atoms/radio-option/radio-option";

export interface ReportOption {
  id: string;
  label: string;
}

export interface ReportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmitReport?: (reason: string, details: string) => void;
  options?: ReportOption[];
  className?: string;
}

const defaultOptions: ReportOption[] = [
  { id: "spam", label: "Spam atau iklan" },
  { id: "nsfw", label: "Konten dewasa atau tidak pantas" },
  { id: "hate_speech", label: "Ujaran kebencian atau kekerasan" },
  { id: "hoax", label: "Informasi salah/hoaks" },
  { id: "other", label: "Lainnya" },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen = true,
  onClose,
  onSubmitReport,
  options = defaultOptions,
  className = "",
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;
    onSubmitReport?.(selectedReason, details);
  };

  return (
    /* Overlay Background Gelap Modal */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 font-['Poppins']">
      {/* Box Utama Modal Modal */}
      <div
        className={`relative w-full max-w-[1036px] bg-white rounded-lg shadow-xl p-8 md:p-12 flex flex-col gap-8 border border-gray-100 ${className}`}
      >
        {/* Tombol Close (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-7 left-8 text-[#146C5D] hover:opacity-75 transition-opacity cursor-pointer p-1 focus:outline-none"
          aria-label="Tutup modal"
        >
          <X size={28} />
        </button>

        {/* Judul Modal */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B4E46] text-center mt-2">
          Laporkan artikel ini
        </h1>

        {/* Form Laporan */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          {/* Radio Options List → atom RadioOption */}
          <div className="flex flex-col gap-4 pl-2 md:pl-12">
            {options.map((option) => (
              <RadioOption
                key={option.id}
                label={option.label}
                selected={selectedReason === option.id}
                onSelect={() => setSelectedReason(option.id)}
              />
            ))}
          </div>

          {/* Area Input Detail Tambahan */}
          <div className="flex flex-col gap-2 w-full max-w-[852px] mx-auto mt-2">
            <label
              htmlFor="report-details"
              className="text-base font-medium text-[#1B4E46]"
            >
              Detail tambahan (opsional)
            </label>
            <textarea
              id="report-details"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Jelaskan lebih lanjut jika perlu"
              className="w-full p-3 border border-[#C2C7D0] rounded-md text-sm text-[#1B4E46] placeholder:text-[#C2C7D0] focus:outline-none focus:border-[#146C5D] resize-y min-h-[70px]"
            />
          </div>

          {/* Tombol Kirim Laporan */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              disabled={!selectedReason}
              className={`w-full max-w-[562px] h-[54px] rounded-md font-medium text-xl text-white transition-colors duration-150 cursor-pointer ${
                selectedReason
                  ? "bg-[#146C5D] hover:bg-[#1B4E46]"
                  : "bg-[#146C5D]/50 cursor-not-allowed"
              }`}
            >
              Kirim laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReportModal.displayName = "ReportModal";

export default ReportModal;