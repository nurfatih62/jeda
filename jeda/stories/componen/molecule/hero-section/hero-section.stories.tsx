import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./hero-section";

const meta: Meta<typeof HeroSection> = {
  title: "📦componen/molecule/hero-section",
  component: HeroSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    exploreLabel: { control: "text" },
    registerLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Varian Default Hero Section
export const Default: Story = {
  args: {
    title: "Ambil JEDA dan mulai membaca",
    subtitle:
      "Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan JEDA dan mulai bacaanmu",
    exploreLabel: "Jelajahi dulu",
    registerLabel: "Daftar",
  },
};