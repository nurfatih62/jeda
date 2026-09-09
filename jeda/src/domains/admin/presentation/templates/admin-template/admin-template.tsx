"use client";

import React from "react";
import { AdminLayout, AdminLayoutProps } from "@/domains/admin/presentation/organisms/admin-layout/admin-layout";
import { AdminDashboard, AdminDashboardProps } from "@/domains/admin/presentation/organisms/admin-dashboard/admin-dashboard";
import { AdminLaporan, AdminLaporanProps } from "@/domains/admin/presentation/organisms/admin-laporan/admin-laporan";
import { ManajemenPengguna, ManajemenPenggunaProps } from "@/domains/admin/presentation/organisms/manajemen-pengguna/manajemen-pengguna";
import { CategoryManagementSection, CategoryManagementSectionProps } from "@/domains/admin/presentation/organisms/CategoryManagementSection/CategoryManagementSection";
import { UserProfileSection, UserProfileSectionProps } from "@/domains/admin/presentation/organisms/UserProfileSection/UserProfileSection";

export type AdminTemplateVariant =
  | "dashboard"
  | "laporan"
  | "pengguna"
  | "kategori"
  | "profil";

const variantToMenu = {
  dashboard: "dashboard",
  laporan: "report",
  pengguna: "users",
  kategori: "tags",
  profil: "profile",
} as const;

export interface AdminTemplateProps {
  /** Varian halaman admin */
  variant?: AdminTemplateVariant;
  /** Props tambahan untuk AdminLayout (Sidebar + Header + area konten) */
  adminLayoutProps?: Omit<AdminLayoutProps, "children">;
  /** Props untuk section Dashboard */
  dashboardProps?: AdminDashboardProps;
  /** Props untuk section Laporan */
  laporanProps?: AdminLaporanProps;
  /** Props untuk section Manajemen Pengguna */
  penggunaProps?: ManajemenPenggunaProps;
  /** Props untuk section Manajemen Kategori */
  kategoriProps?: CategoryManagementSectionProps;
  /** Props untuk section Profil */
  profilProps?: UserProfileSectionProps;
  /** Tambahan kelas CSS untuk layout luar */
  className?: string;
}

export const AdminTemplate: React.FC<AdminTemplateProps> = ({
  variant = "dashboard",
  adminLayoutProps,
  dashboardProps,
  laporanProps,
  penggunaProps,
  kategoriProps,
  profilProps,
  className = "",
}) => {
  const renderContent = () => {
    switch (variant) {
      case "laporan":
        return <AdminLaporan {...laporanProps} />;
      case "pengguna":
        return <ManajemenPengguna {...penggunaProps} />;
      case "kategori":
        return <CategoryManagementSection {...kategoriProps} />;
      case "profil":
        return <UserProfileSection {...profilProps} />;
      case "dashboard":
      default:
        return <AdminDashboard {...dashboardProps} />;
    }
  };

  return (
    <AdminLayout
      {...adminLayoutProps}
      sidebarProps={{
        role: "admin",
        activeVariant: variantToMenu[variant],
        ...adminLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant: "admin",
        ...adminLayoutProps?.headerProps,
      }}
      className={className}
    >
      {renderContent()}
    </AdminLayout>
  );
};

AdminTemplate.displayName = "AdminTemplate";

export default AdminTemplate;
