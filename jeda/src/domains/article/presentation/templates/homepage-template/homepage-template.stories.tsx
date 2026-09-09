import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { HomepageTemplate, HomepageTemplateProps } from "./homepage-template";

const statePresets: Record<string, Partial<HomepageTemplateProps>> = {
  "Guest": {
    authStatus: "guest",
    hasDraft: false,
    hasPublished: false,
    homepageSectionProps: {
      title: "Temukan Ide & Wawasan Baru Harian",
      subtitle: "Mulai jelajahi artikel menarik dari berbagai penulis atau daftarkan akunmu sekarang.",
      exploreLabel: "Jelajahi Artikel",
      registerLabel: "Daftar Sekarang",
    },
  },
  "Logged In": {
    authStatus: "logged-in",
    hasDraft: false,
    hasPublished: false,
    homepageSectionProps: {
      title: "Selamat Datang Kembali",
      subtitle: "Temukan artikel yang dikurasi khusus sesuai dengan minat dan preferensimu.",
    },
  },
  "Author Empty State": {
    authStatus: "author",
    hasDraft: false,
    hasPublished: false,
    homepageSectionProps: {
      title: "Dashboard Penulis",
      subtitle: "Tulis karya pertamamu dan bagikan pengetahuan kepada dunia.",
    },
  },
  "Author With Draft Only": {
    authStatus: "author",
    hasDraft: true,
    hasPublished: false,
    homepageSectionProps: {
      title: "Dashboard Penulis",
      subtitle: "Kelola ide tulisan dan kembangkan ide-ide kreatifmu.",
    },
  },
  "Author With Published Only": {
    authStatus: "author",
    hasDraft: false,
    hasPublished: true,
    homepageSectionProps: {
      title: "Dashboard Penulis",
      subtitle: "Pantau performa tulisan yang telah kamu publikasikan.",
    },
  },
  "Author With Published And Draft": {
    authStatus: "author",
    hasDraft: true,
    hasPublished: true,
    homepageSectionProps: {
      title: "Dashboard Penulis",
      subtitle: "Pantau performa tulisanmu dan lanjutkan draft yang belum selesai.",
    },
  },
};

type StoryProps = HomepageTemplateProps & {
  viewState: keyof typeof statePresets;
};

const meta: Meta<StoryProps> = {
  title: "📦componen/template/homepage-template",
  component: HomepageTemplate,
  tags: ["autodocs"],
  argTypes: {
    viewState: {
      name: "Tampilan State",
      control: "select",
      options: Object.keys(statePresets),
      description: "Pilih skenario tampilan template yang ingin diuji",
    },

    authStatus: { table: { disable: true } },
    hasDraft: { table: { disable: true } },
    hasPublished: { table: { disable: true } },
    sidebarProps: { table: { disable: true } },
    headerProps: { table: { disable: true } },
    homepageSectionProps: { table: { disable: true } },
    className: { table: { disable: true } },
    onLoginClick: { table: { disable: true } },
    onExploreClick: { table: { disable: true } },
    onRegisterClick: { table: { disable: true } },
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
    return <HomepageTemplate {...presetProps} {...args} />;
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