"use client";

import React from "react";
import { ReportDetailModal } from "@/domains/report/presentation/molecules/report-detail-modal/report-detail-modal";

export interface ModalDitindakUserProps {
  /** Status modal terbuka */
  isOpen?: boolean;
  /** Tipe akun/entitas */
  accountType?: string;
  /** Username atau nama akun yang dilaporkan */
  username?: string;
  /** Deskripsi detail mengenai akun */
  accountMeta?: string;
  /** Alasan laporan */
  reportReason?: string;
  /** Callback saat modal ditutup */
  onClose?: () => void;
  /** Callback saat tombol 'Suspend' diklik */
  onSuspendUser?: () => void;
  /** Callback saat tombol 'Peringatkan pengguna' diklik */
  onWarnUser?: () => void;
  /** Callback saat tombol 'Tolak laporan' diklik */
  onRejectReport?: () => void;
  /** Class tambahan */
  className?: string;
}

export const ModalDitindakUser: React.FC<ModalDitindakUserProps> = ({
  isOpen = true,
  accountType = "Akun",
  username = "akun @ceritakelam99",
  accountMeta = "Akun terdaftar 2 hari lalu, menggunakan nama dan foto mirip Author lain.",
  reportReason = "Akun palsu (impersonasi)",
  onClose,
  onSuspendUser,
  onWarnUser,
  onRejectReport,
  className = "",
}) => {
  return (
    <ReportDetailModal
      isOpen={isOpen}
      headerTitle="Detail laporan"
      infoCards={[
        {
          label: accountType,
          heading: username,
          description: accountMeta,
          className: "min-h-[110px]",
          descriptionClassName: "mt-1",
        },
        {
          label: "Alasan Laporan",
          heading: reportReason,
          className: "h-[77px]",
        },
      ]}
      actions={[
        { label: "Suspend", tone: "danger", onClick: onSuspendUser },
        { label: "Peringatkan pengguna", tone: "warning", onClick: onWarnUser },
        { label: "Tolak laporan", tone: "success", onClick: onRejectReport },
      ]}
      onClose={onClose}
      bodyClassName="gap-[18px]"
      actionsClassName="gap-1.5"
      className={className}
    />
  );
};
