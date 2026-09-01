import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atom/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: 'https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg',
    alt: 'Nuf',
    size: 'md',
  },
  argTypes: {
    src: { control: 'text', description: 'URL gambar avatar' },
    alt: { control: 'text', description: 'Nama/alt text avatar' },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Ukuran avatar',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Medium: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
 