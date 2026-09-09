"use client";

import React from "react";

export interface PasswordStrengthBarProps {
  /** Skor 0–4 (0 = kosong) — dipetakan dari logika yang sudah ada di InputPassword */
  score?: number;
  /** Label teks di bawah bar */
  text?: string;
  /** Warna bar aktif & teks */
  color?: string;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  score = 0,
  text = "Kekuatan password",
  color = "#CCCCCC",
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex gap-3.25 w-141.5 mt-1.25">
        {[1, 2, 3, 4].map((index) => {
          const isActive = index <= score;
          const barColor = isActive ? color : "rgba(204, 204, 204, 0.8)";
          return (
            <div
              key={index}
              className="h-1.75 w-32 rounded-xs transition-colors duration-200"
              style={{ backgroundColor: barColor }}
            />
          );
        })}
      </div>
      <span
        className="mt-1 font-['Poppins'] font-normal text-[14px] leading-6 text-left transition-colors duration-200"
        style={{ color: score === 0 ? "#1B4E46" : color }}
      >
        {text}
      </span>
    </div>
  );
};

PasswordStrengthBar.displayName = "PasswordStrengthBar";

export default PasswordStrengthBar;
