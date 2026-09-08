import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Molecule/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 20,
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 20 } },
    totalPages: { control: { type: 'number', min: 1, max: 50 } },
    onPageChange: { action: 'pageChanged' },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(newPage) => {
          setPage(newPage);
          args.onPageChange?.(newPage);
        }}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 20,
  },
};