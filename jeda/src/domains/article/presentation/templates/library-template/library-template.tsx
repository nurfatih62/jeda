"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "@/shared/organisms/main-layout/main-layout";
import { LibrarySection, LibrarySectionProps } from "@/domains/article/presentation/molecules/library-section/library-section";
import { ArticleCard, ArticleCardProps } from "@/domains/article/presentation/molecules/card/article-card";

export type LibraryTemplateVariant = "logged-out" | "logged-in" | "author";

// Definisikan tipe artikel yang mendukung ID dan opsional untuk properti lainnya
export type LibraryArticleItem = Partial<ArticleCardProps> & {
  id?: string | number;
  title: string;
  description: string;
  authorName: string;
  date: string;
};

export interface LibraryTemplateProps {
  /** Pilihan varian: 'logged-out', 'logged-in', atau 'author' */
  variant?: LibraryTemplateVariant;
  layoutProps?: MainLayoutProps;
  sectionProps?: LibrarySectionProps;
  /** Daftar artikel opsional untuk ditampilkan pada card */
  articles?: LibraryArticleItem[];
  className?: string;
}

export const LibraryTemplate: React.FC<LibraryTemplateProps> = ({
  variant = "logged-out",
  layoutProps,
  sectionProps,
  articles = [],
  className = "",
}) => {
  // Logika Pemetaan Varian
  const isLoggedOut = variant === "logged-out";
  const isAuthor = variant === "author";
  const isLoggedIn = !isLoggedOut;

  // Data contoh (mock) default untuk status logged-in dan author jika belum ada data dari props
  const defaultArticles: LibraryArticleItem[] = isLoggedIn
    ? [
        {
          id: 1,
          title: "Belajar React dan TypeScript untuk Pemula",
          description: "Panduan lengkap membangun komponen modern menggunakan React dan TypeScript dengan best practices.",
          authorName: isAuthor ? "Author Kamu" : "Asya mc",
          date: "15 Agustus 2026",
          likesCount: 237,
          commentsCount: 12,
          badgeVariant: "paling-banyak-dibaca",
        },
        {
          id: 2,
          title: "Mengoptimalkan Performa Next.js Aplikasi Skala Besar",
          description: "Tips dan trik meningkatkan kecepatan load time, rendering strategy, dan SEO pada aplikasi Next.js modern.",
          authorName: isAuthor ? "Author Kamu" : "John Doe",
          date: "10 Agustus 2026",
          likesCount: 154,
          commentsCount: 9,
          badgeVariant: "none",
        },
      ]
    : [];

  const articleList = articles.length > 0 ? articles : defaultArticles;

  return (
    <MainLayout
      {...layoutProps}
      headerProps={{
        // Jika author pakai variant author, jika logged-in pakai reader, jika guest pakai guest
        variant: isLoggedOut ? "guest" : (isAuthor ? "author" : "reader"),
        ...layoutProps?.headerProps,
      }}
      sidebarProps={{
        activeVariant: "library",
        // Role sidebar: author jika varian author, reader jika logged-in
        role: isLoggedOut ? undefined : (isAuthor ? "author" : "reader"),
        ...layoutProps?.sidebarProps,
      }}
      className={className}
    >
      <LibrarySection
        isLoggedIn={isLoggedIn} // True untuk 'logged-in' dan 'author'
        title={sectionProps?.title || (isAuthor ? "Library Author" : "Library")}
        variant={isAuthor ? "profile-author" : "library"}
        {...sectionProps}
      >
        {/* Render daftar ArticleCard jika statusnya logged-in atau author */}
        {isLoggedIn && (
          <div className="flex flex-col gap-4 w-full">
            {articleList.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                title={article.title}
                description={article.description}
                authorName={article.authorName}
                authorAvatar={article.authorAvatar}
                date={article.date}
                likesCount={article.likesCount}
                commentsCount={article.commentsCount}
                thumbnailUrl={article.thumbnailUrl}
                badgeVariant={article.badgeVariant}
                badge={article.badge}
                onLike={article.onLike}
                onComment={article.onComment}
                onBookmark={article.onBookmark}
                onShare={article.onShare}
                onReport={article.onReport}
              />
            ))}
          </div>
        )}
      </LibrarySection>
    </MainLayout>
  );
};