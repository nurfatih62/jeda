import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atom/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const TextLine: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Avatar: Story = {
  render: () => <Skeleton className="h-10 w-10 rounded-full" />,
};

export const Image: Story = {
  render: () => <Skeleton className="h-41.25 w-74.75 rounded-lg" />,
};
