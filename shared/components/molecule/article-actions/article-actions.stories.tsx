import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleActions } from './article-actions';

const meta: Meta<typeof ArticleActions> = {
  title: 'Molecule/ArticleActions',
  component: ArticleActions,
  tags: ['autodocs'],
  args: { likes: 237, comments: 12 },
  argTypes: {
    likes: { control: 'number', description: 'Jumlah like' },
    comments: { control: 'number', description: 'Jumlah komentar' },
    onShare: { action: 'share' },
    onReport: { action: 'report' },
  },
};
export default meta;

type Story = StoryObj<typeof ArticleActions>;

export const Default: Story = {
  render: (args) => (
    <div className="w-100">
      <ArticleActions {...args} />
    </div>
  ),
};
