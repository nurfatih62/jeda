import React from 'react';
import { FcGoogle } from 'react-icons/fc';

type Variant = 'default' | 'secondary';

interface GoogleLoginButtonProps {
  variant?: Variant;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  default: 'border-[#CCCCCC]',
  secondary: 'border-[#1B4E46]',
};

export function GoogleLoginButton({ variant = 'default', onClick }: GoogleLoginButtonProps) {
  return (
    <button
      type="button"
      className={`flex flex-row items-center justify-center gap-4 w-full h-[56px] bg-white border ${variantStyles[variant]} rounded-sm cursor-pointer hover:bg-[#F5F5F5] transition-colors px-6`}
      onClick={onClick}
    >
      <FcGoogle className="w-6 h-6" />
      <span className="font-poppins text-desc font-medium leading-[28px] text-text-primary whitespace-nowrap">
        Masuk dengan Google
      </span>
    </button>
  );
}
