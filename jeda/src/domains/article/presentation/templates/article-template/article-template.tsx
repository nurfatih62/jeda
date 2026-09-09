"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "@/shared/organisms/main-layout/main-layout";
import {
  ArticleDetailSection,
  ArticleDetailSectionProps,
} from "@/domains/article/presentation/organisms/article-detail-section/article-detail-section";

export interface ArticleTemplateProps {
  /** Varian autentikasi ("guest" | "reader" | "author") */
  variant?: "guest" | "reader" | "author";
  /** Props khusus untuk ArticleDetailSection (authStatus dipetakan otomatis dari variant) */
  articleDetailSectionProps?: Omit<ArticleDetailSectionProps, "authStatus">;
  /** Props tambahan untuk MainLayout */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
}

export const ArticleTemplate: React.FC<ArticleTemplateProps> = ({
  variant = "guest",
  articleDetailSectionProps,
  mainLayoutProps,
}) => {
  // Petakan variant template ke authStatus ArticleDetailSection
  // ArticleDetailSection hanya mengenal "guest" | "logged-in" | "author"
  const authStatus: ArticleDetailSectionProps["authStatus"] =
    variant === "reader" ? "logged-in" : variant;

  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: variant === "author" ? "author" : "reader",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant,
        ...mainLayoutProps?.headerProps,
      }}
    >
      <ArticleDetailSection
        authStatus={authStatus}
        {...articleDetailSectionProps}
      />
    </MainLayout>
  );
};

ArticleTemplate.displayName = "ArticleTemplate";

export default ArticleTemplate;
