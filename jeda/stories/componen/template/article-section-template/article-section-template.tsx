"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "../../organism/guest/main-layout/main-layout";
import {
  ArticleSection,
  ArticleSectionProps,
} from "../../organism/article-section/article-section";

export interface ArticleSectionTemplateProps {
  /** Varian pemilik profil ("author": 3 tab | "reader": 2 tab) */
  variant?: "author" | "reader";
  /** Props khusus untuk ArticleSection (tabsVariant dipetakan otomatis dari variant) */
  articleSectionProps?: Omit<ArticleSectionProps, "tabsVariant">;
  /** Props tambahan untuk MainLayout (layout: Sidebar + Header + area konten) */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
  /** Tambahan kelas CSS untuk layout luar */
  className?: string;
}

export const ArticleSectionTemplate: React.FC<ArticleSectionTemplateProps> = ({
  variant = "author",
  articleSectionProps,
  mainLayoutProps,
  className = "",
}) => {
  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: variant === "author" ? "author" : "reader",
        activeVariant: "profile",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant,
        ...mainLayoutProps?.headerProps,
      }}
      className={className}
    >
      <ArticleSection
        tabsVariant={variant === "author" ? "profile-author" : "profile-reader"}
        {...articleSectionProps}
      />
    </MainLayout>
  );
};

ArticleSectionTemplate.displayName = "ArticleSectionTemplate";

export default ArticleSectionTemplate;
