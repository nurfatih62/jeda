"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "../../organism/guest/main-layout/main-layout";
import {
  AuthorDashboard,
  AuthorDashboardProps,
} from "../../organism/author-dashboard/author-dashboard";

export interface AuthorDashboardTemplateProps {
  /** Props khusus untuk AuthorDashboard (stats, articles, onEditArticle) */
  authorDashboardProps?: AuthorDashboardProps;
  /** Props tambahan untuk MainLayout (layout: Sidebar + Header + area konten) */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
  /** Tambahan kelas CSS untuk layout luar */
  className?: string;
}

export const AuthorDashboardTemplate: React.FC<AuthorDashboardTemplateProps> = ({
  authorDashboardProps,
  mainLayoutProps,
  className = "",
}) => {
  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: "author",
        activeVariant: "dashboard",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant: "author",
        ...mainLayoutProps?.headerProps,
      }}
      className={className}
    >
      <AuthorDashboard {...authorDashboardProps} />
    </MainLayout>
  );
};

AuthorDashboardTemplate.displayName = "AuthorDashboardTemplate";

export default AuthorDashboardTemplate;
