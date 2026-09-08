"use client";

import React, { useState, useEffect } from "react";
import { HeroSection } from "../../molecule/hero-section/hero-section";
import { SectionTabs, SectionTabsVariant } from "../../molecule/tabs/section-tabs";
import { ArticleCard, ArticleCardProps } from "../../molecule/card/article-card";
import { AuthStatus } from "../../atom/typography/typography";
import { AuthorDraftWritingCard, AuthorDraftWritingCardProps } from "../../molecule/author-draft-writing-card/author-draft-writing-card";
import { ArticlePerformanceCard, ArticlePerformanceCardProps } from "../../molecule/article-performance-card/article-performance-card";

export interface HomepageSectionProps {
  /** Status autentikasi / peran ("guest" | "logged-in" | "author") */
  authStatus?: AuthStatus;
  /** Judul Hero Section */
  title?: string;
  /** Subtitle Hero Section */
  subtitle?: string;
  /** Label tombol explore (untuk guest) */
  exploreLabel?: string;
  /** Label tombol register (untuk guest) */
  registerLabel?: string;
  /** Event handler tombol explore */
  onExploreClick?: () => void;
  /** Event handler tombol register */
  onRegisterClick?: () => void;
  /** Varian tab yang digunakan (otomatis menyesuaikan authStatus jika kosong) */
  tabVariant?: SectionTabsVariant;
  /** Tab aktif saat ini (Controlled) */
  activeTab?: string;
  /** Tab default yang aktif */
  defaultTab?: string;
  /** Event handler ketika tab berubah */
  onTabChange?: (id: string) => void;
  /** Data daftar artikel kustom (opsional) */
  articles?: Array<ArticleCardProps & { id: string }>;
  
  /* --- Props Kondisi Author --- */
  /** Menandakan apakah author memiliki draft yang sedang ditulis */
  hasDraft?: boolean;
  /** Menandakan apakah author sudah pernah mempublikasikan artikel */
  hasPublished?: boolean;
  /** Props kustom untuk AuthorDraftWritingCard */
  draftCardProps?: AuthorDraftWritingCardProps;
  /** Props kustom untuk ArticlePerformanceCard */
  performanceCardProps?: ArticlePerformanceCardProps;

  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const HomepageSection: React.FC<HomepageSectionProps> = ({
  authStatus = "guest",
  title,
  subtitle,
  exploreLabel,
  registerLabel,
  onExploreClick,
  onRegisterClick,
  tabVariant: controlledTabVariant,
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  articles,
  hasDraft = false,
  hasPublished = false,
  draftCardProps,
  performanceCardProps,
  className = "",
}) => {
  // 1. Tentukan variant tab secara dinamis berdasarkan authStatus
  const derivedTabVariant: SectionTabsVariant = 
    controlledTabVariant || 
    (authStatus === "logged-in" || authStatus === "author" 
      ? "homepage-sudahlogin" 
      : "homepage-belumlogin");

  // 2. Tentukan tab pertama yang harus aktif berdasarkan variant
  const getDefaultFirstTab = (variant: SectionTabsVariant) => {
    if (variant === "homepage-sudahlogin") return "untukmu";
    return "populer";
  };

  const isControlled = controlledActiveTab !== undefined;
  
  // 3. State internal untuk tab
  const [internalTab, setInternalTab] = useState<string>(
    defaultTab || getDefaultFirstTab(derivedTabVariant)
  );

  // 4. Efek untuk menyelaraskan tab saat authStatus berubah
  useEffect(() => {
    if (!isControlled && !defaultTab) {
      setInternalTab(getDefaultFirstTab(derivedTabVariant));
    }
  }, [derivedTabVariant, isControlled, defaultTab]);

  // 5. Deklarasikan currentTab
  const currentTab = isControlled ? controlledActiveTab : internalTab;

  const handleTabChange = (id: string) => {
    if (!isControlled) {
      setInternalTab(id);
    }
    onTabChange?.(id);
  };

  // 6. Data dummy artikel berdasarkan tab aktif
  const getArticlesByTab = () => {
    if (currentTab === "terbaru") {
      return [
        {
          id: "1",
          badgeVariant: "terbaru" as any,
          badge: "Terbaru",
          authorName: "Asya mc",
          date: "16 Agustus 2026",
          title: "Artikel Pilihan Terbaru Hari Ini",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          likesCount: 45,
          commentsCount: 3,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
        },
        {
          id: "2",
          badgeVariant: "none" as any,
          authorName: "Rian Hidayat",
          date: "16 Agustus 2026",
          title: "Menavigasi Waktu di Era Digital",
          description: "Bagaimana cara kita tetap fokus di tengah gempuran informasi yang serba cepat setiap harinya.",
          likesCount: 88,
          commentsCount: 6,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
        },
      ];
    } else if (currentTab === "untukmu") {
      return [
        {
          id: "1",
          authorName: "Asya mc",
          badgeVariant: "cocok-denganmu" as any,
          badge: "Cocok denganmu",
          commentsCount: 3,
          date: "15 Agustus 2026",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          likesCount: 237,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
          title: "Lorem ipsum dolor sit amet",
        },
        {
          id: "2",
          authorName: "Budi Santoso",
          badgeVariant: "none" as any,
          commentsCount: 8,
          date: "14 Agustus 2026",
          description: "Menulis sebagai bentuk refleksi diri yang mendalam untuk meningkatkan kejernihan pikiran.",
          likesCount: 154,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
          title: "Refleksi Harian Melalui Tulisan",
        },
      ];
    } else {
      return [
        {
          id: "1",
          badgeVariant: "paling-banyak-dibaca" as any,
          badge: "Paling banyak dibaca",
          authorName: "Asya mc",
          date: "15 Agustus 2026",
          title: "Lorem ipsum dolor sit amet",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          likesCount: 237,
          commentsCount: 12,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
        },
        {
          id: "2",
          badgeVariant: "none" as any,
          authorName: "Dewi Lestari",
          date: "14 Agustus 2026",
          title: "Seni Memahami Alur Cerita Fiksi",
          description: "Menyelami lebih dalam bagaimana penulis merangkum emosi ke dalam setiap bab cerita yang disajikan.",
          likesCount: 184,
          commentsCount: 9,
          thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
        },
      ];
    }
  };

  const listArticles = articles || getArticlesByTab();
  const isAuthor = authStatus === "author";

  return (
    <section
      className={`
        box-border flex flex-col items-center w-full 
        px-6 md:px-12 lg:px-20 py-8 gap-8
        max-w-360 mx-auto bg-transparent
        ${className}
      `}
    >
      {/* 1. Hero Section */}
      <HeroSection
        authStatus={authStatus}
        title={title}
        subtitle={subtitle}
        exploreLabel={exploreLabel}
        registerLabel={registerLabel}
        onExploreClick={onExploreClick}
        onRegisterClick={onRegisterClick}
      />

      {/* 2. Section Khusus Author (Tampil Di Bawah Hero Section) */}
      {isAuthor && (
        <div className="flex flex-col w-full max-w-259 gap-6">
          {/* A. Menampilkan Draft Writing Card */}
          {(!hasPublished && !hasDraft) && (
            /* Kondisi 1: Belum ada tulisan sama sekali -> Varian Empty */
            <div className="flex flex-col gap-2">
              <span className="font-['Poppins'] font-bold text-[14px] leading-[20px] tracking-[0.1em] text-[rgba(27,78,70,0.6)] uppercase">
                Lanjutkan Tulisanmu
              </span>
              <AuthorDraftWritingCard variant="empty" {...draftCardProps} />
            </div>
          )}

          {hasDraft && (
            /* Kondisi 2: Sedang ada draft tulisan -> Varian Draft */
            <div className="flex flex-col gap-2">
              <span className="font-['Poppins'] font-bold text-[14px] leading-[20px] tracking-[0.1em] text-[rgba(27,78,70,0.6)] uppercase">
                Lanjutkan Tulisanmu
              </span>
              <AuthorDraftWritingCard variant="draft" {...draftCardProps} />
            </div>
          )}

          {/* B. Menampilkan Performance Card */}
          {hasPublished && (
            /* Tampil jika author sudah pernah mempublikasikan artikel */
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-['Poppins'] font-bold text-[14px] leading-[20px] tracking-[0.1em] text-[rgba(27,78,70,0.6)] uppercase">
                Performa Artikelmu
              </span>
              <ArticlePerformanceCard {...performanceCardProps} />
            </div>
          )}
        </div>
      )}

      {/* 3. Container Utama untuk Tabs & Feed Artikel */}
      <div className="flex flex-col w-full max-w-259 gap-6 mt-4">
        {/* Navigasi Tab */}
        <SectionTabs
          variant={derivedTabVariant}
          activeTab={currentTab}
          onChange={handleTabChange}
        />

        {/* Daftar Kartu Artikel */}
        <div className="flex flex-col w-full gap-4">
          {listArticles.map((article) => {
            const { id, ...articleProps } = article;
            return <ArticleCard key={id} {...articleProps} />;
          })}
        </div>
      </div>
    </section>
  );
};

HomepageSection.displayName = "HomepageSection";

export default HomepageSection;