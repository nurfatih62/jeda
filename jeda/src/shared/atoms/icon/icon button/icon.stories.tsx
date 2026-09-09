import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "./icon";

const meta: Meta<typeof IconButton> = {
  title: "📦componen/atom/icon/icon-button",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "like",
        "save",
        "comment",
        "share",
        "report",
        "menu",
        "eye",
        "eyeOff",
        "search",
        "user",
        "bookOpen",
        "pencil",
        "arrowLeft",
        "home",
        "heart",
        "xCircle",
        "minus",
        "back",
        "bell",
        "shield",
        "more",
        "layoutGrid",
        "list",
        "quote",
        "check",
        "link",
        "barChart",
        "close",
        "image",
        "plus",
      ],
      description: "Pilihan varian ikon sesuai desain Figma",
    },
    active: {
      control: { type: "boolean" },
      description: "Status aktif (hanya berlaku untuk Like & Save)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Status tombol nonaktif",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Contoh beberapa story utama
export const Like: Story = { args: { variant: "like", ariaLabel: "Like" } };
export const Simpan: Story = { args: { variant: "save", ariaLabel: "Simpan" } };
export const Comment: Story = { args: { variant: "comment", ariaLabel: "Komentar" } };
export const Share: Story = { args: { variant: "share", ariaLabel: "Bagikan" } };
export const Report: Story = { args: { variant: "report", ariaLabel: "Laporkan" } };
export const MenuIcon: Story = { args: { variant: "menu", ariaLabel: "Menu" } };
export const SearchIcon: Story = { args: { variant: "search", ariaLabel: "Cari" } };
export const HomeIcon: Story = { args: { variant: "home", ariaLabel: "Beranda" } };
export const HeartIcon: Story = { args: { variant: "heart", ariaLabel: "Favorit" } };
export const PlusIcon: Story = { args: { variant: "plus", ariaLabel: "Tambah" } };