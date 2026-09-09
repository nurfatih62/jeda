import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EksplorTopik } from "./eksplor-topik";

const meta: Meta<typeof EksplorTopik> = {
  title: "📦componen/organism/eksplor/eksplor-topik",
  component: EksplorTopik,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof EksplorTopik>;

/**
 * **Default Story (Frame 95)**
 * - Menggabungkan judul "Eksplor topik", kumpulan tag interaktif (`TagGroup`), 
 *   serta dropdown filter ("Populer / Terbaru") sesuai spesifikasi struktur layout Figma.
 */
export const Default: Story = {
  args: {
    title: "Eksplor topik",
    tags: [
      { label: "Semua", defaultActive: true },
      { label: "Teknologi", defaultActive: false },
      { label: "Wisata", defaultActive: false },
      { label: "Makanan", defaultActive: false },
      { label: "Perkerjaan", defaultActive: false },
      { label: "Pengembangan diri", defaultActive: false },
      { label: "Kehidupan", defaultActive: false },
    ],
  },
};