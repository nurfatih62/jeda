"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '../../atom/avatar/avatar';
import { Input } from '../../atom/input/input';

export interface CommentInputBoxProps {
  placeholder?: string;
  onSubmit?: (content: string) => void | Promise<void>;
  className?: string;
  isLoggedIn?: boolean; // Status login
}

export function CommentInputBox({
  placeholder = 'Note',
  onSubmit,
  className = '',
  isLoggedIn = false,
}: CommentInputBoxProps) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit() {
    const content = value.trim();
    if (!content || !onSubmit || isSubmitting) return;

    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setValue('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mengirim komentar. Coba lagi');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Jika belum login, tampilkan pesan peringatan / tombol login
  if (!isLoggedIn) {
    return (
      <div className={`flex items-center justify-between w-full p-4 rounded-lg border border-swatch-border bg-background text-sm text-text-muted ${className}`}>
        <span>Silakan <Link href="/login" className="text-primary underline font-medium">masuk</Link> untuk menulis komentar.</span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-4 w-full ${className}`}>
      <Avatar size="md" />
      <div className="flex-1 flex items-center min-h-12 px-4 py-2.5 rounded-lg border border-swatch-border bg-background focus-within:border-primary transition-colors">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
        />
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}