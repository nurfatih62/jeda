"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TabItem {
  id: string;
  label: string;
}

export type SectionTabsVariant = 
  | "homepage-belumlogin" 
  | "homepage-sudahlogin" 
  | "library" 
  | "profile-author" 
  | "profile-reader";

export interface SectionTabsProps {
  /** Varian preset tab sesuai halaman */
  variant?: SectionTabsVariant;
  /** Daftar pilihan tab kustom (jika tidak menggunakan preset) */
  tabs?: TabItem[];
  /** ID tab yang sedang aktif (Controlled) */
  activeTab?: string;
  /** Tab default yang aktif jika tidak dikontrol dari luar */
  defaultTab?: string;
  /** Handler ketika tab diubah */
  onChange?: (id: string) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

// Preset daftar tab berdasarkan varian halaman sesuai spesifikasi desain
const presetTabs: Record<SectionTabsVariant, TabItem[]> = {
  "homepage-belumlogin": [
    { id: "populer", label: "Populer" },
    { id: "terbaru", label: "Terbaru" },
  ],
  "homepage-sudahlogin": [
    { id: "untukmu", label: "Untukmu" },
    { id: "populer", label: "Populer" },
    { id: "terbaru", label: "Terbaru" },
  ],
  "library": [
    { id: "riwayat", label: "Riwayat dibaca" },
    { id: "disimpan", label: "Artikel disimpan" },
    { id: "disuka", label: "Artikel disuka" },
    { id: "komentar", label: "Komentar" },
  ],
  "profile-author": [
    { id: "artikel-dibuat", label: "Artikel dibuat" },
    { id: "artikel-disuka", label: "Artikel disuka" },
    { id: "komentar", label: "Komentar" },
  ],
  "profile-reader": [
    { id: "artikel-disuka", label: "Artikel disuka" },
    { id: "komentar", label: "Komentar" },
  ],
};

export const SectionTabs: React.FC<SectionTabsProps> = ({
  variant,
  tabs: customTabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  className = "",
}) => {
  const activeTabs = customTabs || (variant ? presetTabs[variant] : presetTabs["homepage-belumlogin"]);

  const [internalTab, setInternalTab] = useState<string>(
    controlledActiveTab || defaultTab || activeTabs[0]?.id || ""
  );

  // Sinkronkan state internal saat controlledActiveTab dari parent berubah
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setInternalTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeEl = tabRefs.current[internalTab];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [internalTab, activeTabs]);

  const handleTabClick = (id: string) => {
    setInternalTab(id);
    onChange?.(id);
  };

  return (
    <div className={`flex flex-col w-full relative ${className}`}>
      {/* Baris Tombol Tab (Frame 238134 dengan gap 49px sesuai Figma) */}
      <div className="flex flex-row items-center gap-[49px] pb-3 relative w-[723px] max-w-full">
        {activeTabs.map((tab) => {
          const isActive = internalTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative pb-1 font-['Poppins'] font-medium text-base leading-6 whitespace-nowrap
                transition-colors duration-200 cursor-pointer border-none bg-transparent
                ${isActive ? "text-[#147364]" : "text-[#8C9B95] opacity-50 hover:opacity-100 hover:text-[#147364]"}
              `}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Garis Indikator Aktif (Line 4 / Frame 82) */}
        <span
          className="absolute bottom-0 h-[3px] bg-[#198876] rounded-full transition-all duration-300 ease-in-out pointer-events-none"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </div>

      {/* Garis Divider Horizontal (Line 3 / Frame 70) */}
      <div className="w-[1136px] max-w-full border-b border-[#147364]" />
    </div>
  );
};