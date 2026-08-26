import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export function Input({
  label,
  error = false,
  errorMessage,
  disabled,
  className = "",
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-(--black)"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        disabled={disabled}
        aria-invalid={error}
        className={`
          h-10
          w-full
          rounded-md
          border
          bg-(--white)
          px-3
          text-[16px]
          font-normal
          text-(--black)
          outline-none
          transition-colors

          border-(--border)

          placeholder:text-(--text-secondary)

          hover:border-(--primary-hover)

          focus:border-(--primary)
          focus:ring-2
          focus:ring-(--primary-hover-bg)

          disabled:cursor-not-allowed
          disabled:border-(--border)
          disabled:bg-(--background-disabled)
          disabled:text-(--text-disabled)

          ${
            error
              ? "border-(--danger) focus:border-(--danger) focus:ring-(--danger-hover-bg)"
              : ""
          }

          ${className}
        `}
      />

      {error && errorMessage && (
        <span className="text-sm text-(--danger)">
          {errorMessage}
        </span>
      )}
    </div>
  );
}