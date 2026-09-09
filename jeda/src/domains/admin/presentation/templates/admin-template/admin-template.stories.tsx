import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AdminTemplate } from "./admin-template";

const meta: Meta<typeof AdminTemplate> = {
  title: "📦componen/template/admin-template",
  component: AdminTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["dashboard", "laporan", "pengguna", "kategori", "profil"],
      description: "Varian halaman admin",
    },
    dashboardProps: { table: { disable: true } },
    laporanProps: { table: { disable: true } },
    penggunaProps: { table: { disable: true } },
    kategoriProps: { table: { disable: true } },
    profilProps: { table: { disable: true } },
    adminLayoutProps: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AdminTemplate>;

export const Dashboard: Story = {
  args: { variant: "dashboard" },
};

export const Laporan: Story = {
  args: { variant: "laporan" },
};

export const Pengguna: Story = {
  args: { variant: "pengguna" },
};

export const Kategori: Story = {
  args: { variant: "kategori" },
};

export const Profil: Story = {
  args: { variant: "profil" },
};
