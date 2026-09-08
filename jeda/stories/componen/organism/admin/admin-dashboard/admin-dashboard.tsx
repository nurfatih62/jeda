"use client";

import React, { useState } from "react";

export interface ReportItem {
  id: string;
  jenis: string;
  dilaporkan: string;
  alasan: string;
  tanggal: string;
  status: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
}

export interface AdminDashboardProps {
  /** Title utama halaman */
  title?: string;
  /** Data statistik kartu (Total Pengguna, Author, Artikel) */
  stats?: StatCardProps[];
  /** Data antrian laporan */
  reports?: ReportItem[];
  /** Handler ketika tombol 'Lihat semua' diklik */
  onViewAllClick?: () => void;
  /** Handler ketika rentang waktu diubah */
  onTimeRangeChange?: (value: string) => void;
  /** Tambahan class CSS */
  className?: string;
}

const DEFAULT_STATS: StatCardProps[] = [
  { title: "Total Pengguna", value: "1.201" },
  { title: "Total Author", value: "256" },
  { title: "Total Artikel", value: "437" },
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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  title = "Dashboard Admin",
  stats = DEFAULT_STATS,
  reports = DEFAULT_REPORTS,
  onViewAllClick,
  onTimeRangeChange,
  className = "",
}) => {
  const [timeRange, setTimeRange] = useState("7 hari terakhir");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const timeOptions = ["7 hari terakhir", "30 hari terakhir", "1 tahun terakhir"];

  const handleSelectTime = (option: string) => {
    setTimeRange(option);
    setIsDropdownOpen(false);
    onTimeRangeChange?.(option);
  };

  const pendingCount = reports.length;

  return (
    <div className={`flex flex-col w-full max-w-[1247px] p-2.5 gap-2.5 box-border ${className}`}>
      <div className="flex flex-col w-full gap-20">
        
        {/* Header: Title & Dropdown Rentang Waktu */}
        <div className="flex flex-row justify-between items-center w-full min-h-[40px] gap-4 flex-wrap">
          <h1 className="font-['Poppins'] font-bold text-[36px] leading-[26px] text-[#146C5D] m-0">
            {title}
          </h1>

          {/* Custom Dropdown Rentang Waktu */}
          <div className="relative w-[368px]">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex flex-row justify-between items-center w-full h-[40px] px-6 border border-[#146C5D] rounded-[6px] bg-transparent cursor-pointer"
            >
              <span className="font-['Poppins'] font-bold text-[16px] leading-[32px] text-[#146C5D] mx-auto">
                {timeRange}
              </span>
              <svg
                className={`w-[14px] h-[12px] text-[#146C5D] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 14 12"
              >
                <path d="M7 12L0 0h14L7 12z" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-[44px] left-0 w-full bg-[#F2F4ED] border border-[#146C5D] rounded-[8px] flex flex-col p-1 gap-1 z-10 shadow-lg">
                {timeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectTime(option)}
                    className="w-full h-[40px] rounded-[6px] font-['Poppins'] font-bold text-[16px] text-[#146C5D] hover:bg-[#146C5D]/10 text-center transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section Dashboard Main */}
        <div className="flex flex-col w-full gap-8">
          
          {/* Card Stats */}
          <div className="flex flex-row items-center gap-[36px] w-full flex-wrap">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center items-start w-[274px] h-[148px] p-4 border border-[#146C5D] rounded-[6px] bg-[#F2F4ED] box-border"
              >
                <span className="font-['Poppins'] font-normal text-[16px] leading-[32px] text-black">
                  {stat.title}
                </span>
                <span className="font-['Poppins'] font-bold text-[48px] leading-[32px] text-[#1B4E46] mt-2">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Section Antrian Laporan */}
          <div className="flex flex-col w-full gap-5">
            
            {/* Sub-Header Antrian Laporan */}
            <div className="flex flex-row justify-between items-end w-full flex-wrap gap-4">
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-['Poppins'] font-bold text-[32px] leading-[26px] text-[#146C5D] m-0">
                  Antrian laporan
                </h2>
                <div className="flex items-center justify-center px-3 py-0.5 bg-[#DC2626]/16 rounded-[16px]">
                  <span className="font-['Poppins'] font-normal text-[14px] leading-[26px] text-[#DC2626]">
                    {pendingCount} Pending
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onViewAllClick}
                className="font-['Poppins'] font-normal text-[20px] leading-[26px] text-black underline bg-transparent border-none cursor-pointer"
              >
                Lihat semua
              </button>
            </div>

            {/* Tabel Antrian Laporan */}
            <div className="w-full border border-[#146C5D] rounded-[8px] overflow-hidden">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#146C5D]/16 border-b border-[#146C5D]/20 h-[50px]">
                    <th className="font-['Poppins'] font-bold text-[20px] text-black px-[23px] w-[18%]">
                      Jenis
                    </th>
                    <th className="font-['Poppins'] font-bold text-[20px] text-black px-4 w-[35%]">
                      Dilaporkan
                    </th>
                    <th className="font-['Poppins'] font-bold text-[20px] text-black px-4 w-[27%]">
                      Alasan
                    </th>
                    <th className="font-['Poppins'] font-bold text-[20px] text-black px-4 w-[12%] text-center">
                      Tanggal
                    </th>
                    <th className="font-['Poppins'] font-bold text-[20px] text-black px-4 w-[8%] text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#146C5D]/20 last:border-none h-[52px] hover:bg-[#146C5D]/5 transition-colors"
                    >
                      <td className="font-['Poppins'] font-normal text-[16px] text-black px-[23px]">
                        {item.jenis}
                      </td>
                      <td className="font-['Poppins'] font-normal text-[16px] text-black px-4">
                        {item.dilaporkan}
                      </td>
                      <td className="font-['Poppins'] font-normal text-[16px] text-black px-4">
                        {item.alasan}
                      </td>
                      <td className="font-['Poppins'] font-normal text-[16px] text-black px-4 text-center whitespace-nowrap">
                        {item.tanggal}
                      </td>
                      <td className="px-4 text-center">
                        <span className="inline-block px-3 py-0.5 bg-[#D97706]/16 text-[#D97706] font-['Poppins'] font-normal text-[14px] leading-[26px] rounded-[16px]">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};