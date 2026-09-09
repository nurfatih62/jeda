import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleCard } from "./article-card";

const meta: Meta<typeof ArticleCard> = {
  title: "📦componen/molecule/card/article-card",
  component: ArticleCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    badgeVariant: {
      control: { type: "select" },
      options: [
        "paling-banyak-dibaca",
        "trending",
        "cocok-denganmu",
        "terbaru",
        "lanjutkan-membaca",
        "none", // Opsi baru untuk menghilangkan badge
      ],
    },
    likesCount: { control: "text" },
    commentsCount: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Varian Trending
export const Trending: Story = {
  args: {
    badgeVariant: "trending",
    authorName: "Asya mc",
    date: "15 Agustus 2026",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
    likesCount: 237,
    commentsCount: 3,
  },
};

// Varian Tanpa Badge (No Badge)
export const TanpaBadge: Story = {
  args: {
    badgeVariant: "none",
    authorName: "Ahmad Fauzi",
    date: "20 Agustus 2026",
    title: "Mengenal Arsitektur Perangkat Lunak Modern",
    description:
      "Pembahasan mendalam mengenai pola desain dan struktur kode yang bersih untuk aplikasi skala besar.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=500&auto=format&fit=crop",
    likesCount: 112,
    commentsCount: 8,
  },
};

// Varian Tanpa Gambar Thumbnail
export const TanpaGambar: Story = {
  args: {
    badgeVariant: "terbaru",
    authorName: "Siti Rahma",
    date: "25 Agustus 2026",
    title: "Catatan Perjalanan Menuju Produktivitas",
    description:
      "Bagaimana mengelola energi dan waktu secara efektif tanpa mengalami burnout dalam pekerjaan sehari-hari.",
    showThumbnail: false,
    likesCount: 95,
    commentsCount: 14,
  },
};

// Varian Konten Panjang Fleksibel
export const KontenPanjang: Story = {
  args: {
    badgeVariant: "cocok-denganmu",
    authorName: "Budi Santoso",
    date: "01 September 2026",
    title: "Panduan Lengkap Mengembangkan Aplikasi Web Modern Menggunakan Next.js dan Tailwind CSS",
    description:
      "Artikel ini membahas secara rinci dan bertahap bagaimana membangun aplikasi web dari awal hingga deployment, termasuk praktik terbaik tata letak responsif, manajemen state, dan optimasi performa agar aplikasi berjalan cepat dan fleksibel di berbagai perangkat.",
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
    likesCount: 342,
    commentsCount: 29,
  },
};