import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagGroup } from "./tag-group";

const meta: Meta<typeof TagGroup> = {
  title: "📦componen/molecule/tag-group",
  component: TagGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagGroup>;

/** 
 * **Default Story (Frame 83)** 
 * - Menampilkan barisan tombol tag dengan "Semua" dalam keadaan aktif (`defaultActive: true`) 
 *   dan sisanya dalam keadaan default (`+`).
 */
export const Default: Story = {
  args: {
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