import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SortSelect } from './sort-select';

const meta: Meta<typeof SortSelect> = {
  title: 'Molecule/SortSelect',
  component: SortSelect,
  tags: ['autodocs'],
  args: { 
    options: ['Populer', 'Terbaru'],
    paramName: 'sort',
    defaultValue: 'Populer',
    label: 'Urutkan artikel'
  },
  parameters: { 
    layout: 'padded',
    // Konfigurasi router Next.js untuk Storybook agar tidak error "app router to be mounted"
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/explore',
        query: { sort: 'Populer' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SortSelect>;

export const Default: Story = {}; 