import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

const ArrowLeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  arrow?: 'default' | 'left' | 'right';
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'Atoms/Button/Big Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      name: 'content',
      control: 'text',
      description: 'Button label text',
    },
    arrow: {
      control: 'select',
      options: ['default', 'left', 'right'],
      description: 'Select arrow position',
    },
    variant: {
      control: 'select',
      options: ['primary'],
      description: 'Button visual variant style',
    },
    colorState: {
      name: 'varticel',
      control: 'select',
      options: ['default', 'success', 'danger'],
      description: 'Button color status state',
    },
    size: { table: { disable: true } },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    className: { control: 'text' },
  } as any,
  args: {
    size: 'big',
    variant: 'primary',
    colorState: 'default',
    children: 'Click Me',
    arrow: 'default',
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

const renderStory = (args: any) => {
  const { arrow, children, ...buttonProps } = args;
  let iconLeft = undefined;
  let iconRight = undefined;

  if (arrow === 'left') iconLeft = ArrowLeftIcon;
  if (arrow === 'right') iconRight = ArrowRightIcon;
  
  return (
    <Button {...buttonProps} iconLeft={iconLeft} iconRight={iconRight}>
      {children}
    </Button>
  );
};

export const PrimaryDefault: Story = {
  name: 'Primary Default',
  args: { variant: 'primary', colorState: 'default', arrow: 'default' },
  render: renderStory,
};

export const PrimaryDisabled: Story = {
  name: 'Primary Disabled',
  args: { variant: 'primary', colorState: 'default', disabled: true },
  render: renderStory,
};

export const PrimaryLoading: Story = {
  name: 'Primary Loading',
  args: { variant: 'primary', colorState: 'default', isLoading: true },
  render: renderStory,
};

export const PrimarySuccess: Story = {
  name: 'Primary Success',
  args: { variant: 'primary', colorState: 'success' },
  render: renderStory,
};

export const PrimaryDanger: Story = {
  name: 'Primary Danger',
  args: { variant: 'primary', colorState: 'danger' },
  render: renderStory,
};