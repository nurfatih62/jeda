"use client";

import React from "react";
import { AdminConfirmModal } from "@/domains/admin/presentation/molecules/admin-confirm-modal/admin-confirm-modal";

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
  return (
    <AdminConfirmModal
      isOpen={isOpen}
      title={`Aktifkan kembali akun ${userName}?`}
      description={`Aktifkan kembali akun ${userName}?`}
      confirmLabel="Konfirmasi"
      cancelLabel="Batal"
      confirmTone="teal-flat"
      cancelStyle="dark"
      onCancel={onClose}
      onConfirm={onConfirm}
      overlayClassName="bg-black/40"
      boxClassName="max-w-[689px] min-h-[373px] p-[53px_32px] sm:p-[53px_132px]"
      innerClassName="max-w-[423px]"
      actionsClassName="gap-[93px]"
      className={className}
    />
  );
};
