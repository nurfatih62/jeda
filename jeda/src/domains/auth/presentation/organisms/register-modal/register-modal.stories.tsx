import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RegisterModal } from "./register-modal";

const meta: Meta<typeof RegisterModal> = {
  title: "📦componen/organism/auth/register-modal",
  component: RegisterModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Menentukan apakah modal ditampilkan",
    },
    isLoading: {
      control: "boolean",
      description: "Status loading saat proses registrasi berlangsung",
    },
    errorMessageVariant: {
      control: "select",
      options: [
        null,
        "error-connection",
        "error-preference",
        "failed-with-subtext",
      ],
      description: "Varian pesan error Toast yang akan ditampilkan",
    },
    onClose: { action: "onClose clicked" },
    onSubmit: { action: "onSubmit submitted" },
    onGoogleRegister: { action: "onGoogleRegister clicked" },
    onLoginClick: { action: "onLoginClick clicked" },
    onTermsClick: { action: "onTermsClick clicked" },
    onToastActionClick: { action: "onToastActionClick clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof RegisterModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: null,
  },
};

export const LoadingState: Story = {
  args: {
    isOpen: true,
    isLoading: true,
    errorMessageVariant: null,
  },
};

export const WithErrorToast: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: "error-connection",
  },
};