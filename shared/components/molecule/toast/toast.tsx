"use client";

import React from 'react';
import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';

export type ToastVariant = 'error' | 'success';

export type ToastProps = {
  variant?: ToastVariant;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function Toast({
  variant = 'error',
  title,
  description,
  className = '',
}: ToastProps) {
  const isError = variant === 'error';
  const colorClass = isError
    ? 'bg-danger-surface border-danger-border text-danger-text'
    : 'bg-success-surface border-success-border text-success-text';

  return (
    <div
      className={`flex flex-col items-start p-4 gap-2 rounded-sm border shadow-[0px_4px_6px_rgba(0,0,0,0.09)] w-full min-w-88.25 max-w-141.5 transition-all duration-200 ${colorClass} ${className}`}
    >
      <div className="flex flex-row items-center gap-4 w-full">
        <div className="flex items-center justify-center shrink-0 w-4 h-4">
          {isError ? (
            <CircleAlert className="w-4 h-4 text-current" strokeWidth={2} />
          ) : (
            <CircleCheck className="w-4 h-4 text-current" strokeWidth={2} />
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <span className="font-poppins font-medium text-btn leading-[24px]">
            {title}
          </span>
          {description && (
            <span className="font-nunito font-normal text-[14px] leading-4.75">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}