import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleSectionTemplate } from "./article-section-template";

const meta: Meta<typeof ArticleSectionTemplate> = {
  title: "📦componen/template/article-section-template",
  component: ArticleSectionTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["author", "reader"],
      description: "Varian pemilik profil (author: 3 tab, reader: 2 tab)",
    },
    articleSectionProps: {
      control: "object",
      description: "Props untuk section (authorProfile, articles, filter, callbacks)",
    },
    mainLayoutProps: {
      control: "object",
      description: "Props layout (sidebarProps, headerProps)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleSectionTemplate>;

// 1. Profil author — 3 tab (artikel dibuat, draft, ... )
export const Author: Story = {
  args: {
    variant: "author",
  },
};

// 2. Profil reader — 2 tab (artikel disukai, ...)
export const Reader: Story = {
  args: {
    variant: "reader",
  },
};

// 3. Kosong — belum ada artikel
export const Empty: Story = {
  args: {
    variant: "author",
    articleSectionProps: {
      articles: [],
    },
  },
};
