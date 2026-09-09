"use client";

import React, { useState } from "react";
import { StatusBadge, StatusBadgeTone } from "../../../atom/status-badge/status-badge";

export interface UserItem {
  id: string;
  nama: string;
  email: string;
  peran: "Reader" | "Author" | string;
  bergabung: string;
  status: "Aktif" | "Disuspend" | string;
}

export interface ManajemenPenggunaProps {
  /** Judul Halaman */
  title?: string;
  /** Daftar data pengguna */
  users?: UserItem[];
  /** Handler saat tombol Suspend diklik */
  onSuspend?: (user: UserItem) => void;
  /** Handler saat tombol Aktifkan diklik */
  onActivate?: (user: UserItem) => void;
  /** Class CSS tambahan */
  className?: string;
}

const DEFAULT_USERS: UserItem[] = [
  {
    id: "1",
    nama: "Sinta W.",
    email: "sinta.w@email.com",
    peran: "Reader",
    bergabung: "12 Jan 2026",
    status: "Aktif",
  },
  {
    id: "2",
    nama: "Asya mc",
    email: "asya.mc@email.com",
    peran: "Author",
    bergabung: "12 Jan 2026",
    status: "Aktif",
  },
  {
    id: "3",
    nama: "Budi R.",
    email: "budi.r@email.com",
    peran: "Reader",
    bergabung: "12 Jan 2026",
    status: "Disuspend",
  },
];

const ROLE_OPTIONS = ["Semua Peran", "Reader", "Author"];

export const ManajemenPengguna: React.FC<ManajemenPenggunaProps> = ({
  title = "Manajemen pengguna",
  users = DEFAULT_USERS,
  onSuspend,
  onActivate,
  className = "",
}) => {
  const [selectedRole, setSelectedRole] = useState<string>("Semua Peran");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Filter pengguna berdasarkan peran
  const filteredUsers = users.filter((user) => {
    if (selectedRole === "Semua Peran") return true;
    return user.peran.toLowerCase() === selectedRole.toLowerCase();
  });

  // Helper: peran → tone atom StatusBadge
  const getRoleTone = (role: string): StatusBadgeTone => {
    switch (role.toLowerCase()) {
      case "author":
        return "blue-soft";
      case "reader":
      default:
        return "gray-soft";
    }
  };

  // Helper: status → tone atom StatusBadge
  const getStatusTone = (status: string): StatusBadgeTone => {
    switch (status.toLowerCase()) {
      case "disuspend":
        return "red-soft";
      case "aktif":
      default:
        return "teal-soft";
    }
  };

  return (
    <div
      className={`flex flex-col w-full max-w-[1227px] gap-[80px] font-['Poppins'] ${className}`}
    >
      {/* Header & Dropdown Filter */}
      <div className="flex flex-row justify-between items-center w-full h-[40px]">
        <h1 className="font-bold text-[36px] leading-[26px] text-[#146C5D] m-0">
          {title}
        </h1>

        {/* Dropdown Filter Peran */}
        <div className="relative w-[368px]">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[40px] px-[47px] py-[3px] border border-[#146C5D] rounded-[6px] bg-white flex flex-row items-center justify-between cursor-pointer"
          >
            <span className="font-bold text-[16px] leading-[32px] text-[#146C5D] text-center w-full">
              {selectedRole}
            </span>
            <svg
              className={`w-[14px] h-[12px] text-[#146C5D] transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 14 12"
            >
              <path d="M7 12L0.0717968 0L13.9282 0L7 12Z" />
            </svg>
          </button>

          {/* Menu Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-[44px] left-0 w-full bg-white border border-[#146C5D] rounded-[8px] p-1 flex flex-col gap-1 z-20 shadow-lg">
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedRole(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full h-[40px] px-6 rounded-[6px] text-left font-bold text-[16px] leading-[32px] transition-colors cursor-pointer ${
                    selectedRole === option
                      ? "bg-[#146C5D]/10 text-[#146C5D]"
                      : "text-[#146C5D] hover:bg-[#146C5D]/5"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabel Manajemen Pengguna */}
      <div className="w-full border border-[#146C5D] rounded-[8px] overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#146C5D]/16 border-b border-[#146C5D]/20 h-[50px]">
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-[23px] w-[20%]">
                Nama
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[28%]">
                Email
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[12%] text-center">
                Peran
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[15%] text-center">
                Bergabung
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[12%] text-center">
                Status
              </th>
              <th className="font-bold text-[20px] leading-[26px] text-[#146C5D] px-4 w-[13%] text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isSuspended = user.status.toLowerCase() === "disuspend";

                return (
                  <tr
                    key={user.id}
                    className="border-b border-[#146C5D]/20 last:border-none h-[52px] hover:bg-[#146C5D]/5 transition-colors"
                  >
                    <td className="font-normal text-[16px] leading-[26px] text-black px-[23px]">
                      {user.nama}
                    </td>
                    <td className="font-normal text-[16px] leading-[26px] text-black px-4">
                      {user.email}
                    </td>
                    <td className="px-4 text-center">
                      <StatusBadge
                        label={user.peran}
                        tone={getRoleTone(user.peran)}
                        className="font-normal text-[14px] leading-[26px] rounded-[16px] min-w-[80px]"
                      />
                    </td>
                    <td className="font-normal text-[16px] leading-[26px] text-black px-4 text-center whitespace-nowrap">
                      {user.bergabung}
                    </td>
                    <td className="px-4 text-center">
                      <StatusBadge
                        label={user.status}
                        tone={getStatusTone(user.status)}
                        className="font-normal text-[14px] leading-[26px] rounded-[16px] min-w-[80px]"
                      />
                    </td>
                    <td className="px-4 text-center">
                      {isSuspended ? (
                        <button
                          type="button"
                          onClick={() => onActivate?.(user)}
                          className="w-[94px] h-[22px] bg-[#146C5D]/16 text-[#146C5D] border border-transparent rounded-[6px] font-normal text-[12px] leading-[26px] hover:bg-[#146C5D]/30 transition-colors cursor-pointer"
                        >
                          Aktifkan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSuspend?.(user)}
                          className="w-[94px] h-[22px] bg-[#DC2626]/16 text-[#DC2626] border border-[#DC2626] rounded-[6px] font-normal text-[12px] leading-[26px] hover:bg-[#DC2626]/25 transition-colors cursor-pointer"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-black/50 text-[16px]"
                >
                  Tidak ada pengguna ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};