import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button, ButtonVariant, ButtonColorState, ButtonArrow } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atom/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Masuk',
    variant: 'primary',
    colorState: 'default',
    arrow: 'none',
    loading: false,
  },
  argTypes: {
    children: { control: 'text', description: 'Teks di dalam tombol' },
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost', 'brand'],
      description: 'Gaya tampilan tombol',
    },
    colorState: {
      control: 'select',
      options: ['default', 'success', 'danger'],
      description: 'State warna tombol',
    },
    arrow: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Panah pada tombol',
    },
    loading: { control: 'boolean', description: 'Menampilkan loading pada tombol' },
    disabled: { control: 'boolean', description: 'Menonaktifkan tombol' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Brand: Story = { args: { variant: 'brand' } };
export const Success: Story = { args: { colorState: 'success' } };
export const Danger: Story = { args: { colorState: 'danger' } };
export const WithLeftArrow: Story = { args: { arrow: 'left' } };
export const WithRightArrow: Story = { args: { arrow: 'right' } };
export const Loading: Story = { args: { loading: true, children: 'Memproses..' } };
export const Disabled: Story = { args: { disabled: true } };

// Menampilkan seluruh state dari desain Figma (Brand Variant) secara statis dan akurat
export const BrandFigmaStates: Story = {
  render: () => (
    <div 
      className="flex flex-col gap-4 p-6 border border-dashed border-[#8A38F5] rounded-[5px]" 
      style={{ maxWidth: '602px' }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500">Disable</span>
        <Button variant="brand" disabled>Masuk</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500">Default</span>
        <Button variant="brand">Masuk</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500">Hover</span>
        <Button variant="brand" className="bg-[#13574C]">Masuk</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500">Clicked</span>
        <Button variant="brand" className="bg-[#0B3F37]">Masuk</Button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500">Loading</span>
        <Button variant="brand" loading>Memproses..</Button>
      </div>
    </div>
  ),
};

const variants: ButtonVariant[] = ['primary', 'outline', 'ghost'];
const arrows: { key: ButtonArrow; label: string }[] = [
  { key: 'left', label: 'ARROW (left)' },
  { key: 'right', label: 'ARROW (right)' },
];

function ColorSection({
  label,
  colorState,
  disabled = false,
  loading = false,
}: {
  label: string;
  colorState: ButtonColorState;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            colorState={colorState}
            disabled={disabled}
            loading={loading}
          >
            {loading ? 'Memproses..' : 'Masuk'}
          </Button>
        ))}
      </div>
      {!loading &&
        arrows.map(({ key, label: arrowLabel }) => (
          <div key={key} className="flex flex-col gap-2">
            <p className="font-sans text-xs uppercase tracking-wide text-text-muted/70">
              {label} + {arrowLabel}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {variants.map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  colorState={colorState}
                  arrow={key}
                  disabled={disabled}
                >
                  Masuk
                </Button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-background p-6">
      <ColorSection label="Default" colorState="default" />
      <ColorSection label="Success" colorState="success" />
      <ColorSection label="Danger" colorState="danger" />
      <ColorSection label="Disabled" colorState="default" disabled />
      <ColorSection label="Loading" colorState="default" loading />
    </div>
  ),
};