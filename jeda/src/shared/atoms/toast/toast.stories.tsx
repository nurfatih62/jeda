import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from "./toast";

const meta: Meta<typeof Toast> = {
  title: "📦componen/atom/toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Contoh Custom Teks Penuh Bebas via Props
export const FullyCustomText: Story = {
  args: {
    variant: "custom",
    title: "Peringatan Sistem: ",
    actionText: "Perbarui Sekarang",
    actionType: "primary",
    subtext: "Versi aplikasi Anda sudah kedaluwarsa. Silakan lakukan pembaruan.",
    onActionClick: () => alert("Aksi kustom diklik!"),
  },
};

// Varian Preset Lainnya
export const ErrorUnverifiedAccount: Story = {
  args: {
    variant: "error-unverified",
    onActionClick: () => alert("Navigasi Kirim Ulang Email"),
  },
};

export const ErrorEmailOrPassword: Story = {
  args: {
    variant: "error-email-password",
  },
};

export const SuccessWithSubtext: Story = {
  args: {
    variant: "success-with-subtext",
  },
};