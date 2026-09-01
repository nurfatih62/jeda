import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchBar } from './search-bar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecule/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: { placeholder: 'Cari' },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder input pencarian' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: (args) => (
    <div className="w-search-wrapper">
      <SearchBar {...args} />
    </div>
  ),
};