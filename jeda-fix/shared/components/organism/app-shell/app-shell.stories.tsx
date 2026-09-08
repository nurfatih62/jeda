import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AppShell } from './app-shell';

const meta: Meta<typeof AppShell> = {
  title: 'Organism/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: (args) => (
    <AppShell {...args}>
      <div className="p-content">
        <p className="font-sans text-text-muted">
          Klik icon hamburger di header untuk buka/tutup sidebar.
        </p>
      </div>
    </AppShell>
  ),
};