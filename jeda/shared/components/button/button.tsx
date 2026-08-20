import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  colorState?: 'default' | 'success' | 'danger';
  size?: 'big' | 'medium' | 'small' | 'large' | 'extra-large';
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      colorState = 'default',
      size = 'big',
      isLoading = false,
      disabled = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none cursor-pointer rounded-lg';

    // Size styles (khusus big disesuaikan)
    const sizeStyles = {
      'extra-large': 'text-type-xl px-6 py-3.5 gap-3',
      large: 'text-type-lg px-5 py-3 gap-2.5',
      big: 'text-type-base px-6 py-3.5 gap-2', // Ukuran utama big button
      medium: 'text-type-base px-4 py-2.5 gap-2',
      small: 'text-type-sm px-3.5 py-2 gap-1.5',
    }[size];

    // Variant & Color State styles
    const getVariantStyles = () => {
      // Primary Variant
      if (variant === 'primary') {
        if (colorState === 'success') {
          return 'bg-brand-green text-brand-white hover:opacity-90';
        }
        if (colorState === 'danger') {
          return 'bg-brand-red text-brand-white hover:opacity-90';
        }
        // Default Primary menggunakan brand-primary (#198876)
        return 'bg-brand-primary text-brand-white hover:opacity-90';
      }

      // Outline Variant
      if (variant === 'outline') {
        if (colorState === 'success') {
          return 'border-2 border-brand-green text-brand-green bg-transparent hover:bg-brand-green/10';
        }
        if (colorState === 'danger') {
          return 'border-2 border-brand-red text-brand-red bg-transparent hover:bg-brand-red/10';
        }
        return 'border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary/10';
      }

      // Ghost Variant
      if (variant === 'ghost') {
        if (colorState === 'success') {
          return 'text-brand-green bg-transparent hover:bg-brand-green/10';
        }
        if (colorState === 'danger') {
          return 'text-brand-red bg-transparent hover:bg-brand-red/10';
        }
        return 'text-brand-primary bg-transparent hover:bg-brand-primary/10';
      }

      return '';
    };

    // Disabled & Loading state styling (opacity 50%)
    const stateStyles = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles} ${getVariantStyles()} ${stateStyles} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : iconLeft ? (
          <span className="flex items-center">{iconLeft}</span>
        ) : null}

        <span>{children}</span>

        {!isLoading && iconRight && (
          <span className="flex items-center">{iconRight}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';