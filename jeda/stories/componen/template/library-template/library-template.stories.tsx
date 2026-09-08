import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LibraryTemplate } from "./library-template";

const meta: Meta<typeof LibraryTemplate> = {
  title: "📦componen/template/library-template",
  component: LibraryTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["logged-out", "logged-in", "author"],
      description: "Pilihan varian tampilan library",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LibraryTemplate>;

/** Varian saat pengguna belum login (Guest) */
export const LoggedOut: Story = {
  args: {
    variant: "logged-out",
  },
};

/** Varian saat pengguna sudah login sebagai pembaca (Reader) */
export const LoggedIn: Story = {
  args: {
    variant: "logged-in",
  },
};

/** Varian saat pengguna login sebagai Penulis (Author) */
export const Author: Story = {
  args: {
    variant: "author",
  },
};