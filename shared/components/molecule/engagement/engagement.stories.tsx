import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Engagement } from './engagement';

const meta: Meta<typeof Engagement> = {
  title: 'Molecule/Engagement',
  component: Engagement,
  tags: ['autodocs'],
  args: { likes: 237, comments: 12 },
  argTypes: {
    likes: { control: 'number', description: 'Jumlah like' },
    comments: { control: 'number', description: 'Jumlah komentar' },
  },
};
export default meta;

type Story = StoryObj<typeof Engagement>;

export const Default: Story = {};
 