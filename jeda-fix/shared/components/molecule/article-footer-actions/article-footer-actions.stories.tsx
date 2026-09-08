import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleFooterActions } from './article-footer-actions';

const meta: Meta<typeof ArticleFooterActions> = {
  title: 'Molecule/ArticleFooterActions',
  component: ArticleFooterActions,
  tags: ['autodocs'],
  args: {
    likes: 237,
    comments: 12,
    liked: false,
    bookmarked: false,
  },
  argTypes: {
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

type Story = StoryObj<typeof ArticleFooterActions>;

export const Default: Story = {};

export const BookmarkedAndLiked: Story = {
  args: {
    likes: 238,
    comments: 12,
    liked: true,
    bookmarked: true,
  },
};