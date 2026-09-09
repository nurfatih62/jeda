import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CategorySelector, CategoryOption } from "./category-selector";

const meta: Meta<typeof CategorySelector> = {
  title: "📦componen/molecule/category-selector",
  component: CategorySelector,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCategories: CategoryOption[] = [
  { id: "1", name: "Desain UI/UX" },
  { id: "2", name: "Teknologi" },
  { id: "3", name: "Pemrograman" },
];

export const Default: Story = {
  args: { categories: defaultCategories, selectedIds: ["2"] },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["1"]);
    return (
      <CategorySelector
        categories={defaultCategories}
        selectedIds={selected}
        onToggle={(id) =>
          setSelected((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
          )
        }
      />
    );
  },
};
