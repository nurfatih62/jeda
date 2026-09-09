"use client";

import React from "react";

export type ReportDetailActionTone = "danger" | "warning" | "success";

export interface ReportDetailInfoCard {
  /** Label kecil di atas (mis. jenis konten / "Alasan Laporan") */
  label: string;
  /** Judul tebal */
  heading: string;
  /** Deskripsi kecil opsional (meta) */
  description?: string;
  /** Override kelas paragraf deskripsi */
  descriptionClassName?: string;
  /** Override kelas kartu */
  className?: string;
}

export interface ReportDetailAction {
  /** Teks tombol */
  label: string;
  /** Warna tombol */
  tone: ReportDetailActionTone;
  /** Handler klik */
  onClick?: () => void;
}

export interface ReportDetailModalProps {
  /** Status terbuka modal */
  isOpen?: boolean;
  /** Judul header */
  headerTitle?: string;
  /** Kartu-kartu informasi */
  infoCards?: ReportDetailInfoCard[];
  /** Daftar tombol aksi vertikal */
  actions?: ReportDetailAction[];
  /** Callback tombol close */
  onClose?: () => void;
  /** Override gap container (default gaya modal-ditindak) */
  bodyClassName?: string;
  /** Override kelas grup tombol aksi */
  actionsClassName?: string;
  /** Tambahan kelas CSS */
  className?: string;
}

const actionToneStyles: Record<ReportDetailActionTone, string> = {
  danger:
    "bg-[#DC2626]/16 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/25",
  warning:
    "bg-[#D97706]/16 border-[#D97706] text-[#D97706] hover:bg-[#D97706]/25",
  success:
    "bg-[#146C5D]/16 border-[#146C5D] text-[#146C5D] hover:bg-[#146C5D]/25",
};

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  isOpen = true,
  headerTitle = "Detail laporan",
  infoCards = [],
  actions = [],
  onClose,
  bodyClassName = "gap-6",
  actionsClassName = "gap-2",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className={`relative w-full max-w-[497px] bg-white rounded-[6px] p-8 shadow-[2px_4px_4px_rgba(0,0,0,0.2)] font-['Poppins'] flex flex-col ${bodyClassName} ${className}`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="font-bold text-[24px] leading-[26px] text-[#146C5D] m-0">
            {headerTitle}
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

        {infoCards.map((card, idx) => (
          <div
            key={idx}
            className={`w-full bg-[#FBF8F2] rounded-[6px] p-3 flex flex-col justify-center ${card.className ?? ""}`}
          >
            <span className="font-normal text-[12px] leading-[26px] text-black">
              {card.label}
            </span>
            <h3 className="font-bold text-[14px] leading-[26px] text-black m-0">
              {card.heading}
            </h3>
            {card.description && (
              <p
                className={`font-normal text-[12px] leading-[26px] text-black m-0 ${card.descriptionClassName ?? ""}`}
              >
                {card.description}
              </p>
            )}
          </div>
        ))}

        <div className={`flex flex-col w-full pt-2 ${actionsClassName}`}>
          {actions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              onClick={action.onClick}
              className={`w-full h-[42px] border rounded-[6px] font-bold text-[14px] leading-[26px] flex items-center justify-center transition-colors cursor-pointer ${actionToneStyles[action.tone]}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

ReportDetailModal.displayName = "ReportDetailModal";

export default ReportDetailModal;
