"use client";

import React from "react";
import { AdminConfirmModal } from "../../../molecule/admin-confirm-modal/admin-confirm-modal";

export interface ModalKirimPeringatanProps {
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

export const ModalKirimPeringatan: React.FC<ModalKirimPeringatanProps> = ({
  isOpen = true,
  title = "Kirim peringatan ke pengguna?",
  description = 'Pengguna akan menerima notifikasi peringatan. Konten tetap ada, laporan akan tercatat sebagai "Ditindak".',
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
      confirmTone="warning"
      cancelStyle="teal"
      onCancel={onCancel}
      onConfirm={onConfirm}
      className={className}
    />
  );
};
