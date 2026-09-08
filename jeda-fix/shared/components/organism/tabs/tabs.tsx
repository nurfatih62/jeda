"use client";

import { useState } from 'react';

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  items?: TabItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: 'default' | 'logged-in';
}

const defaultItems: TabItem[] = [
  { key: 'populer', label: 'Populer' },
  { key: 'terbaru', label: 'Terbaru' },
];

const loggedInItems: TabItem[] = [
  { key: 'untukmu', label: 'Untukmu' },
  { key: 'populer', label: 'Populer' },
  { key: 'terbaru', label: 'Terbaru' },
];

export function Tabs({ items, defaultActiveKey, onChange, variant = 'default' }: TabsProps) {
  const tabItems = items ?? (variant === 'logged-in' ? loggedInItems : defaultItems);
  const [active, setActive] = useState(defaultActiveKey ?? tabItems[0]?.key);

  const handleClick = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  const activeIndex = tabItems.findIndex((item) => item.key === active);

  return (
    <div className="pt-tabs-top">
      <div className="flex items-center gap-2.5">
        {tabItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleClick(item.key)}
            className={`font-sans rounded-md px-4 py-2 text-base font-medium leading-6 transition-opacity ${
              active === item.key ? 'text-text-primary opacity-100' : 'text-primary opacity-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative mb-6 h-px bg-primary-border">
        <div
          className="absolute -top-px h-indicator-h w-indicator-w bg-primary transition-all"
          style={{ left: activeIndex * 106 }}
        />
      </div>
    </div>
  );
}