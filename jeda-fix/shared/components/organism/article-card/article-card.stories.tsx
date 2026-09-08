import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleCard } from './article-card';

const meta: Meta<typeof ArticleCard> = {
  title: 'Organism/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  args: {
    article: {
      id: '1',
      author: 'Nuf',
      date: '15 Agustus 2026',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      likes: 237,
      comments: 12,
      avatarUrl: 'https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg',
      imageUrl:
        'https://i.pinimg.com/originals/53/d7/7c/53d77c843960b023b36b9bac4cd3f80a.png',
    },
  },
  argTypes: {
    article: { control: 'object', description: 'Data artikel (author, title, desc, dll)' },
    onShare: { action: 'share' },
    onReport: { action: 'report' },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  render: (args) => (
    <div className="w-story-w max-w-full">
      <ArticleCard {...args} />
    </div>
  ),
};