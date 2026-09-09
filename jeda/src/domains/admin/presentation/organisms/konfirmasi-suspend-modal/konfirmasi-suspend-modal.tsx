"use client";

import React from "react";
import { AdminConfirmModal } from "@/domains/admin/presentation/molecules/admin-confirm-modal/admin-confirm-modal";

export interface KonfirmasiSuspendModalProps {
  /** Controlling visibility modal */
  isOpen: boolean;
  /** Nama pengguna yang akan disuspend */
  userName?: string;
  /** Handler saat tombol Batal diklik atau area backdrop diklik */
  onClose: () => void;
  /** Handler saat tombol Konfirmasi diklik */
  onConfirm: () => void;
  /** Custom class CSS tambahan untuk wrapper modal */
  className?: string;
}

export const KonfirmasiSuspendModal: React.FC<KonfirmasiSuspendModalProps> = ({
  isOpen,
  userName = "Sinta W.",
  onClose,
  onConfirm,
  className = "",
}) => {
  return (
    <AdminConfirmModal
      isOpen={isOpen}
      title={`Suspend akun ${userName}?`}
      description="Pengguna tidak akan bisa login sampai akunnya diaktifkan kembali."
      confirmLabel="Konfirmasi"
      cancelLabel="Batal"
      confirmTone="danger-flat"
      cancelStyle="dark"
      onCancel={onClose}
      onConfirm={onConfirm}
      overlayClassName="bg-black/40"
      boxClassName="max-w-[689px] min-h-[364px] p-[53px_32px] sm:p-[53px_132px]"
      innerClassName="max-w-[423px]"
      actionsClassName="gap-[93px]"
      className={className}
    />
  );
};
