"use client";

import React from "react";
import { AdminConfirmModal } from "@/domains/admin/presentation/molecules/admin-confirm-modal/admin-confirm-modal";

export interface ModalKonfirmasiHapusProps {
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

export const ModalKonfirmasiHapus: React.FC<ModalKonfirmasiHapusProps> = ({
  isOpen = true,
  title = "Hapus konten ini?",
  description = 'Konten akan dihapus permanen dari platform. Tindakan ini akan tercatat sebagai "Ditindak".',
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
      confirmTone="danger"
      cancelStyle="teal"
      onCancel={onCancel}
      onConfirm={onConfirm}
      boxClassName="max-w-[689px] min-h-[364px] px-8 py-[53px]"
      innerClassName="max-w-[423px]"
      actionsClassName="gap-6"
      className={className}
    />
  );
};
