"use client";

import React from "react";
import { Heart, CheckCheck, UserPlus } from "lucide-react";

export type NotificationItemType = "like" | "follow" | "comment";

export interface NotificationItemData {
  id: string;
  type: NotificationItemType;
  message: string;
  timestamp: string;
  isUnread?: boolean;
}

export interface NotificationItemProps {
  /** Data notifikasi */
  item: NotificationItemData;
  /** Handler saat item diklik */
  onClick?: (item: NotificationItemData) => void;
  className?: string;
}

const renderIcon = (type: NotificationItemType) => {
  switch (type) {
    case "like":
      return (
        <div className="w-11.5 h-11.5 rounded-full bg-[#FBCECE] flex items-center justify-center shrink-0">
          <Heart className="w-5 h-5 text-[#D02A11] fill-[#D02A11]" />
        </div>
      );
    case "follow":
      return (
        <div className="w-11.5 h-11.5 rounded-full bg-[#B4EEC1] flex items-center justify-center shrink-0">
          <CheckCheck className="w-5 h-5 text-[#408836]" />
        </div>
      );
    case "comment":
      return (
        <div className="w-11 h-11.5 rounded-full bg-[#BCE0FF] flex items-center justify-center shrink-0">
          <UserPlus className="w-5 h-5 text-[#0088FF]" />
        </div>
      );
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={() => onClick?.(item)}
      className={`w-full h-auto min-h-20.25 px-6 md:px-10 py-3 rounded-lg flex items-center justify-between transition-all cursor-pointer hover:opacity-90 ${
        item.isUnread ? "bg-[#F2F4ED]" : "bg-[#FBF8F2]"
      } ${className}`}
    >
      <div className="flex items-center gap-5.5 flex-1">
        {renderIcon(item.type)}
        <div className="flex flex-col justify-center">
          <p
            className={`text-base text-btn-hover leading-relaxed ${
              item.isUnread ? "font-bold" : "font-normal"
            }`}
          >
            {item.message}
          </p>
          <span className="text-xs font-medium text-btn-hover/60">
            {item.timestamp}
          </span>
        </div>
      </div>

      {item.isUnread && (
        <div className="w-4 h-4 rounded-full bg-[#146C5D] shrink-0 ml-4" />
      )}
    </div>
  );
};

NotificationItem.displayName = "NotificationItem";

export default NotificationItem;
