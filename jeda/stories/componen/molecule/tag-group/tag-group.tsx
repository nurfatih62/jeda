"use client";

import React, { useState } from "react";
import { ButtonTags } from "../../atom/button/button-tags/button-tags";

export interface TagItem {
  /** Label teks untuk setiap tag */
  label: string;
  /** Status aktif awal */
  defaultActive?: boolean;
}

export interface TagGroupProps {
  /** Daftar list tag */
  tags?: TagItem[];
  /** Callback ketika daftar tag yang aktif berubah */
  onTagChange?: (activeTags: string[]) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  tags = [
    { label: "Semua", defaultActive: true },
    { label: "Teknologi", defaultActive: false },
    { label: "Wisata", defaultActive: false },
    { label: "Makanan", defaultActive: false },
    { label: "Perkerjaan", defaultActive: false },
    { label: "Pengembangan diri", defaultActive: false },
    { label: "Kehidupan", defaultActive: false },
  ],
  onTagChange,
  className = "",
}) => {
  // Mengelola state aktif untuk setiap tag berdasarkan labelnya
  const [activeState, setActiveState] = useState<Record<string, boolean>>(
    tags.reduce((acc, tag) => ({ ...acc, [tag.label]: tag.defaultActive || false }), {})
  );

  const handleTagClick = (label: string) => {
    setActiveState((prev) => {
      let updated = { ...prev };

      if (label === "Semua") {
        // Logika 1: Jika "Semua" diklik, aktifkan "Semua" dan matikan semua tag lainnya
        Object.keys(updated).forEach((key) => {
          updated[key] = key === "Semua";
        });
      } else {
        // Logika 2: Jika klik tag lain selain "Semua", matikan "Semua"
        updated["Semua"] = false;
        // Toggle status tag yang dipilih
        updated[label] = !prev[label];

        // Pengaman: Jika setelah diklik ternyata tidak ada satupun tag lain yang aktif,
        // kembalikan status ke "Semua" agar filter tidak kosong total.
        const anyOtherActive = Object.keys(updated)
          .filter((key) => key !== "Semua")
          .some((key) => updated[key]);

        if (!anyOtherActive) {
          updated["Semua"] = true;
        }
      }

      if (onTagChange) {
        const activeList = Object.keys(updated).filter((key) => updated[key]);
        onTagChange(activeList);
      }

      return updated;
    });
  };

  return (
    <div
      className={`
        flex flex-row items-center flex-wrap gap-[10px] 
        w-full max-w-[1234px] min-h-[49.94px]
        ${className}
      `}
    >
      {tags.map((tag) => (
        <ButtonTags
          key={tag.label}
          label={tag.label}
          active={activeState[tag.label]}
          onClick={() => handleTagClick(tag.label)}
        />
      ))}
    </div>
  );
};