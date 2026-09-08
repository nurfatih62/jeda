import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopicTag } from './topic-tag';

const meta: Meta<typeof TopicTag> = {
  title: 'Molecule/TopicTag',
  component: TopicTag,
  tags: ['autodocs'],
  args: { label: 'Kesehatan Mental', href: '#' },
};
export default meta;

type Story = StoryObj<typeof TopicTag>;

export const Inactive: Story = {};
export const Active: Story = { args: { active: true } };
