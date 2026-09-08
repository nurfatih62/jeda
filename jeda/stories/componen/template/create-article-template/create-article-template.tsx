"use client";

import React from "react";
import { MainLayout, MainLayoutProps } from "../../organism/guest/main-layout/main-layout";
import {
  CreateArticle,
  CreateArticleProps,
} from "../../organism/create-article/create-article";
import { Button } from "../../atom/button/button/button";

export interface CreateArticleTemplateProps {
  /** Varian autentikasi ("guest" | "reader" | "author") */
  variant?: "guest" | "reader" | "author";
  /** Props khusus untuk CreateArticle */
  createArticleProps?: CreateArticleProps;
  /** Props tambahan untuk MainLayout (layout: Sidebar + Header + area konten) */
  mainLayoutProps?: Omit<MainLayoutProps, "children">;
  /** Judul ajakan login saat varian "guest" */
  guestTitle?: string;
  /** Deskripsi ajakan login saat varian "guest" */
  guestDescription?: string;
  /** Teks tombol outline saat varian "guest" (default: "Daftar") */
  registerButtonText?: string;
  /** Teks tombol solid saat varian "guest" (default: "Masuk") */
  loginButtonText?: string;
  /** Handler tombol "Masuk" (dipakai header guest & banner guest) */
  onLoginClick?: () => void;
  /** Handler tombol "Daftar" pada banner guest */
  onRegisterClick?: () => void;
  /** Tambahan kelas CSS untuk layout luar */
  className?: string;
}

export const CreateArticleTemplate: React.FC<CreateArticleTemplateProps> = ({
  variant = "author",
  createArticleProps,
  mainLayoutProps,
  guestTitle = "Masuk untuk mulai menulis",
  guestDescription = "Buat akun atau masuk agar bisa menyimpan draft dan menerbitkan artikel",
  registerButtonText = "Daftar",
  loginButtonText = "Masuk",
  onLoginClick,
  onRegisterClick,
  className = "",
}) => {
  const isGuest = variant === "guest";

  return (
    <MainLayout
      {...mainLayoutProps}
      sidebarProps={{
        role: variant === "author" ? "author" : "reader",
        activeVariant: variant === "author" ? "dashboard" : "home",
        ...mainLayoutProps?.sidebarProps,
      }}
      headerProps={{
        variant,
        onLoginClick,
        ...mainLayoutProps?.headerProps,
      }}
      className={className}
    >
      {isGuest ? (
        /* Banner ajakan login — guest tidak boleh melihat editor */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 max-w-[1036px] mx-auto gap-6">
          <div className="flex flex-col items-center gap-5 w-full">
            <h2 className="font-['Poppins'] font-bold text-[36px] leading-[40px] sm:leading-[32px] text-[#1B4E46] m-0">
              {guestTitle}
            </h2>
            <p className="font-['Poppins'] font-medium text-[20px] sm:text-[24px] leading-[28px] text-[#1B4E46]/75 max-w-[900px] m-0">
              {guestDescription}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-3 mt-4">
            <Button variant="outline" onClick={onRegisterClick}>
              {registerButtonText}
            </Button>
            <Button variant="solid" onClick={onLoginClick}>
              {loginButtonText}
            </Button>
          </div>
        </div>
      ) : (
        <CreateArticle {...createArticleProps} />
      )}
    </MainLayout>
  );
};

CreateArticleTemplate.displayName = "CreateArticleTemplate";

export default CreateArticleTemplate;
