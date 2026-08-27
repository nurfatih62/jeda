import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Organism/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onMenuClick: { action: 'menu-click' },
    onLoginClick: { action: 'login-click' },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const StickyOnScroll: Story = {
  render: (args) => (
    <div className="h-350 bg-background">
      <Header {...args} />
      <div className="p-10">
        <p className="font-sans text-text-muted">
          Scroll ke bawah — header ini tetap menempel di atas (sticky).
        </p>
      </div>
    </div>
  ),
};
