import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button, ButtonVariant, ButtonColorState, ButtonArrow } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atom/Button',
  component: Button,
  tags: ['autodocs'],

  args: {
    children: 'Click Me!',
    variant: 'primary',
    colorState: 'default',
    arrow: 'none',
    loading: false,
    disabled: false,
  },

  argTypes: {
    children: {
      control: 'text',
      description: 'Teks di dalam tombol',
    },

    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost'],
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

    loading: {
      control: 'boolean',
      description: 'Menampilkan loading pada tombol',
    },

    disabled: {
      control: 'boolean',
      description: 'Menonaktifkan tombol',
    },

    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* =========================================================
   BASIC STORIES
   ========================================================= */

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Success: Story = {
  args: {
    colorState: 'success',
  },
};

export const Danger: Story = {
  args: {
    colorState: 'danger',
  },
};

export const WithLeftArrow: Story = {
  args: {
    arrow: 'left',
  },
};

export const WithRightArrow: Story = {
  args: {
    arrow: 'right',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/* =========================================================
   ALL VARIANTS
   ========================================================= */

const variants: ButtonVariant[] = [
  'primary',
  'outline',
  'ghost',
];

const arrows: {
  key: ButtonArrow;
  label: string;
}[] = [
  {
    key: 'left',
    label: 'ARROW (left)',
  },
  {
    key: 'right',
    label: 'ARROW (right)',
  },
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
      {/* SECTION LABEL */}
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-text-primary">
        {label}
      </p>

      {/* BUTTON VARIANTS */}
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            colorState={colorState}
            disabled={disabled}
            loading={loading}
          >
            Click Me!
          </Button>
        ))}
      </div>

      {/* ARROW VARIANTS */}
      {!loading &&
        arrows.map(({ key, label: arrowLabel }) => (
          <div
            key={key}
            className="flex flex-col gap-2"
          >
            {/* DIUBAH:
                text-text-muted/70
                ↓
                text-text-primary
            */}
            <p className="font-sans text-2.5 uppercase tracking-wide text-text-primary">
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
                  Click Me!
                </Button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

/* =========================================================
   ALL VARIANTS STORY
   ========================================================= */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-background p-6">
      <ColorSection
        label="Default"
        colorState="default"
      />

      <ColorSection
        label="Success"
        colorState="success"
      />

      <ColorSection
        label="Danger"
        colorState="danger"
      />

      <ColorSection
        label="Disabled"
        colorState="default"
        disabled
      />

      <ColorSection
        label="Loading"
        colorState="default"
        loading
      />
    </div>
  ),
};