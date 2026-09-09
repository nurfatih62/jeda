import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserProfileSection } from "./UserProfileSection";

const meta = {
  title: "📦componen/organism/admin/user-profile-section",
  component: UserProfileSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onProfileSubmit: { action: "profileSubmitted" },
    onPasswordSubmit: { action: "passwordSubmitted" },
    onForgotPassword: { action: "forgotPasswordClicked" },
  },
} satisfies Meta<typeof UserProfileSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialUsername: "Andita mupa",
    initialEmail: "andita@gmail.com",
  },
};