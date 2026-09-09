import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategorySelectionModal } from "./category-selection-modal";

const meta: Meta<typeof CategorySelectionModal> = {
  title: "📦componen/organism/auth/category-selection-modal",
  component: CategorySelectionModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Menentukan apakah modal ditampilkan",
    },
    maxSelection: {
      control: { type: "number", min: 1, max: 5 },
      description: "Jumlah pilihan kategori yang dibutuhkan",
    },
    onBack: {
      action: "onBack clicked",
      description: "Callback ketika tombol kembali diklik",
    },
    onSubmit: {
      action: "onSubmit clicked",
      description: "Callback ketika tombol Masuk diklik membawa list kategori terpilih",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategorySelectionModal>;

/**
 * State default modal pemilihan kategori dengan target 3 pilihan.
 */
export const Default: Story = {
  args: {
    isOpen: true,
    maxSelection: 3,
  },
};

/**
 * State modal dengan opsi tombol kembali (Back Button) aktif.
 */
export const WithBackButton: Story = {
  args: {
    isOpen: true,
    maxSelection: 3,
    onBack: () => {},
  },
};

/**
 * Custom kategori dan jumlah pilihan target 2 kategori.
 */
export const CustomCategories: Story = {
  args: {
    isOpen: true,
    maxSelection: 2,
    categories: ["Teknologi", "Desain", "Bisnis", "Gaya Hidup", "Kesehatan"],
  },
};