"use client";

import React, { useState, useEffect } from "react";
import { SectionTabs, TabItem, SectionTabsVariant } from "@/shared/molecules/tabs/section-tabs";
import { Button } from "@/shared/atoms/button/button/button";

export interface LibrarySectionProps {
  title?: string;
  variant?: SectionTabsVariant;
  tabs?: TabItem[];
  activeTab?: string;
  defaultTab?: string; // Tambahkan prop defaultTab
  onTabChange?: (id: string) => void;
  isLoggedIn?: boolean;
  onRegisterClick?: () => void;
  onLoginClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  title = "Library",
  variant = "library",
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  isLoggedIn = false,
  onRegisterClick,
  onLoginClick,
  children,
  className = "",
}) => {
  // State internal untuk menangani interaksi tab
  const [internalTab, setInternalTab] = useState<string>(
    controlledActiveTab || defaultTab || "riwayat"
  );

  // Sinkronkan state internal saat controlledActiveTab berubah dari luar
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setInternalTab(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  const handleTabChange = (id: string) => {
    setInternalTab(id);
    onTabChange?.(id);
  };

  return (
    <div className={`flex flex-col items-start w-[1283px] max-w-full gap-[47px] ${className}`}>
      {/* Container Judul */}
      <div className="flex flex-col items-start w-[858px] max-w-full h-[52px] gap-[18px]">
        <div className="flex flex-row items-center justify-center p-[10px] gap-[10px] w-[151px] h-[52px]">
          <h1 className="m-0 w-[131px] h-[32px] font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46]">
            {title}
          </h1>
        </div>
      </div>

      {/* Container Tab Navigasi */}
      <div className="flex flex-col items-start w-[1283px] max-w-full gap-[7px]">
        <div className="flex flex-col items-start w-[1136px] max-w-full">
          <SectionTabs
            variant={variant}
            tabs={tabs}
            activeTab={internalTab}
            onChange={handleTabChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Kondisi Tampilan Berdasarkan Status Login */}
      {isLoggedIn ? (
        <div className="flex flex-col items-start w-full gap-[24px]">
          {children}
        </div>
      ) : (
        <div className="flex flex-col items-center self-stretch pt-[35px] px-0 pb-0 gap-[12px] w-[1283px] max-w-full h-[246px]">
          <div className="flex flex-col items-start w-[1036px] max-w-full h-[129px] gap-[22px]">
            <h2 className="m-0 w-[1036px] max-w-full h-[32px] font-['Poppins'] font-bold text-[36px] leading-[32px] text-center text-[#1B4E46]">
              Bergabung untuk mendapat pengalaman lebih
            </h2>
            <p className="m-0 w-[1036px] max-w-full h-[75px] font-['Poppins'] font-medium text-[24px] leading-[28px] text-center text-[#1B4E46]/75">
              Ayo bergabung untuk dapat menyimpan riawayat baca, simpan artikel, suka dan komentar
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-[12px] w-[193px] h-[70px]">
            <Button variant="outline" onClick={onRegisterClick} className="w-[83px] h-[40px] px-4 py-2 rounded-[6px]">
              Daftar
            </Button>
            <Button variant="solid" onClick={onLoginClick} className="w-[98px] h-[40px] px-4 py-2 rounded-[6px] bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),#146C5D] text-white">
              Masuk
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};