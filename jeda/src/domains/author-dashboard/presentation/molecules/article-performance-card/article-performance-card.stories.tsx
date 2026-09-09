import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticlePerformanceCard } from "./article-performance-card";

const meta = {
  title: "📦componen/molecule/article-performance-card",
  component: ArticlePerformanceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    views: {
      control: "text",
      description: "Jumlah views artikel",
    },
    viewsLabel: {
      control: "text",
      description: "Label untuk metrik views",
    },
    likes: {
      control: "text",
      description: "Jumlah likes artikel",
    },
    likesLabel: {
      control: "text",
      description: "Label untuk metrik likes",
    },
    comments: {
      control: "text",
      description: "Jumlah komentar artikel",
    },
    commentsLabel: {
      control: "text",
      description: "Label untuk metrik komentar",
    },
    growthText: {
      control: "text",
      description: "Teks indikator pertumbuhan di sisi kiri bawah",
    },
    footerLinkText: {
      control: "text",
      description: "Teks tautan/tombol di sisi kanan bawah",
    },
    onFooterLinkClick: {
      action: "footerLinkClick",
      description: "Callback saat tautan footer diklik",
    },
  },
} satisfies Meta<typeof ArticlePerformanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state dengan nilai bawaan dari props */
export const Default: Story = {
  args: {},
};

/** Variasi dengan data performa yang tinggi */
export const HighPerformance: Story = {
  args: {
    views: "125.4K",
    likes: "12.8K",
    comments: "1.2K",
    growthText: "45% dari minggu lalu",
    footerLinkText: "Lihat Detail Analitik",
  },
};

/** Variasi dengan teks/label Bahasa Inggris */
export const EnglishLabels: Story = {
  args: {
    views: "5.2K",
    viewsLabel: "Views",
    likes: "840",
    likesLabel: "Likes",
    comments: "96",
    commentsLabel: "Comments",
    growthText: "18% vs last week",
    footerLinkText: "View full report",
  },
};

/** Variasi tanpa tautan di footer kanan bawah */
export const WithoutFooterLink: Story = {
  args: {
    growthText: "5% dari minggu lalu",
    footerLinkText: "",
  },
};