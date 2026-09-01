import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleCommentItem } from './article-comment-item';

const meta: Meta<typeof ArticleCommentItem> = {
  title: 'Molecule/ArticleCommentItem',
  component: ArticleCommentItem,
  tags: ['autodocs'],
  args: {
    author: 'Asya mc',
    date: '15 Agustus 2026',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    likes: 237,
    comments: 12,
    liked: false,
    bookmarked: false,
  },
  argTypes: {
    author: { control: 'text' },
    date: { control: 'text' },
    content: { control: 'text' },
    likes: { control: 'number' },
    comments: { control: 'number' },
    liked: { control: 'boolean' },
    bookmarked: { control: 'boolean' },
    onLikeClick: { action: 'liked' },
    onBookmarkClick: { action: 'bookmarked' },
    onShare: { action: 'shared' },
    onReport: { action: 'reported' },
  },
};

export default meta;

type Story = StoryObj<typeof ArticleCommentItem>;

export const Default: Story = {};