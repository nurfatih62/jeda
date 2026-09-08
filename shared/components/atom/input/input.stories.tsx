import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Atom/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Cari' },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder input' },
    value: { control: 'text', description: 'Nilai input (controlled)' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="flex h-10 w-80 items-center rounded-lg border border-primary bg-white px-4">
      <Input {...args} />
    </div>
  ),
};
