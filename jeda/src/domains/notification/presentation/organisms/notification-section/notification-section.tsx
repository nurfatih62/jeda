"use client";

import React, { useState } from "react";
import { ButtonTags } from "@/domains/article/presentation/atoms/button-tags/button-tags";
import { NotificationItem } from "@/domains/notification/presentation/molecules/notification-item/notification-item";

export type NotificationType = "like" | "follow" | "comment";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  timeGroup: "Hari ini" | "Kemarin" | "Minggu lalu";
  isUnread?: boolean;
}

export interface NotificationSectionProps {
  notifications?: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onItemClick?: (item: NotificationItem) => void;
  className?: string;
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    message: 'Sinta W. menyukai komentarmu di "Kenapa Kita Suka Cerita Sedih"',
    timestamp: "2 jam lalu",
    timeGroup: "Hari ini",
    isUnread: true,
  },
  {
    id: "2",
    type: "follow",
    message: "Andi S. mulai mengikuti tulisanmu",
    timestamp: "1 hari lalu",
    timeGroup: "Kemarin",
    isUnread: false,
  },
  {
    id: "3",
    type: "like",
    message: 'Budi T. menyukai artikelmu "Panduan Belajar UI Design"',
    timestamp: "1 hari lalu",
    timeGroup: "Kemarin",
    isUnread: false,
  },
  {
    id: "4",
    type: "comment",
    message: 'Rina M. mengomentari artikelmu "Eksplorasi Warna Tailwind"',
    timestamp: "5 hari lalu",
    timeGroup: "Minggu lalu",
    isUnread: false,
  },
];

export const NotificationSection: React.FC<NotificationSectionProps> = ({
  notifications = defaultNotifications,
  onMarkAllAsRead,
  onItemClick,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [items, setItems] = useState<NotificationItem[]>(notifications);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isUnread: false })));
    onMarkAllAsRead?.();
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === "unread") return item.isUnread;
    return true;
  });

  const timeGroups: Array<"Hari ini" | "Kemarin" | "Minggu lalu"> = [
    "Hari ini",
    "Kemarin",
    "Minggu lalu",
  ];

  return (
    <div
      className={`w-full max-w-311.5 mx-auto flex flex-col gap-9.75 font-['Poppins'] ${className}`}
    >
      {/* Header & Filter Section */}
      <div className="flex flex-col gap-5.5 w-full">
        {/* Header Title & Mark Read */}
        <div className="flex items-center justify-between w-full border-b border-gray-100 pb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-btn-hover">
            Notifikasi
          </h1>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-sm font-medium text-btn-hover/80 hover:text-btn-hover transition-colors cursor-pointer"
          >
            Tandai semua dibaca
          </button>
        </div>

        {/* Filter Button Tags */}
        <div className="flex items-center gap-4">
          <ButtonTags
            label="Semua"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />
          <ButtonTags
            label="Belum dibaca"
            active={activeTab === "unread"}
            onClick={() => setActiveTab("unread")}
          />
        </div>
      </div>

      {/* Notifications Group List & Empty State */}
      <div className="flex flex-col gap-8 w-full">
        {filteredItems.length > 0 ? (
          timeGroups.map((group) => {
            const groupNotifications = filteredItems.filter(
              (item) => item.timeGroup === group
            );

            if (groupNotifications.length === 0) return null;

            return (
              <div key={group} className="flex flex-col gap-2.5 w-full">
                {/* Group Header Label */}
                <div className="px-4 py-1">
                  <span className="text-base font-medium text-btn-hover/70">
                    {group}
                  </span>
                </div>

                {/* Items List → molecule NotificationItem */}
                <div className="flex flex-col gap-2.5 w-full">
                  {groupNotifications.map((item) => (
                    <NotificationItem
                      key={item.id}
                      item={item}
                      onClick={(data) => onItemClick?.(data as NotificationItem)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-btn-hover">
              {activeTab === "unread"
                ? "Semua sudah dibaca"
                : "Belum ada notifikasi"}
            </h2>
            <p className="text-base md:text-lg text-btn-hover/70 max-w-145">
              {activeTab === "unread"
                ? "Kamu sudah membaca semua notifikasi. Notifikasi baru akan muncul di sini."
                : "Tidak ada notifikasi untuk ditampilkan saat ini."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

NotificationSection.displayName = "NotificationSection";

export default NotificationSection;