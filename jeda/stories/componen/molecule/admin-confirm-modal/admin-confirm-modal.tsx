"use client";

import React from "react";

export type AdminConfirmTone = "warning" | "primary" | "danger" | "teal-flat" | "danger-flat";

export interface AdminConfirmModalProps {
  /** Status terbuka modal */
  isOpen?: boolean;
  /** Judul modal */
  title?: string;
  /** Deskripsi penjelasan */
  description?: string;
  /** Label tombol konfirmasi */
  confirmLabel?: string;
  /** Label tombol batal */
  cancelLabel?: string;
  /** Warna tombol konfirmasi (sesuai varian asli tiap modal) */
  confirmTone?: AdminConfirmTone;
  /** Gaya tombol batal: border teal (#146C5D) atau dark (#1B4E46) */
  cancelStyle?: "teal" | "dark";
  /** Callback tombol batal */
  onCancel?: () => void;
  /** Callback tombol konfirmasi */
  onConfirm?: () => void;
  /** Override kelas overlay */
  overlayClassName?: string;
  /** Override kelas box modal */
  boxClassName?: string;
  /** Override kelas wrapper konten dalam */
  innerClassName?: string;
  /** Override kelas baris tombol aksi */
  actionsClassName?: string;
  /** Tambahan kelas CSS */
  className?: string;
}

const confirmToneStyles: Record<AdminConfirmTone, string> = {
  // modal-kirim-peringatan: oranye warning
  warning:
    "bg-[#D97706] border-none text-white hover:bg-[#b45309]",
  // modal-tolak-laporan: teal tua + shadow-inner
  primary:
    "bg-[#146C5D] border-none text-white hover:bg-[#0f5247] shadow-inner",
  // modal-konfirmasi-hapus: merah muda
  danger:
    "bg-[#F87171] border-none text-white hover:bg-[#ef4444]",
  // konfirmasi-aktifkan: teal + shadow inset + hover 90%
  "teal-flat":
    "bg-[#146C5D] border-none text-white hover:bg-[#146C5D]/90 shadow-[inset_0_0_0_100px_rgba(0,0,0,0.2)]",
  // konfirmasi-suspend: merah muda flat
  "danger-flat":
    "bg-[#F87171] border-none text-white hover:bg-[#F87171]/90",
};

const cancelStyles: Record<"teal" | "dark", string> = {
  teal: "border-[#146C5D] text-[#146C5D] hover:bg-[#146C5D]/10",
  dark: "border-[#1B4E46] text-[#1B4E46] hover:bg-[#1B4E46]/10",
};

export const AdminConfirmModal: React.FC<AdminConfirmModalProps> = ({
  isOpen = true,
  title = "Kirim peringatan ke pengguna?",
  description = 'Pengguna akan menerima notifikasi peringatan. Konten tetap ada, laporan akan tercatat sebagai "Ditindak".',
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  confirmTone = "warning",
  cancelStyle = "teal",
  onCancel,
  onConfirm,
  overlayClassName = "bg-black/50",
  boxClassName = "max-w-[689px] min-h-[396px] px-8 py-[53px]",
  innerClassName = "max-w-[425px]",
  actionsClassName = "gap-6",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 ${overlayClassName}`}
    >
      <div
        className={`relative w-full h-auto bg-white rounded-[6px] shadow-[2px_4px_4px_rgba(0,0,0,0.2)] font-['Poppins'] flex flex-col justify-center items-center ${boxClassName} ${className}`}
      >
        <div className={`flex flex-col items-center w-full gap-[91px] ${innerClassName}`}>
          <div className="flex flex-col items-center w-full gap-[29px] text-center">
            <h2 className="font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0 max-w-[460px]">
              {title}
            </h2>
            <p className="font-medium text-[20px] leading-[28px] text-[#1B4E46]/75 m-0 max-w-[395px]">
              {description}
            </p>
          </div>

          <div className={`flex flex-row items-center justify-center w-full ${actionsClassName}`}>
            <button
              type="button"
              onClick={onCancel}
              className={`w-[181px] h-[40px] px-4 py-2 border rounded-[6px] bg-transparent font-medium text-[16px] leading-[24px] flex items-center justify-center transition-colors cursor-pointer ${cancelStyles[cancelStyle]}`}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`w-[165px] h-[40px] px-4 py-2 rounded-[6px] font-medium text-[16px] leading-[24px] flex items-center justify-center transition-colors cursor-pointer ${confirmToneStyles[confirmTone]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminConfirmModal.displayName = "AdminConfirmModal";

export default AdminConfirmModal;
