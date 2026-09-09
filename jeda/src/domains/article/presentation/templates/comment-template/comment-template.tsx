"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "@/shared/organisms/main-layout/main-layout";
import {
  CommentSection,
  CommentSectionProps,
} from "@/domains/article/presentation/organisms/comment-section/comment-section";

export interface CommentTemplateProps {
  /** Varian autentikasi ("guest" | "reader" | "author") */
  variant?: "guest" | "reader" | "author";
  /** Props khusus untuk CommentSection */
  commentSectionProps?: CommentSectionProps;
  /** Props tambahan untuk MainLayout */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
}

export const CommentTemplate: React.FC<CommentTemplateProps> = ({
  variant = "guest",
  commentSectionProps,
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
      <CommentSection {...commentSectionProps} />
    </MainLayout>
  );
};

CommentTemplate.displayName = "CommentTemplate";

export default CommentTemplate;
