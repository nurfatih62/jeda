"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ButtonTags } from "../../../atom/button/button-tags/button-tags";

export interface CategorySelectionModalProps {
  /** Status apakah modal sedang terbuka */
  isOpen?: boolean;
  /** Daftar kategori yang dapat dipilih */
  categories?: string[];
  /** Jumlah maksimal kategori yang perlu dipilih */
  maxSelection?: number;
  /** Callback saat tombol kembali (Back) diklik */
  onBack?: () => void;
  /** Callback saat tombol submit/masuk diklik membawa list kategori terpilih */
  onSubmit?: (selectedCategories: string[]) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

const DEFAULT_CATEGORIES = [
  "Teknologi",
  "Kehidupan",
  "Wisata",
  "Pekerjaan",
  "Pengembangan diri",
  "Makanan",
];

export const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  isOpen = true,
  categories = DEFAULT_CATEGORIES,
  maxSelection = 3,
  onBack,
  onSubmit,
  className = "",
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTagClick = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      if (selected.length < maxSelection) {
        setSelected([...selected, category]);
      }
    }
  };

  const isComplete = selected.length === maxSelection;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`
          relative box-border flex flex-col items-center
          w-[832px] h-[534px] bg-white
          shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[6px]
          pt-[85px] px-[93px] pb-[35px] overflow-hidden
          ${className}
        `}
      >
        {/* Tombol Back Icon dengan border box persis Figma */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="absolute left-[46px] top-[30px] w-8 h-8 flex items-center justify-center bg-transparent border border-[#E5E7EB] rounded-[6px] p-1 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[#1B4E46]" />
        </button>

        {/* Header Judul & Subteks */}
        <div className="flex flex-col items-center text-center gap-2 w-[641px]">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
            Pilih {maxSelection} kategori favoritmu
          </h2>
          <p className="font-['Poppins'] font-medium text-[24px] leading-[28px] text-[#1B4E46]/75 m-0 mt-3">
            Buat rekomendasi bacaan lebih sesuai seleramu
          </p>
        </div>

        {/* Container Tags (Lebar ditingkatkan ke 700px agar 4 tags muat dalam 1 baris) */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-3.5 w-[700px] mt-[35px]">
          {categories.map((cat) => (
            <ButtonTags
              key={cat}
              label={cat}
              active={selected.includes(cat)}
              onClick={() => handleTagClick(cat)}
            />
          ))}
        </div>

        {/* Indikator Hitungan Pilihan & Button Submit (Rata Kiri 562px) */}
        <div className="w-[562px] flex flex-col items-start mt-[30px]">
          <span className="font-['Poppins'] font-normal text-[16px] leading-[24px] text-[#1B4E46] mb-2">
            {selected.length}/{maxSelection} dipilih
          </span>

          <button
            type="button"
            disabled={!isComplete}
            onClick={() => onSubmit && onSubmit(selected)}
            className={`
              w-[562px] h-[54px] flex justify-center items-center py-2 px-4 rounded-[6px]
              font-['Poppins'] font-medium text-[20px] leading-[24px] text-white border-none
              transition-all duration-200
              ${
                isComplete
                  ? "bg-[#146C5D] cursor-pointer hover:opacity-95"
                  : "bg-[#146C5D]/50 cursor-not-allowed"
              }
            `}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

CategorySelectionModal.displayName = "CategorySelectionModal";