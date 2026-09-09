"use client";

import React from "react";

export interface ProgressBarProps {
  /** Nilai 0–100 (persentase lebar bar) */
  value?: number;
  /** Tambahan kelas CSS untuk container */
  className?: string;
  /** Tambahan kelas CSS untuk fill */
  fillClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 50,
  className = "",
  fillClassName = "",
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`relative w-full h-[9px] bg-[#146C5D]/16 rounded-[16px] overflow-hidden ${className}`}
    >
      <div
        className={`h-full bg-[#146C5D] rounded-[16px] transition-all duration-300 ${fillClassName}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
