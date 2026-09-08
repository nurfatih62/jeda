import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleSection, ArticleSectionProps } from "./article-section";

const meta: Meta<typeof ArticleSection> = {
  title: "📦componen/organism/article-section",
  component: ArticleSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    tabsVariant: {
      control: "select",
      options: ["profile-author", "profile-reader"],
    },
    onTabChange: { action: "tab changed" },
    onFilterChange: { action: "filter changed" },
    onArticleClick: { action: "article clicked" },
  },
};

export default meta;
type Story = StoryObj<ArticleSectionProps>;

/* --- VARIAN 1: PROFILE AUTHOR --- */
export const ProfileAuthor: Story = {
  args: {
    authorProfile: {
      name: "Bayu Trimora",
      bio: "IT Enthusiats berpengalaman di bidang software dan design. Menikmati perkembangan teknologi dan AI.",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    tabsVariant: "profile-author",
    activeTab: "artikel-dibuat",
    selectedFilter: "Populer",
  },
};

/* --- VARIAN 2: PROFILE READER --- */
export const ProfileReader: Story = {
  args: {
    authorProfile: {
      name: "Arif tria",
      bio: "Guru yang senang berbagi ilmu da pandangan kehidupan",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    tabsVariant: "profile-reader",
    activeTab: "artikel-disuka",
    selectedFilter: "Populer",
  },
};