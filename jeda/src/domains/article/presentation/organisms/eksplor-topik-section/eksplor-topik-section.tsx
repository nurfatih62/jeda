"use client";

import React from "react";
import { TagGroup, TagItem } from "@/domains/article/presentation/molecules/tag-group/tag-group";
import { Dropdown, DropdownOption } from "@/shared/atoms/dropdown/dropdown";
import { ArticleCard, ArticleCardProps } from "@/domains/article/presentation/molecules/card/article-card";

export interface EksplorTopikSectionProps {
  /** Judul section utama */
  title?: string;
  /** Daftar list tag untuk filter */
  tags?: TagItem[];
  /** Opsi pilihan untuk dropdown filter */
  dropdownOptions?: DropdownOption[];
  /** Nilai terpilih pada dropdown */
  dropdownValue?: string | number;
  /** Daftar artikel yang akan ditampilkan di dalam section */
  articles?: ArticleCardProps[];
  /** Callback ketika tag yang aktif berubah */
  onTagChange?: (activeTags: string[]) => void;
  /** Callback ketika pilihan dropdown berubah */
  onDropdownSelect?: (value: string | number) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const EksplorTopikSection: React.FC<EksplorTopikSectionProps> = ({
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
  dropdownOptions = [
    { label: "Populer", value: "populer" },
    { label: "Terbaru", value: "terbaru" },
  ],
  dropdownValue = "populer",
  articles = [],
  onTagChange,
  onDropdownSelect,
  className = "",
}) => {
  return (
    /* Frame 97 Container */
    <div
      className={`
        flex flex-col items-start p-0 gap-4.25 
        w-full max-w-288.75 min-h-203.5 
        ${className}
      `}
    >
      {/* Header Bagian Atas: Judul & TagGroup */}
      <div className="flex flex-col items-start gap-6 w-full">
        <h2
          className="
            m-0 font-['Poppins'] font-bold text-[36px] leading-8 
            text-btn-hover
          "
        >
          {title}
        </h2>

        {/* TagGroup dengan logika eksklusif "Semua" */}
        <TagGroup tags={tags} onTagChange={onTagChange} />
      </div>

      {/* Dropdown Filter */}
      <div className="w-full flex justify-start">
        <Dropdown
          variant="filter"
          options={dropdownOptions}
          value={dropdownValue}
          onSelect={onDropdownSelect}
        />
      </div>

      {/* Daftar ArticleCard */}
      <div className="flex flex-col items-start gap-4 w-full">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};