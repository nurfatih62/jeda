import React from 'react';
import { FcGoogle } from 'react-icons/fc';

type Variant = 'default' | 'secondary';

interface GoogleLoginButtonProps {
  variant?: Variant;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  default: 'border-border-default',
  secondary: 'border-primary',
};

export function GoogleLoginButton({ variant = 'default', onClick }: GoogleLoginButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-[56px] w-full cursor-pointer items-center justify-center gap-4 rounded-sm border bg-white px-6 transition-colors hover:bg-slate-50 ${variantStyles[variant]}`}
      onClick={onClick}
    >
      <FcGoogle className="h-6 w-6" />
      <span className="whitespace-nowrap font-poppins text-desc font-medium leading-[28px] text-text-primary">
        Masuk dengan Google
      </span>
    </button>
  );
}
