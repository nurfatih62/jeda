import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Organism/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    active: {
      control: 'select',
      options: ['home', 'search', 'library', 'profile'],
    },
    expanded: { control: 'boolean' },
    onToggle: { action: 'toggle' },
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Collapsed: Story = { args: { active: 'home', expanded: false } };
export const Expanded: Story = { args: { active: 'home', expanded: true } };
export const SearchActiveExpanded: Story = { args: { active: 'search', expanded: true } };
