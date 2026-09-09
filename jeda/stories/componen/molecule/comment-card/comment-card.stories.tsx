import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentCard } from "./comment-card";

const meta: Meta<typeof CommentCard> = {
  title: "📦componen/molecule/comment-card",
  component: CommentCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    depth: 0,
    comment: {
      id: "1",
      authorName: "Sinta W.",
      authorAvatar: "https://picsum.photos/seed/jeda-avatar/64/64",
      date: "2 jam lalu",
      text: "Tulisannya menyentuh banget, relate sama pengalaman pribadi.",
      likesCount: 12,
      commentsCount: 3,
      isLiked: false,
      isSaved: false,
    },
  },
};

export const WithReplies: Story = {
  args: {
    depth: 0,
    comment: {
      id: "1",
      authorName: "Sinta W.",
      authorAvatar: "https://picsum.photos/seed/jeda-avatar/64/64",
      date: "2 jam lalu",
      text: "Komentar utama dengan balasan.",
      likesCount: 5,
      commentsCount: 1,
      replies: [
        {
          id: "1-1",
          authorName: "Andi S.",
          authorAvatar: "https://picsum.photos/seed/jeda-avatar2/64/64",
          date: "1 jam lalu",
          text: "Setuju banget!",
          likesCount: 2,
          commentsCount: 0,
        },
      ],
    },
  },
};
