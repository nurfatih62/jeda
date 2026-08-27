import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { colorTokens, ColorSwatch } from './color-token';

const meta: Meta = {
  title: 'Design Tokens/Colors',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 bg-background p-6">
      {Object.entries(colorTokens).map(([name, value]) => (
        <ColorSwatch key={name} name={name} value={value} />
      ))}
    </div>
  ),
};
