import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton, IconButtonVariant, IconButtonColorState } from './icon-button';
import { Menu, ThumbsUp, Share2, Flag, Search } from 'lucide-react';

const iconOptions = ['Menu', 'Like', 'Share', 'Flag', 'Search'] as const;
const iconMapping: Record<(typeof iconOptions)[number], ReactElement> = {
  Menu: <Menu size={24} strokeWidth={2} />,
  Like: <ThumbsUp size={24} strokeWidth={2} />,
  Share: <Share2 size={24} strokeWidth={2} />,
  Flag: <Flag size={24} strokeWidth={2} />,
  Search: <Search size={24} strokeWidth={2} />,
};

const meta: Meta<typeof IconButton> = {
  title: 'Atom/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    colorState: 'default',
    icon: iconMapping.Menu,
  },
  argTypes: {
    'aria-label': { control: 'text', description: 'Nama aksesibel tombol' },
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost'],
      description: 'Gaya tampilan tombol',
    },
    colorState: {
      control: 'select',
      options: ['default', 'danger'],
      description: 'Warna tombol',
    },
    icon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Icon tombol',
    },
    disabled: { control: 'boolean', description: 'Menonaktifkan tombol' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = { args: { 'aria-label': 'Menu' } };
export const Outline: Story = { args: { 'aria-label': 'Menu', variant: 'outline' } };
export const Ghost: Story = { args: { 'aria-label': 'Menu', variant: 'ghost' } };
export const Danger: Story = { args: { 'aria-label': 'Hapus', colorState: 'danger' } };
export const Disabled: Story = { args: { 'aria-label': 'Menu', disabled: true } };

const variants: IconButtonVariant[] = ['primary', 'outline', 'ghost'];

function IconColorSection({
  label,
  colorState,
  disabled = false,
}: {
  label: string;
  colorState: IconButtonColorState;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <IconButton
            key={variant}
            variant={variant}
            colorState={colorState}
            disabled={disabled}
            aria-label="Menu"
            icon={<Menu size={24} strokeWidth={2} />}
          />
        ))}
      </div>
    </div>
  );
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-background p-6">
      <IconColorSection label="Default" colorState="default" />
      <IconColorSection label="Danger" colorState="danger" />
      <IconColorSection label="Disabled" colorState="default" disabled />
    </div>
  ),
};
