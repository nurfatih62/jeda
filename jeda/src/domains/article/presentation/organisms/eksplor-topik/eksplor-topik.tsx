"use client";

import React from "react";
import { TagGroup, TagItem } from "@/domains/article/presentation/molecules/tag-group/tag-group";
import { Dropdown, DropdownOption } from "@/shared/atoms/dropdown/dropdown";

export interface EksplorTopikOrganismProps {
  /** Judul section */
  title?: string;
  /** Daftar list tag */
  tags?: TagItem[];
  /** Opsi dropdown filter */
  dropdownOptions?: DropdownOption[];
  /** Nilai awal dropdown yang terpilih */
  dropdownValue?: string | number;
  /** Callback ketika daftar tag yang aktif berubah */
  onTagChange?: (activeTags: string[]) => void;
  /** Callback ketika pilihan dropdown berubah */
  onDropdownSelect?: (value: string | number) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const EksplorTopik: React.FC<EksplorTopikOrganismProps> = ({
  title = "Eksplor topik",
  tags = [
    { label: "Semua", defaultActive: true },
    { label: "Teknologi", defaultActive: false },
    { label: "Wisata", defaultActive: false },
    { label: "Makanan", defaultActive: false },
    { label: "Perkerjaan", defaultActive: false },
    { label: "Pengembangan diri", defaultActive: false },
    { label: "Kehidupan", defaultActive: false },
  ],
  dropdownOptions,
  dropdownValue,
  onTagChange,
  onDropdownSelect,
  className = "",
}) => {
  return (
    /* Frame 95: Organism Container */
    <div
      className={`
        flex flex-col justify-center items-center gap-[29px] 
        w-full max-w-[1155px] min-h-[162px] 
        ${className}
      `}
    >
      {/* Frame 94: Content Wrapper */}
      <div className="flex flex-col items-start gap-[24px] w-full">
        
        {/* Eksplor topik Title */}
        <h2
          className="
            w-full h-[32px] m-0
            font-['Poppins'] font-bold text-[36px] leading-[32px] 
            text-[#1B4E46]
          "
        >
          {title}
        </h2>

        {/* Frame 83: TagGroup Component */}
        <TagGroup
          tags={tags}
          onTagChange={onTagChange}
        />
      </div>

      {/* Dropdown Component (Diatur di bawah barisan tag sesuai layout) */}
      <div className="w-full flex justify-start">
        <Dropdown
          variant="filter"
          options={dropdownOptions}
          value={dropdownValue}
          onSelect={onDropdownSelect}
        />
      </div>
    </div>
  );
};