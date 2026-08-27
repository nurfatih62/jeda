import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Atom/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
    alt: 'Cover artikel',
    radius: 8,
  },
  argTypes: {
    src: { control: 'text', description: 'URL gambar' },
    alt: { control: 'text', description: 'Alt text gambar' },
    radius: { control: 'number', description: 'Border radius (px)' },
  },
};
export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 299, height: 165 }}>
      <Image {...args} />
    </div>
  ),
};
