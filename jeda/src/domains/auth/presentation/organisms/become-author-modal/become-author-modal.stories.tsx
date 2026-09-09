import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BecomeAuthorModal } from "./become-author-modal";

const meta: Meta<typeof BecomeAuthorModal> = {
  title: "📦componen/organism/auth/become-author-modal",
  component: BecomeAuthorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    onSuccessSubmit: { action: "author status activated" },
    onStartWriting: { action: "navigate to editor" },
  },
};

export default meta;
type Story = StoryObj<typeof BecomeAuthorModal>;

export const Default: Story = {};