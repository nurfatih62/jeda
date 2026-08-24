import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Engagement } from "./engagement";

const meta = {
  title: "Components/Molecule/Engagement",
  component: Engagement,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    likes: {
      control: "number",
      description: "Jumlah suka",
    },

    comments: {
      control: "number",
      description: "Jumlah komentar",
    },
  },
} satisfies Meta<typeof Engagement>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
   CUSTOM
========================= */

export const Custom: Story = {
  args: {
    likes: 237,
    comments: 12,
  },
};

/* =========================
   ALL ENGAGEMENT
========================= */

export const AllEngagement: Story = {
  args: {
    likes: 237,
    comments: 12,
  },

  render: () => (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col gap-2">
        <p className="text-[18px] font-semibold">
          DEFAULT
        </p>

        <Engagement
          likes={237}
          comments={12}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[18px] font-semibold">
          HIGH ENGAGEMENT
        </p>

        <Engagement
          likes={1250}
          comments={86}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[18px] font-semibold">
          NO ENGAGEMENT
        </p>

        <Engagement
          likes={0}
          comments={0}
        />
      </div>

    </div>
  ),
};
