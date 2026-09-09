"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface TimeRangeDropdownProps {
  /** Daftar opsi rentang waktu */
  options?: string[];
  /** Nilai terpilih (controlled) */
  value?: string;
  /** Handler saat opsi dipilih */
  onChange?: (value: string) => void;
  /** Kelas wrapper — atur lebar di sini */
  className?: string;
  /** Tema trigger (sudah termasuk bg/border/hover) */
  triggerClassName?: string;
  /** Warna teks label terpilih */
  labelClassName?: string;
  /** Tema menu (sudah termasuk posisi/bg/border) */
  menuClassName?: string;
  /** Kelas tiap item opsi: string statis atau fungsi (option, selected) */
  itemClassName?: string | ((option: string, selected: boolean) => string);
  /** Ikon indikator di kanan trigger (default ChevronDown) */
  icon?: React.ReactNode;
}

const defaultItemClass = (option: string, selected: boolean) =>
  `w-full h-[40px] rounded-[6px] font-['Poppins'] font-bold text-[16px] text-[#146C5D] hover:bg-[#146C5D]/10 text-center transition-colors cursor-pointer ${
    selected ? "bg-[#146C5D]/10" : ""
  }`;

export const TimeRangeDropdown: React.FC<TimeRangeDropdownProps> = ({
  options = ["7 hari terakhir", "30 hari terakhir", "1 tahun terakhir"],
  value,
  onChange,
  className = "w-[368px] max-w-full",
  triggerClassName = "bg-white hover:bg-gray-50 border-[#146C5D]",
  labelClassName = "text-[#146C5D]",
  menuClassName = "top-[44px] left-0 bg-white border-[#146C5D]",
  itemClassName = defaultItemClass,
  icon,
}) => {
  const [internalValue, setInternalValue] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selected = value ?? internalValue;

  const handleSelect = (option: string) => {
    setInternalValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row justify-between items-center w-full h-[40px] px-6 border rounded-[6px] cursor-pointer transition-colors ${triggerClassName}`}
      >
        <span
          className={`font-['Poppins'] font-bold text-[16px] leading-[32px] mx-auto ${labelClassName}`}
        >
          {selected}
        </span>
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          {icon ?? <ChevronDown className="w-5 h-5 text-[#146C5D]" />}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute w-full border rounded-[8px] flex flex-col p-1 gap-1 z-10 shadow-lg ${menuClassName}`}
        >
          {options.map((option) => {
            const isSelected = selected === option;
            const resolved =
              typeof itemClassName === "function"
                ? itemClassName(option, isSelected)
                : itemClassName;
            return (
              <button key={option} type="button" onClick={() => handleSelect(option)} className={resolved}>
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

TimeRangeDropdown.displayName = "TimeRangeDropdown";

export default TimeRangeDropdown;
