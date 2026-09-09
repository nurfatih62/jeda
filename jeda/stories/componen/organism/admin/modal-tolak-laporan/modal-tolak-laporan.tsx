"use client";

import React from "react";
import { AdminConfirmModal } from "../../../molecule/admin-confirm-modal/admin-confirm-modal";

export interface ModalTolakLaporanProps {
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
  /** Callback saat tombol 'Batal' diklik atau overlay ditutup */
  onCancel?: () => void;
  /** Callback saat tombol 'Konfirmasi' diklik */
  onConfirm?: () => void;
  /** Class CSS tambahan */
  className?: string;
}

export const ModalTolakLaporan: React.FC<ModalTolakLaporanProps> = ({
  isOpen = true,
  title = "Tolak laporan ini?",
  description = 'Laporan akan ditandai tidak melanggar ketentuan dan dipindahkan ke tab "Ditolak".',
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onCancel,
  onConfirm,
  className = "",
}) => {
  return (
    <AdminConfirmModal
      isOpen={isOpen}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      confirmTone="primary"
      cancelStyle="teal"
      onCancel={onCancel}
      onConfirm={onConfirm}
      boxClassName="max-w-[689px] min-h-[364px] px-8 py-[53px]"
      innerClassName="max-w-[425px]"
      actionsClassName="gap-6"
      className={className}
    />
  );
};
