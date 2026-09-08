"use client";

import React, { useRef, useState } from 'react';
import type { ReactNode, ChangeEvent, KeyboardEvent } from 'react';

export type OtpStatus = 'normal' | 'error' | 'expired' | 'locked' | 'success' | 'sent';

export type OtpInputProps = {
  length?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
  status?: OtpStatus;
  message?: ReactNode;
  className?: string;
};

export function OtpInput({
  length = 4,
  value = ['', '', '', ''],
  onChange,
  status = 'normal',
  message,
  className = '',
}: OtpInputProps) {
  const [otpValues, setOtpValues] = useState<string[]>(value);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    const digit = val.replace(/[^0-9]/g, '').slice(-1);
    
    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);
    onChange?.(newValues);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isGreyBorder = status === 'sent';
  const borderClass = isGreyBorder ? 'border-border-default' : 'border-text-primary';
  const messageClass =
    status === 'success' || status === 'sent' ? 'text-success' : 'text-danger';

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-row items-center gap-otp-gap">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={`relative flex h-otp-height w-otp-width items-center justify-center rounded-sm border bg-white shadow-sm ${borderClass}`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={otpValues[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-full w-full bg-transparent text-center font-sans text-otp font-normal leading-otp text-primary focus:outline-none"
            />
          </div>
        ))}
      </div>
      {message && (
        <span
          className={`text-center font-nunito text-sm font-medium leading-5 ${messageClass}`}
        >
          {message}
        </span>
      )}
    </div>
  );
}
