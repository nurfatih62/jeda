"use client";

import React from "react";
import { ReportDetailModal } from "../../../molecule/report-detail-modal/report-detail-modal";

export interface ModalDitindakProps {
  /** Menyimpan status apakah modal terbuka */
  isOpen?: boolean;
  /** Tipe konten yang dilaporkan */
  contentType?: string;
  /** Judul konten yang dilaporkan */
  contentTitle?: string;
  /** Informasi metadata tambahan */
  contentMeta?: string;
  /** Alasan laporan */
  reportReason?: string;
  /** Callback ketika modal ditutup */
  onClose?: () => void;
  /** Callback saat tombol 'Hapus konten' diklik */
  onDeleteContent?: () => void;
  /** Callback saat tombol 'Peringatkan pengguna' diklik */
  onWarnUser?: () => void;
  /** Callback saat tombol 'Tolak laporan' diklik */
  onRejectReport?: () => void;
  /** Class tambahan */
  className?: string;
}

export const ModalDitindak: React.FC<ModalDitindakProps> = ({
  isOpen = true,
  contentType = "Artikel",
  contentTitle = "Kenapa Kita Suka Cerita Sedih",
  contentMeta = "Artikel oleh Asya mc, dipublikasikan 3 hari lalu. Views: 2.4K.",
  reportReason = "Informasi salah/hoaks",
  onClose,
  onDeleteContent,
  onWarnUser,
  onRejectReport,
  className = "",
}) => {
  return (
    <ReportDetailModal
      isOpen={isOpen}
      headerTitle="Detail laporan"
      infoCards={[
        { label: contentType, heading: contentTitle, description: contentMeta },
        { label: "Alasan Laporan", heading: reportReason },
      ]}
      actions={[
        { label: "Hapus konten", tone: "danger", onClick: onDeleteContent },
        { label: "Peringatkan pengguna", tone: "warning", onClick: onWarnUser },
        { label: "Tolak laporan", tone: "success", onClick: onRejectReport },
      ]}
      onClose={onClose}
      className={className}
    />
  );
};
