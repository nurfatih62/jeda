"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type ProfileFieldProps = {
  label: string;
  hint?: string;
  multiline?: boolean;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export function ProfileField({ label, hint, multiline = false, ...props }: ProfileFieldProps) {
  const className = "border-primary rounded-lg bg-white px-3 py-2";

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-text-primary">
      {label}
      {multiline ? (
        <textarea {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${className} ${props.className ?? ""}`} />
      ) : (
        <input {...(props as InputHTMLAttributes<HTMLInputElement>)} className={`h-10 ${className} ${props.className ?? ""}`} />
      )}
      {hint && <span className="text-xs text-text-muted">{hint}</span>}
    </label>
  );
}
