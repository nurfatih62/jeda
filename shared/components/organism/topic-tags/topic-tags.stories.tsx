import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopicTags } from './topic-tags';

const TOPICS = [
  'Kesehatan Mental',
  'Produktivitas',
  'Relasi',
  'Gaya Hidup',
  'Karier',
  'Refleksi Diri',
];

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
export const WithActiveTopic: Story = { args: { activeTopic: 'Produktivitas' } };
