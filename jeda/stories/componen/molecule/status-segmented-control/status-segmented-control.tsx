"use client";

import React from "react";

export interface StatusSegmentedControlProps {
  /** Status aktif saat ini */
  value?: boolean;
  /** Handler saat memilih Nonaktif */
  onSelectInactive?: () => void;
  /** Handler saat memilih Aktif */
  onSelectActive?: () => void;
  /** Label opsi nonaktif */
  inactiveLabel?: string;
  /** Label opsi aktif */
  activeLabel?: string;
  /** Judul grup */
  title?: string;
  className?: string;
}

export const StatusSegmentedControl: React.FC<StatusSegmentedControlProps> = ({
  value = true,
  onSelectInactive,
  onSelectActive,
  inactiveLabel = "Nonaktif",
  activeLabel = "Aktif",
  title = "Status awal",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="text-[16px] font-medium leading-[24px] text-[#1B4E46]">
        {title}
      </span>
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onSelectInactive}
          className={`h-[40px] w-[181px] rounded-[6px] text-[16px] font-medium transition-all ${
            !value
              ? "bg-[#146C5D] text-white shadow-sm"
              : "border border-[#146C5D] bg-white text-[#146C5D] hover:bg-[#146C5D]/5"
          }`}
        >
          {inactiveLabel}
        </button>
        <button
          type="button"
          onClick={onSelectActive}
          className={`h-[40px] w-[165px] rounded-[6px] text-[16px] font-medium transition-all ${
            value
              ? "bg-[#146C5D] text-white shadow-sm"
              : "border border-[#146C5D] bg-white text-[#146C5D] hover:bg-[#146C5D]/5"
          }`}
        >
          {activeLabel}
        </button>
      </div>
    </div>
  );
};

StatusSegmentedControl.displayName = "StatusSegmentedControl";

export default StatusSegmentedControl;
