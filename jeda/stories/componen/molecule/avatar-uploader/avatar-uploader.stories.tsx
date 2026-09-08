import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarUploader } from "./avatar-uploader";

const meta: Meta<typeof AvatarUploader> = {
  title: "📦componen/molecule/avatar-uploader",
  component: AvatarUploader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Status nonaktif untuk uploader",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Tampilan Default (Menampilkan Inisial teks "JD") */
export const Default: Story = {
  args: {
    initials: "JD",
    helperText: "JPG, PNG, atau WebP. Maks. 5 MB",
    disabled: false,
  },
};

/** Tampilan dengan gambar avatar yang sudah terunggah */
export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=300&auto=format&fit=crop",
    initials: "JD",
    helperText: "JPG, PNG, atau WebP. Maks. 5 MB",
    disabled: false,
  },
};

/** Tampilan dalam status nonaktif (disabled) */
export const Disabled: Story = {
  args: {
    initials: "JD",
    helperText: "JPG, PNG, atau WebP. Maks. 5 MB",
    disabled: true,
  },
};