import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateNewPasswordModal } from "./create-new-password-modal";

const meta: Meta<typeof CreateNewPasswordModal> = {
  title: "📦componen/organism/auth/create-new-password-modal",
  component: CreateNewPasswordModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: { action: "password reset submitted" },
    onBack: { action: "back arrow clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof CreateNewPasswordModal>;

export const Default: Story = {
  args: {},
};