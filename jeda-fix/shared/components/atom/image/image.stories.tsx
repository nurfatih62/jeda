import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Atom/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://i.pinimg.com/originals/ba/fa/94/bafa94912ae5eda45e564154bd223847.jpg?nii=t',
    alt: 'Cover artikel',
    radius: 8, // Menggunakan angka 8 yang merepresentasikan --radius-md (8px)
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