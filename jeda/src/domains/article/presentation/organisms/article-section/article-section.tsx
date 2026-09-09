"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionTabs, SectionTabsVariant } from "@/shared/molecules/tabs/section-tabs";
import { Dropdown, DropdownOption } from "@/shared/atoms/dropdown/dropdown";
import { ArticleCard, ArticleCardProps } from "@/domains/article/presentation/molecules/card/article-card";

export interface AuthorProfileProps {
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface ArticleSectionProps {
  /** Data Profil (Nama, Bio, Avatar) */
  authorProfile?: AuthorProfileProps;
  /** Varian Tab: 'profile-author' (3 tab) atau 'profile-reader' (2 tab) */
  tabsVariant?: SectionTabsVariant;
  /** Tab aktif saat ini */
  activeTab?: string;
  /** Opsi dropdown filter */
  filterOptions?: DropdownOption[];
  /** Opsi filter terpilih */
  selectedFilter?: string | number;
  /** List Artikel */
  articles?: ArticleCardProps[];
  /** Callbacks */
  onTabChange?: (tabId: string) => void;
  onFilterChange?: (value: string | number) => void;
  onArticleClick?: (article: ArticleCardProps) => void;
  className?: string;
}

const mockDefaultArticles: ArticleCardProps[] = [
  {
    badgeVariant: "none",
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    date: "15 Agustus 2026",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    likesCount: 237,
    commentsCount: 12,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
  },
  {
    badgeVariant: "none",
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    date: "15 Agustus 2026",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    likesCount: 237,
    commentsCount: 12,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
  },
];

export const ArticleSection: React.FC<ArticleSectionProps> = ({
  authorProfile,
  tabsVariant = "profile-author",
  activeTab,
  filterOptions,
  selectedFilter = "Populer",
  articles = mockDefaultArticles,
  onTabChange,
  onFilterChange,
  onArticleClick,
  className = "",
}) => {
  const [currentTab, setCurrentTab] = useState<string>(
    activeTab || (tabsVariant === "profile-reader" ? "artikel-disuka" : "artikel-dibuat")
  );

  const handleTabChange = (id: string) => {
    setCurrentTab(id);
    onTabChange?.(id);
  };

  return (
    <section
      className={`w-full max-w-[1143px] mx-auto flex flex-col items-center gap-[25px] font-['Poppins'] ${className}`}
    >
      {/* Profil Header */}
      <div className="w-full flex flex-col items-start gap-[37px]">
        {authorProfile && (
          <div className="w-full max-w-[1033px] flex flex-row items-center gap-[34px]">
            <div className="relative w-[186px] h-[186px] shrink-0 rounded-full overflow-hidden">
              <Image
                src={authorProfile.avatarUrl}
                alt={authorProfile.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-[23px] w-[813px]">
              <h1 className="text-[36px] font-bold leading-[26px] text-[#1B4E46] m-0">
                {authorProfile.name}
              </h1>
              <p className="text-[20px] font-medium leading-[24px] text-[#1B4E46]/75 m-0">
                {authorProfile.bio}
              </p>
            </div>
          </div>
        )}

        {/* Tab & Filter Area */}
        <div className="w-full flex flex-col items-start gap-[30px]">
          <div className="w-full border-b border-[#1B4E46]/20">
            <SectionTabs
              variant={tabsVariant}
              activeTab={activeTab !== undefined ? activeTab : currentTab}
              onChange={handleTabChange}
            />
          </div>

          <div className="w-[233px]">
            <Dropdown
              variant="filter"
              options={filterOptions}
              value={selectedFilter}
              onSelect={onFilterChange}
            />
          </div>
        </div>
      </div>

      {/* List Artikel */}
      <div className="w-full max-w-[1083px] flex flex-col items-start gap-[33px]">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              onClick={() => onArticleClick?.(article)}
              className="w-full cursor-pointer"
            >
              <ArticleCard {...article} badgeVariant="none" />
            </div>
          ))
        ) : (
          <div className="w-full py-12 text-center text-[#8C9B95]">
            Belum ada artikel untuk ditampilkan.
          </div>
        )}
      </div>
    </section>
  );
};

ArticleSection.displayName = "ArticleSection";

export default ArticleSection;