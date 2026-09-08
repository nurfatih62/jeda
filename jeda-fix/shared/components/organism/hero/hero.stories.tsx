import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './hero';

const meta: Meta<typeof Hero> = {
  title: 'Organism/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onExplore: { action: 'explore' },
    onRegister: { action: 'register' },
  },
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-background py-py-story">
      <Hero {...args} />
    </div>
  ),
};