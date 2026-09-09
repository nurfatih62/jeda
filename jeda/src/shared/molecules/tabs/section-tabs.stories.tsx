import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionTabs } from "./section-tabs";

const meta: Meta<typeof SectionTabs> = {
  title: "📦componen/molecule/tabs/section-tabs",
  component: SectionTabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "homepage-belumlogin",
        "homepage-sudahlogin",
        "library",
        "profile-author",
        "profile-reader",
      ],
    },
    onChange: { action: "tab-changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Homepage Belum Login (Populer, Terbaru)
export const HomepageBelumLogin: Story = {
  args: {
    variant: "homepage-belumlogin",
  },
};

// 2. Homepage Sudah Login (Untukmu, Populer, Terbaru)
export const HomepageSudahLogin: Story = {
  args: {
    variant: "homepage-sudahlogin",
  },
};

// 3. Library (Disimpan, Riwayat)
export const Library: Story = {
  args: {
    variant: "library",
  },
};

// 4. Profile Author (Artikel dibuat, Artikel disuka, Komentar)
export const ProfileAuthor: Story = {
  args: {
    variant: "profile-author",
  },
};

// 5. Profile Reader (Artikel disuka, Komentar)
export const ProfileReader: Story = {
  args: {
    variant: "profile-reader",
  },
};