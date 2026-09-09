import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CoverImageUploader } from "./cover-image-uploader";

const meta: Meta<typeof CoverImageUploader> = {
  title: "📦componen/molecule/cover-image-uploader",
  component: CoverImageUploader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { previewUrl: null },
};

export const WithPreview: Story = {
  args: { previewUrl: "https://picsum.photos/seed/jeda-cover/1068/525" },
};
