import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopicTags } from './topic-tags';

const TOPICS = ['Teknologi', 'Wisata', 'Makanan', 'Perkerjaan', 'Pengembangan diri', 'Kehidupan'];

const meta: Meta<typeof TopicTags> = {
  title: 'Organism/TopicTags',
  component: TopicTags,
  tags: ['autodocs'],
  args: { topics: TOPICS, activeTopic: 'Semua', basePath: '#' },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TopicTags>;

export const Default: Story = {};
export const WithActiveTopic: Story = { args: { activeTopic: 'Wisata' } };
