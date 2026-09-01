import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleCardSkeleton } from './article-card-skeleton';

const meta: Meta<typeof ArticleCardSkeleton> = {
  title: 'Organism/ArticleCardSkeleton',
  component: ArticleCardSkeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ArticleCardSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="w-story-w max-w-full">
      <ArticleCardSkeleton />
    </div>
  ),
};

export const ListOfThree: Story = {
  render: () => (
    <div className="flex w-story-w max-w-full flex-col gap-skeleton-list-gap">
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  ),
};