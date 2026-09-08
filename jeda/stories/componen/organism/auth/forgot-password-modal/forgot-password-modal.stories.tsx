import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ForgotPasswordModal } from "./forgot-password-modal";

const meta: Meta<typeof ForgotPasswordModal> = {
  title: "📦componen/organism/auth/forgot-password-modal",
  component: ForgotPasswordModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error"],
    },
    onSubmit: { action: "submitted" },
    onBackToLogin: { action: "back-to-login clicked" },
    onBack: { action: "back arrow clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordModal>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    errorMessage: "Email tidak terdaftar",
  },
};