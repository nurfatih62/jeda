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
  const borderColor = isGreyBorder ? '#C2C7D0' : '#1B4E46';

  const messageColor = 
    status === 'success' || status === 'sent' ? '#408836' : '#D02A11';

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-row items-center gap-[22px]">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '72px',
              height: '81px',
              backgroundColor: '#FFFFFF',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
            }}
            className="relative flex items-center justify-center shadow-sm"
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
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                lineHeight: '58px',
                color: '#146C5D',
              }}
              className="w-full h-full text-center bg-transparent focus:outline-none font-normal"
            />
          </div>
        ))}
      </div>
      {message && (
        <span
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            lineHeight: '20px',
            color: messageColor,
          }}
          className="font-medium text-center"
        >
          {message}
        </span>
      )}
    </div>
  );
}
