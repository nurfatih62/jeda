"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "../../organism/guest/main-layout/main-layout";
import { ProfilePage, ProfilePageProps, ProfilePageVariant } from "../../organism/profile/profile-page/profile-page";

export interface ProfileTemplateProps {
  /** Varian autentikasi halaman profil ("guest" | "author" | "reader") */
  variant?: "guest" | "author" | "reader";
  /** Props khusus untuk komponen ProfilePage */
  profilePageProps?: Omit<ProfilePageProps, "variant">;
  /** Props tambahan untuk MainLayout */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  variant = "guest",
  profilePageProps,
  mainLayoutProps,
}) => {
  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        activeVariant: "profile",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant: variant === "author" ? "author" : variant === "guest" ? "guest" : "reader",
        ...mainLayoutProps?.headerProps,
      }}
    >
      <ProfilePage
        variant={variant as ProfilePageVariant}
        {...profilePageProps}
      />
    </MainLayout>
  );
};

ProfileTemplate.displayName = "ProfileTemplate";