import { vi } from 'vitest';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SortSelect } from './sort-select';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

const meta: Meta<typeof SortSelect> = {
  title: 'Molecule/SortSelect',
  component: SortSelect,
  tags: ['autodocs'],
  args: { options: ['Populer', 'Terbaru'] },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof SortSelect>;

export const Default: Story = {};