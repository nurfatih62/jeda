import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EksplorTopikSection } from "./eksplor-topik-section";

const meta: Meta<typeof EksplorTopikSection> = {
  title: "📦componen/organism/eksplor/eksplor-topik-section",
  component: EksplorTopikSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EksplorTopikSection>;

/**
 * **Default Story (Frame 97)**
 * - Menampilkan section lengkap dari "Eksplor topik" yang mencakup judul, 
 *   kumpulan tombol tag dengan aturan filter eksklusif, dropdown filter urutan, 
 *   serta daftar kartu artikel di bawahnya.
 */
export const Default: Story = {
  args: {
    title: "Eksplor topik",
    tags: [
      { label: "Semua", defaultActive: true },
      { label: "Teknologi", defaultActive: false },
      { label: "Wisata", defaultActive: false },
      { label: "Makanan", defaultActive: false },
      { label: "Perkerjaan", defaultActive: false },
      { label: "Pengembangan diri", defaultActive: false },
      { label: "Kehidupan", defaultActive: false },
    ],
    dropdownValue: "populer",
    articles: [
      {
        badgeVariant: "none",
        authorName: "Asya mc",
        date: "15 Agustus 2026",
        title: "Pengaruh nikotin",
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
        date: "15 Agustus 2026",
        title: "Tips olahraga di pagi hari",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        likesCount: 237,
        commentsCount: 12,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
};