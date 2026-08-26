"use client";

import React, { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export const Tabs = ({
  items,
  activeTab,
  defaultTab,
  onChange,
}: TabsProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab ?? defaultTab ?? items[0]?.id
  );

  const currentTab = activeTab ?? internalActiveTab;

  const handleChange = (id: string) => {
    setInternalActiveTab(id);
    onChange?.(id);
  };

  const activeIndex = items.findIndex(
    (item) => item.id === currentTab
  );

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Artikel"
        className="flex items-center gap-2"
      >
        {items.map((item) => {
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleChange(item.id)}
              className={`
                rounded-md
                border-none
                px-4
                py-2
                text-base
                font-medium
                leading-6
                transition-colors
                ${
                  isActive
                    ? "text-(--text-primary)"
                    : "text-(--text-secondary)"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="relative h-px w-full bg-(--primary-hover)"
      >
        <div
          className="absolute top-0 h-0.75 bg-(--primary) transition-all"
          style={{
            width: `${100 / items.length}%`,
            left: `${(100 / items.length) * activeIndex}%`,
          }}
        />
      </div>
    </div>
  );
};