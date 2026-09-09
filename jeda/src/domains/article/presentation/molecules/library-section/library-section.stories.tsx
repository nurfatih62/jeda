import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LibrarySection } from "./library-section";
import { ArticleCard } from "@/domains/article/presentation/molecules/card/article-card"; // <-- Path diperbaiki sesuai struktur folder Anda

const meta: Meta<typeof LibrarySection> = {
  title: "📦componen/molecule/library-section",
  component: LibrarySection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "Status login pengguna",
    },
    activeTab: {
      control: "select",
      options: ["riwayat", "disimpan", "disuka", "komentar"],
      description: "Tab aktif yang sedang dipilih",
    },
    title: {
      control: "text",
      description: "Judul section library",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LibrarySection>;

/**
 * Varian ketika pengguna **belum login** (Guest State).
 * Menampilkan judul, tab navigasi, serta banner CTA ajakan bergabung.
 */
export const LoggedOut: Story = {
  args: {
    title: "Library",
    isLoggedIn: false,
    activeTab: "riwayat",
  },
};

/**
 * Varian ketika pengguna **sudah login**.
 * Banner CTA disembunyikan dan digantikan dengan konten daftar artikel (`children`).
 */
export const LoggedIn: Story = {
  args: {
    title: "Library",
    isLoggedIn: true,
    activeTab: "riwayat",
    children: (
      <>
        <ArticleCard
          badgeVariant="none"
          authorName="Asya mc"
          date="15 Agustus 2026"
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
          likesCount={237}
          commentsCount={14}
        />
        <ArticleCard
          badgeVariant="none"
          authorName="Asya mc"
          date="15 Agustus 2026"
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
          likesCount={237}
          commentsCount={14}
        />
      </>
    ),
  },
};