"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "@/shared/organisms/main-layout/main-layout";
import { HomepageSection, HomepageSectionProps } from "@/domains/article/presentation/organisms/homepage-section/homepage-section";
import { HeaderGuestProps } from "@/shared/organisms/header-guest/header-guest";
import { SidebarProps } from "@/shared/organisms/sidebar/sidebar";

export interface HomepageTemplateProps {
  /** Status autentikasi / peran ("guest" | "logged-in" | "author") */
  authStatus?: HomepageSectionProps["authStatus"];
  /** Menandakan apakah author memiliki draft yang sedang ditulis */
  hasDraft?: boolean;
  /** Menandakan apakah author sudah pernah mempublikasikan artikel */
  hasPublished?: boolean;
  /** Props yang diteruskan ke komponen Sidebar */
  sidebarProps?: Omit<SidebarProps, "collapsed" | "onToggleCollapse">;
  /** Props yang diteruskan ke komponen HeaderGuest */
  headerProps?: HeaderGuestProps;
  /** Props yang diteruskan ke komponen HomepageSection */
  homepageSectionProps?: HomepageSectionProps;
  /** Handler ketika tombol login di header diklik */
  onLoginClick?: () => void;
  /** Handler ketika tombol explore pada hero diklik */
  onExploreClick?: () => void;
  /** Handler ketika tombol register/bergabung pada hero diklik */
  onRegisterClick?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const HomepageTemplate: React.FC<HomepageTemplateProps> = ({
  authStatus = "guest",
  hasDraft = false,
  hasPublished = false,
  sidebarProps,
  headerProps,
  homepageSectionProps,
  onLoginClick,
  onExploreClick,
  onRegisterClick,
  className = "",
}) => {
  // Petakan authStatus ke variant HeaderGuest dan role Sidebar
  const headerVariant =
    authStatus === "logged-in"
      ? "reader"
      : authStatus === "author"
      ? "author"
      : "guest";

  const sidebarRole = authStatus === "author" ? "author" : "reader";

  return (
    <MainLayout
      sidebarProps={{
        role: sidebarRole,
        ...sidebarProps,
      }}
      headerProps={{
        variant: headerVariant,
        onLoginClick,
        ...headerProps,
      }}
      className={`bg-[#FBF8F2] w-full h-screen ${className}`}
    >
      <HomepageSection
        authStatus={authStatus}
        hasDraft={hasDraft}
        hasPublished={hasPublished}
        onExploreClick={onExploreClick}
        onRegisterClick={onRegisterClick}
        {...homepageSectionProps}
      />
    </MainLayout>
  );
};

HomepageTemplate.displayName = "HomepageTemplate";

export default HomepageTemplate;