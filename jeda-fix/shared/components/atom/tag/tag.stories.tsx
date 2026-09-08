import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Atom/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    children: 'Click Me!',
    selected: false,
  },
  argTypes: {
    children: { control: 'text', description: 'Teks di dalam tag' },
    selected: { control: 'boolean', description: 'Status tag aktif/dipilih' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

// Menampilkan simulasi tampilan Figma di Storybook
export const AllStates: Story = {
  render: () => (
    <div 
      className="flex items-center gap-8 p-6 border border-dashed border-[#8A38F5] rounded-[5px] bg-background"
      style={{ width: 'max-content' }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-gray-500">Clicked/stay</span>
        <Tag selected>Click Me!</Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-gray-500">Hover (Coba arahkan kursor)</span>
        <Tag>Click Me!</Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-gray-500">Default</span>
        <Tag>Click Me!</Tag>
      </div>
    </div>
  ),
};