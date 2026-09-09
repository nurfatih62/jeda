import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonTags } from "./button-tags";

const meta: Meta<typeof ButtonTags> = {
  title: "📦componen/atom/button/button-tags",
  component: ButtonTags,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
    defaultActive: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonTags>;

/** 
 * **Default Story** 
 * - Kondisi awal: Background transparan, border `#10564A`, ikon plus (`+`) normal.
 * - Saat di-hover: Tombol membesar dan ikon plus (`+`) berputar halus menjadi `X`.
 * - Saat diklik: Tombol berubah ke state aktif dengan background hijau (`#146C5D`), teks putih, dan ikon `X` warna putih.
 */
export const Default: Story = {
  args: {
    label: "Click Me!",
    defaultActive: false,
  },
};

/** 
 * **Active Story** 
 * - Menampilkan tombol langsung dalam keadaan aktif/diklik sejak awal (`defaultActive: true`).
 */
export const Active: Story = {
  args: {
    label: "Click Me!",
    defaultActive: true,
  },
};

/** 
 * **Disabled Story** 
 * - Menampilkan tombol dalam kondisi dinonaktifkan (`disabled: true`).
 */
export const Disabled: Story = {
  args: {
    label: "Click Me!",
    disabled: true,
  },
};