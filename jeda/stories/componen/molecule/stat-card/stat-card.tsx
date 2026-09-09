"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface StatCardProps {
  /** Label atas kartu */
  label?: string;
  /** Nilai besar kartu */
  value?: string;
  /** Teks perubahan, mis. "12%" */
  change?: string;
  /** Arah perubahan (positif = hijau tua, negatif = oranye) */
  isPositive?: boolean;
  /** Subteks pengganti change (varian author-dashboard) */
  subtitle?: string;
  /** Varian visual: "admin" (kotak hijau muda) atau "author" (kotak putih) */
  variant?: "admin" | "author";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label = "Total views",
  value = "8.4K",
  change,
  isPositive = true,
  subtitle,
  variant = "author",
  className = "",
}) => {
  if (variant === "admin") {
    return (
      <div
        className={`flex flex-col justify-center items-start w-[274px] h-[148px] p-4 border border-[#146C5D] rounded-[6px] bg-[#F2F4ED] box-border ${className}`}
      >
        <span className="font-['Poppins'] font-normal text-[16px] leading-[32px] text-black">
          {label}
        </span>
        <span className="font-['Poppins'] font-bold text-[48px] leading-[32px] text-[#1B4E46] mt-2">
          {value}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[186px] p-4 border border-gray-300 rounded-md flex flex-col justify-between bg-white shadow-sm ${className}`}
    >
      <span className="text-base font-normal text-[#1B4E46]">{label}</span>
      <div className="text-4xl md:text-[48px] font-bold text-[#1B4E46] leading-none">
        {value}
      </div>
      <div className="h-8 flex items-center">
        {change ? (
          <div
            className={`flex items-center gap-1 text-base font-normal ${
              isPositive ? "text-[#1B4E46]" : "text-[#D97706]"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-5 h-5 text-[#1B4E46]" />
            ) : (
              <ArrowDown className="w-5 h-5 text-[#D97706]" />
            )}
            <span>{change}</span>
          </div>
        ) : (
          <span className="text-base font-normal text-[#1B4E46]">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

StatCard.displayName = "StatCard";

export default StatCard;
