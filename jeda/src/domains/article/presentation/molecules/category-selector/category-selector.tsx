"use client";

import React from "react";
import { X } from "lucide-react";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface CategorySelectorProps {
  /** Daftar kategori */
  categories?: CategoryOption[];
  /** ID kategori terpilih (maks 3) */
  selectedIds?: string[];
  /** Handler saat chip diklik */
  onToggle?: (id: string) => void;
  /** Judul seksi */
  title?: string;
  /** Teks hint bawah */
  hintText?: string;
  className?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories = [
    { id: "1", name: "Desain UI/UX" },
    { id: "2", name: "Teknologi" },
    { id: "3", name: "Pemrograman" },
  ],
  selectedIds = [],
  onToggle,
  title = "Kategori:",
  hintText = "Pilih minimal 1 dan maksimal 3 untuk kategori",
  className = "",
}) => {
  return (
    <div className={`w-full flex flex-col gap-3 py-4 border-t border-[#1B4E46] ${className}`}>
      <h2 className="text-2xl font-bold text-[#1B4E46]">{title}</h2>
      <div className="flex flex-wrap items-center gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggle?.(cat.id)}
              className={`px-4 py-2 rounded-full text-base font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#146C5D] text-white"
                  : "border border-[#1B4E46]/30 text-[#1B4E46] hover:border-[#1B4E46]"
              }`}
            >
              <span>{cat.name}</span>
              {isSelected && <X className="w-4 h-4 rotate-45" />}
            </button>
          );
        })}
      </div>
      <span className="text-sm font-medium text-[#1B4E46]/75">{hintText}</span>
    </div>
  );
};

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
