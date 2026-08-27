"use client";

import { useEffect, useState } from "react";

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  items?: TabItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

const defaultItems: TabItem[] = [
  { key: "populer", label: "Populer" },
  { key: "terbaru", label: "Terbaru" },
];

const STORAGE_KEY = "active-article-tab";

export function Tabs({
  items = defaultItems,
  defaultActiveKey,
  onChange,
}: TabsProps) {
  const [active, setActive] = useState(
    defaultActiveKey ?? items[0]?.key
  );

  // Ambil tab terakhir setelah component dijalankan di browser
  useEffect(() => {
    const savedTab = localStorage.getItem(STORAGE_KEY);

    if (savedTab && items.some((item) => item.key === savedTab)) {
      setActive(savedTab);
      onChange?.(savedTab);
    }
  }, [items, onChange]);

  const handleClick = (key: string) => {
    setActive(key);

    // Simpan tab yang dipilih
    localStorage.setItem(STORAGE_KEY, key);

    onChange?.(key);
  };

  const activeIndex = items.findIndex(
    (item) => item.key === active
  );

  return (
    <div className="pt-7.75">
      <div className="flex items-center gap-2.5">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => handleClick(item.key)}
            className={`font-sans rounded-md px-4 py-2 text-base font-medium leading-6 transition-opacity ${
              active === item.key
                ? "text-text-primary opacity-100"
                : "text-primary opacity-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mb-6 h-px bg-primary-border">
        <div
          className="absolute -top-px h-0.75 w-30.5 bg-primary transition-all"
          style={{ left: activeIndex * 106 }}
        />
      </div>
    </div>
  );
}