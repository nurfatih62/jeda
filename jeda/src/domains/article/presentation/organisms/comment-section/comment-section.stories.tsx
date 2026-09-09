import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentSection, CommentSectionProps } from "./comment-section";

const meta: Meta<typeof CommentSection> = {
  title: "📦componen/organism/comment-section",
  component: CommentSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onBackClick: { action: "back clicked" },
    onSubmitComment: { action: "comment submitted" },
    onFilterChange: { action: "filter changed" },
    onLikeComment: { action: "liked comment" },
    onReplyComment: { action: "replied to comment" },
    onShareComment: { action: "shared comment" },
    onReportComment: { action: "reported comment" },
    onSaveComment: { action: "saved comment" },
  },
};

export default meta;
type Story = StoryObj<CommentSectionProps>;

const dummyComments = [
  {
    id: 1,
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    date: "15 Agustus 2026",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    likesCount: 237,
    commentsCount: 2,
    // Balasan Komentar (Nested Level 1)
    replies: [
      {
        id: 11,
        authorName: "Budi Santoso",
        authorAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        date: "15 Agustus 2026",
        text: "Sangat setuju! Penjelasannya sangat masuk akal dan membantu.",
        likesCount: 15,
        commentsCount: 1,
        // Balasan dari Balasan (Nested Level 2)
        replies: [
          {
            id: 111,
            authorName: "Asya mc",
            authorAvatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
            date: "15 Agustus 2026",
            text: "Terima kasih responnya Budi!",
            likesCount: 3,
            commentsCount: 0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    authorName: "Asya mc",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    date: "15 Agustus 2026",
    text: "Berikut adalah gambaran diagram bisnis canvas yang dijelaskan.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
    likesCount: 237,
    commentsCount: 14,
  },
];

export const Default: Story = {
  args: {
    totalComments: 5,
    userInitial: "JD",
    selectedFilter: "Populer",
    comments: dummyComments,
  },
};