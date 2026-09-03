import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TabsLink } from './tabs-link';

const meta: Meta<typeof TabsLink> = {
  title: 'Organism/TabsLink',
  component: TabsLink,
  tags: ['autodocs'],
  args: { basePath: '#' },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TabsLink>;

export const Populer: Story = { args: { activeTab: 'populer' } };
export const Terbaru: Story = { args: { activeTab: 'terbaru' } };
export const LoggedIn: Story = {
  args: {
    variant: 'logged-in',
    activeTab: 'untukmu',
  },
};
 