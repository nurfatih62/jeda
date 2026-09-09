"use client";

import React from "react";

export interface RadioOptionProps {
  /** Label teks di kanan lingkaran */
  label?: string;
  /** Status terpilih */
  selected?: boolean;
  /** Handler saat dipilih */
  onSelect?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label = "Spam atau iklan",
  selected = false,
  onSelect,
  className = "",
}) => {
  return (
    <label
      onClick={onSelect}
      className={`flex items-center gap-4 cursor-pointer w-fit group ${className}`}
    >
      <div
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected
            ? "border-[#146C5D] bg-white"
            : "border-[#146C5D]/60 group-hover:border-[#146C5D]"
        }`}
      >
        {selected && <div className="w-4 h-4 rounded-full bg-[#146C5D]" />}
      </div>
      <span className="text-lg font-medium text-[#146C5D]">{label}</span>
    </label>
  );
};

RadioOption.displayName = "RadioOption";

export default RadioOption;
