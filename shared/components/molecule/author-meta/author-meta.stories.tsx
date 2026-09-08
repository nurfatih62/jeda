import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AuthorMeta } from './author-meta';

const meta: Meta<typeof AuthorMeta> = {
  title: 'Molecule/AuthorMeta',
  component: AuthorMeta,
  tags: ['autodocs'],
  args: { author: 'Nuf', date: '15 Agustus 2026' },
  argTypes: {
    author: { control: 'text', description: 'Nama penulis' },
    date: { control: 'text', description: 'Tanggal publikasi' },
  },
};
export default meta;

type Story = StoryObj<typeof AuthorMeta>;

export const Default: Story = {};
