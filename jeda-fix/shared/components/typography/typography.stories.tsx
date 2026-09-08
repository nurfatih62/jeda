import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, TypographyVariant } from './typography';

const meta: Meta = {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

const variants: TypographyVariant[] = [
  'logo',
  'heading',
  'subheading',
  'articleTitle',
  'body',
  'button',
  'metaName',
  'metaDate',
  'caption',
];

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md bg-background p-6">
      {variants.map((v) => (
        <div key={v}>
          <p className="mb-1 text-xs uppercase tracking-wide text-placeholder">{v}</p>
          <Typography variant={v}>Ambil JEDA dan mulai membaca</Typography>
        </div>
      ))}
    </div>
  ),
};