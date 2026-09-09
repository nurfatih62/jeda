import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { ArticleDetailSection, ArticleDetailSectionProps } from "./article-detail-section";

const meta: Meta<typeof ArticleDetailSection> = {
  title: "📦componen/organism/article-detail-section",
  component: ArticleDetailSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    authStatus: {
      control: "radio",
      options: ["guest", "logged-in", "author"],
      description: "Status autentikasi pengguna",
    },
    onBackClick: { action: "back clicked" },
    onLikeClick: { action: "like clicked" },
    onBookmarkClick: { action: "bookmark clicked" },
    onShareClick: { action: "share clicked" },
    onReportClick: { action: "report clicked" },
    onPageChange: { action: "page changed" },
    onLoginClick: { action: "login clicked" },
    onRegisterClick: { action: "register clicked" },
    onLoadMoreComments: { action: "load more comments clicked" },
    onArticleCardClick: { action: "recommended article card clicked" },
  },
};

export default meta;
type Story = StoryObj<ArticleDetailSectionProps>;

const mockComments = [
  {
    id: "1",
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    date: "15 Agustus 2026",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    likesCount: 237,
    repliesCount: 12,
  },
];

const mockRecommendedArticles = [
  {
    id: "rec-1",
    category: "Makanan",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
    authorName: "Asya mc",
    publishedDate: "15 Agustus 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-2",
    category: "Wisata",
    title: "Eksplorasi Keindahan Alam Subang",
    description:
      "Menjelajahi destinasi tersembunyi yang instagramable di Jawa Barat....",
    authorName: "Budi Santoso",
    publishedDate: "14 Agustus 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "rec-3",
    category: "Gaya Hidup",
    title: "Tips Memulai Gaya Hidup Sehat",
    description:
      "Langkah-langkah sederhana untuk meningkatkan kualitas hidup sehari-hari....",
    authorName: "Siti Rahma",
    publishedDate: "12 Agustus 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80",
  },
];

// 1. Varian Guest (TIDAK Menampilkan Rekomendasi Artikel)
export const Guest: Story = {
  args: {
    authStatus: "guest",
    tags: ["Makanan", "Wisata"],
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    publishedDate: "15 Agustus 2026",
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamIodu Ijijcaaijecaimai",
    coverImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80",
    content: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
    likesCount: 237,
    commentsCount: 12,
    currentPage: 1,
    totalPages: 3,
    comments: mockComments,
    recommendedArticles: mockRecommendedArticles,
  },
};

// 2. Varian Logged In (MENAMPILKAN Rekomendasi Artikel)
export const LoggedIn: Story = {
  args: {
    ...Guest.args,
    authStatus: "logged-in",
  },
};

// 3. Varian Author (MENAMPILKAN Rekomendasi Artikel)
export const Author: Story = {
  args: {
    ...Guest.args,
    authStatus: "author",
  },
};