import React from "react";

export interface ColorTokenProps {
  name: string;
  variable: string;
  value: string;
}

export function ColorToken({
  name,
  variable,
  value,
}: ColorTokenProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-(--border) bg-(--white)">
      {/* COLOR PREVIEW */}
      <div
        className="h-24 w-full"
        style={{
          backgroundColor: `var(${variable})`,
        }}
      />

      {/* INFORMATION */}
      <div className="flex flex-col gap-1 p-3">
        <p className="text-[14px] font-semibold text-(--text-primary)">
          {name}
        </p>

        <p className="text-[12px] text-(--text-secondary)">
          {value}
        </p>

        <p className="text-[11px] text-(--text-secondary)">
          {variable}
        </p>
      </div>
    </div>
  );
}