import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoginModal } from "./login-modal";

const meta: Meta<typeof LoginModal> = {
  title: "📦componen/organism/auth/login-modal",
  component: LoginModal,
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
      description: "Status loading saat proses autentikasi berlangsung",
    },
    errorMessageVariant: {
      control: "select",
      options: [
        null,
        "error-email-password",
        "error-unverified",
        "error-google-linked",
        "error-connection",
        "error-preference",
      ],
      description: "Varian pesan error Toast yang akan ditampilkan",
    },
    onClose: { action: "onClose clicked" },
    onSubmit: { action: "onSubmit submitted" },
    onGoogleLogin: { action: "onGoogleLogin clicked" },
    onRegisterClick: { action: "onRegisterClick clicked" },
    onForgotPasswordClick: { action: "onForgotPasswordClick clicked" },
    onToastActionClick: { action: "onToastActionClick clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof LoginModal>;

// Story 1: Tampilan Default
export const Default: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: null,
  },
};

// Story 2: Error Email atau Password Salah
export const ErrorEmailPassword: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: "error-email-password",
  },
};

// Story 3: Error Akun Belum Diverifikasi
export const ErrorUnverified: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: "error-unverified",
  },
};

// Story 4: Error Akun Terhubung Google
export const ErrorGoogleLinked: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    errorMessageVariant: "error-google-linked",
  },
};

// Story 5: Status Loading
export const LoadingState: Story = {
  args: {
    isOpen: true,
    isLoading: true,
    errorMessageVariant: null,
  },
};