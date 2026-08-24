import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroActions } from "./hero-actions";

const meta = {
  title: "Components/Molecule/Hero Actions",
  component: HeroActions,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    onExplore: {
      action: "explore clicked",
      description: "Aksi tombol Jelajahi dulu",
    },

    onRegister: {
      action: "register clicked",
      description: "Aksi tombol Daftar",
    },
  },
} satisfies Meta<typeof HeroActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    onExplore: () => {},
    onRegister: () => {},
  },
};

export const AllHeroActions: Story = {
  args: {
    onExplore: () => {},
    onRegister: () => {},
  },

  render: () => (
    <div className="flex flex-col gap-8">
      {/* DEFAULT */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DEFAULT
        </h2>

        <HeroActions
          onExplore={() => {}}
          onRegister={() => {}}
        />
      </div>
    </div>
  ),
};