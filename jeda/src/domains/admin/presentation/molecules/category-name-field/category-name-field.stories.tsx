import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryNameField } from "./category-name-field";

const meta: Meta<typeof CategoryNameField> = {
  title: "📦componen/molecule/category-name-field",
  component: CategoryNameField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { value: "" } };
export const Filled: Story = { args: { value: "Teknologi" } };
