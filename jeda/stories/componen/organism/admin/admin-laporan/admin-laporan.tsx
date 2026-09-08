"use client";

import React, { useState } from "react";

export interface ReportItem {
  id: string;
  jenis: string;
  dilaporkan: string;
  alasan: string;
  tanggal: string;
  status: "Pending" | "Publikasi" | "Ditindak" | "Ditolak" | string;
}

export interface TabFilter {
  id: string;
  label: string;
  count?: number;
}

export interface AdminLaporanProps {
  /** Judul Halaman */
  title?: string;
  /** Daftar pilihan filter tab */
  tabs?: TabFilter[];
  /** Data seluruh laporan */
  reports?: ReportItem[];
  /** Handler saat tab filter diklik */
  onTabChange?: (tabId: string) => void;
  /** Tambahan class CSS */
  className?: string;
}

const DEFAULT_TABS: TabFilter[] = [
  { id: "pending", label: "Pending", count: 3 },
  { id: "ditindak", label: "Ditindak" },
  { id: "ditolak", label: "Ditolak" },
];

const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: "1",
    jenis: "Artikel",
    dilaporkan: "Kenapa Kita Suka Cerita Sedih",
    alasan: "Informasi salah/hoaks",
    tanggal: "5 Sep 2026",
    status: "Publikasi",
  },
  {
    id: "2",
    jenis: "Komentar",
    dilaporkan: "Komentar oleh Budi R.",
    alasan: "Ujaran kebencian",
    tanggal: "4 Sep 2026",
    status: "Publikasi",
  },
  {
    id: "3",
    jenis: "Akun",
    dilaporkan: "akun @ceritakelam99",
    alasan: "Akun palsu (impersonasi)",
    tanggal: "4 Sep 2026",
    status: "Publikasi",
  },
];

export const AdminLaporan: React.FC<AdminLaporanProps> = ({
  title = "Laporan",
  tabs = DEFAULT_TABS,
  reports = DEFAULT_REPORTS,
  onTabChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>("pending");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // Helper untuk menentukan gaya Badge Status
  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "ditindak":
        return "bg-[#146C5D]/16 text-[#146C5D]";
      case "ditolak":
        return "bg-[#000000]/10 text-[#000000]/60";
      case "pending":
      case "publikasi":
      default:
        return "bg-[#D97706]/16 text-[#D97706]";
    }
  };

  return (
    <div
      className={`flex flex-col w-full max-w-[1227px] gap-[50px] font-['Poppins'] ${className}`}
    >
      {/* Title Halaman */}
      <h1 className="font-bold text-[36px] leading-[26px] text-[#146C5D] m-0">
        {title}
      </h1>

      {/* Filter Tabs */}
      <div className="flex flex-row items-center gap-[18px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const displayLabel =
            tab.count !== undefined ? `${tab.label} (${tab.count})` : tab.label;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-row justify-center items-center px-[16px] py-[8px] h-[40px] rounded-[24px] font-medium text-[16px] leading-[24px] transition-colors cursor-pointer border ${
                isActive
                  ? "bg-[#146C5D] text-white border-[#146C5D] shadow-inner"
                  : "bg-transparent text-[#146C5D] border-[#146C5D] hover:bg-[#146C5D]/10"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Tabel Laporan */}
      <div className="w-full border border-[#146C5D] rounded-[8px] overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#146C5D]/16 border-b border-[#146C5D]/20 h-[50px]">
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-[23px] w-[18%]">
                Jenis
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[35%]">
                Dilaporkan
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[27%]">
                Alasan
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[12%] text-center">
                Tanggal
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[8%] text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#146C5D]/20 last:border-none h-[52px] hover:bg-[#146C5D]/5 transition-colors"
                >
                  <td className="font-normal text-[16px] leading-[26px] text-black px-[23px]">
                    {item.jenis}
                  </td>
                  <td className="font-normal text-[16px] leading-[26px] text-black px-4">
                    {item.dilaporkan}
                  </td>
                  <td className="font-normal text-[16px] leading-[26px] text-black px-4">
                    {item.alasan}
                  </td>
                  <td className="font-normal text-[16px] leading-[26px] text-black px-4 text-center whitespace-nowrap">
                    {item.tanggal}
                  </td>
                  <td className="px-4 text-center">
                    <span
                      className={`inline-block px-3 py-0.5 font-normal text-[14px] leading-[26px] rounded-[16px] whitespace-nowrap ${getStatusBadgeStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-black/50 text-[16px]"
                >
                  Tidak ada data laporan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};