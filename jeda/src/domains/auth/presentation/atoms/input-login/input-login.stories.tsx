import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputLogin } from "./input-login";

const meta: Meta<typeof InputLogin> = {
  title: "📦componen/atom/input/input-login",
  component: InputLogin,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// State Kosong (Text)
export const Empty: Story = {
  args: {
    placeholder: "nama@gmail.com",
    defaultValue: "",
  },
};

// State Terisi (Text)
export const Filled: Story = {
  args: {
    defaultValue: "ui.lib.drive@gmail.com",
  },
};

// State Kosong (Password)
export const PasswordEmpty: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    defaultValue: "",
  },
};

// State Terisi (Password)
export const PasswordFilled: Story = {
  args: {
    type: "password",
    defaultValue: "secretpassword123",
  },
};