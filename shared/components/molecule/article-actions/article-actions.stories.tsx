import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleActions } from "./article-actions";

const meta = {
  title: "Components/Molecule/Article Actions",
  component: ArticleActions,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    onShare: {
      action: "share clicked",
      description: "Aksi ketika tombol share ditekan",
    },

    onFlag: {
      action: "flag clicked",
      description: "Aksi ketika tombol flag ditekan",
    },
  },
} satisfies Meta<typeof ArticleActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    onShare: () => {},
    onFlag: () => {},
  },
};

export const AllArticleActions: Story = {
  args: {
    onShare: () => {},
    onFlag: () => {},
  },

  render: () => (
    <div className="flex flex-col gap-8">
      {/* DEFAULT */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DEFAULT
        </h2>

        <ArticleActions
          onShare={() => {}}
          onFlag={() => {}}
        />
      </div>

      {/* ARTICLE ACTIONS */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          ARTICLE ACTIONS
        </h2>

        <div className="flex w-100 justify-end">
          <ArticleActions
            onShare={() => {}}
            onFlag={() => {}}
          />
        </div>
      </div>
    </div>
  ),
};