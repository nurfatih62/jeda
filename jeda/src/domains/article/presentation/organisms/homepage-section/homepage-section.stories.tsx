import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { HomepageSection, HomepageSectionProps } from "./homepage-section";

// Mapping 6 preset kondisi
const statePresets: Record<string, Partial<HomepageSectionProps>> = {
  "Guest": {
    authStatus: "guest",
    title: "Temukan Ide & Wawasan Baru Harian",
    subtitle: "Mulai jelajahi artikel menarik dari berbagai penulis atau daftarkan akunmu sekarang.",
    exploreLabel: "Jelajahi Artikel",
    registerLabel: "Daftar Sekarang",
    hasDraft: false,
    hasPublished: false,
  },
  "Logged In": {
    authStatus: "logged-in",
    title: "Selamat Datang Kembali",
    subtitle: "Temukan artikel yang dikurasi khusus sesuai dengan minat dan preferensimu.",
    hasDraft: false,
    hasPublished: false,
  },
  "Author Empty State": {
    authStatus: "author",
    title: "Dashboard Penulis",
    subtitle: "Tulis karya pertamamu dan bagikan pengetahuan kepada dunia.",
    hasDraft: false,
    hasPublished: false,
  },
  "Author With Draft Only": {
    authStatus: "author",
    title: "Dashboard Penulis",
    subtitle: "Kelola ide tulisan dan kembangkan ide-ide kreatifmu.",
    hasDraft: true,
    hasPublished: false,
  },
  "Author With Published Only": {
    authStatus: "author",
    title: "Dashboard Penulis",
    subtitle: "Pantau performa tulisan yang telah kamu publikasikan.",
    hasDraft: false,
    hasPublished: true,
  },
  "Author With Published And Draft": {
    authStatus: "author",
    title: "Dashboard Penulis",
    subtitle: "Pantau performa tulisanmu dan lanjutkan draft yang belum selesai.",
    hasDraft: true,
    hasPublished: true,
  },
};

type StoryProps = HomepageSectionProps & {
  viewState: keyof typeof statePresets;
};

const meta: Meta<StoryProps> = {
  title: "📦componen/organism/homepage-section",
  component: HomepageSection,
  tags: ["autodocs"],
  argTypes: {
    viewState: {
      name: "Tampilan State",
      control: "select",
      options: Object.keys(statePresets),
      description: "Pilih skenario kondisi halaman",
    },

    // Sembunyikan controls berlebih
    authStatus: { table: { disable: true } },
    hasDraft: { table: { disable: true } },
    hasPublished: { table: { disable: true } },
    tabVariant: { table: { disable: true } },
    activeTab: { table: { disable: true } },
    defaultTab: { table: { disable: true } },
    articles: { table: { disable: true } },
    draftCardProps: { table: { disable: true } },
    performanceCardProps: { table: { disable: true } },
    className: { table: { disable: true } },
    exploreLabel: { table: { disable: true } },
    registerLabel: { table: { disable: true } },
    onExploreClick: { table: { disable: true } },
    onRegisterClick: { table: { disable: true } },
    onTabChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Interactive: Story = {
  args: {
    viewState: "Guest",
  },
  render: ({ viewState, ...args }) => {
    const presetProps = statePresets[viewState] || statePresets["Guest"];
    return <HomepageSection {...presetProps} {...args} />;
  },
};

export const Guest: Story = {
  args: { viewState: "Guest" },
  render: Interactive.render,
};

export const LoggedIn: Story = {
  args: { viewState: "Logged In" },
  render: Interactive.render,
};

export const AuthorEmptyState: Story = {
  args: { viewState: "Author Empty State" },
  render: Interactive.render,
};

export const AuthorWithDraftOnly: Story = {
  args: { viewState: "Author With Draft Only" },
  render: Interactive.render,
};

export const AuthorWithPublishedOnly: Story = {
  args: { viewState: "Author With Published Only" },
  render: Interactive.render,
};

export const AuthorWithPublishedAndDraft: Story = {
  args: { viewState: "Author With Published And Draft" },
  render: Interactive.render,
};