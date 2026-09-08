"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "../../organism/guest/main-layout/main-layout";
import { EksplorTopikSection, EksplorTopikSectionProps } from "../../organism/eksplor/eksplor-topik-section/eksplor-topik-section";

export interface EksplorTopikTemplateProps {
  /** Status autentikasi / peran ("guest" | "logged-in" | "author") */
  authStatus?: "guest" | "logged-in" | "author";
  /** Props untuk mengatur MainLayout (Sidebar & Header) */
  mainLayoutProps?: MainLayoutProps;
  /** Props untuk mengatur konten EksplorTopikSection */
  eksplorTopikProps?: EksplorTopikSectionProps;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export default function EksplorTopikTemplate({
  authStatus = "guest",
  mainLayoutProps,
  eksplorTopikProps,
  className = "",
}: EksplorTopikTemplateProps) {
  const headerVariant =
    authStatus === "logged-in"
      ? "reader"
      : authStatus === "author"
      ? "author"
      : "guest";

  const sidebarRole = authStatus === "author" ? "author" : "reader";

  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: sidebarRole,
        activeVariant: "explore",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant: headerVariant,
        ...mainLayoutProps?.headerProps,
      }}
      className={className}
    >
      <div className="flex flex-col items-center w-full py-6">
        <div className="w-full max-w-288.75">
          <EksplorTopikSection {...eksplorTopikProps} />
        </div>
      </div>
    </MainLayout>
  );
}