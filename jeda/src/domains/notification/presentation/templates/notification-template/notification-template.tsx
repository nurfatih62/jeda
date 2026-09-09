"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "@/shared/organisms/main-layout/main-layout";
import {
  NotificationSection,
  NotificationSectionProps,
} from "@/domains/notification/presentation/organisms/notification-section/notification-section";

export interface NotificationTemplateProps {
  /** Varian autentikasi ("guest" | "reader" | "author") */
  variant?: "guest" | "reader" | "author";
  /** Props khusus untuk NotificationSection */
  notificationSectionProps?: NotificationSectionProps;
  /** Props tambahan untuk MainLayout */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
}

export const NotificationTemplate: React.FC<NotificationTemplateProps> = ({
  variant = "guest",
  notificationSectionProps,
  mainLayoutProps,
}) => {
  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: variant === "author" ? "author" : "reader",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant,
        ...mainLayoutProps?.headerProps,
      }}
    >
      <NotificationSection {...notificationSectionProps} />
    </MainLayout>
  );
};

NotificationTemplate.displayName = "NotificationTemplate";

export default NotificationTemplate;
