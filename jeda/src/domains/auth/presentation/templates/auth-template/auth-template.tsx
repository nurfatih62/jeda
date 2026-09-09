"use client";

import React from "react";
import { LoginModal, LoginModalProps } from "@/domains/auth/presentation/organisms/login-modal/login-modal";
import { RegisterModal, RegisterModalProps } from "@/domains/auth/presentation/organisms/register-modal/register-modal";
import { ForgotPasswordModal } from "@/domains/auth/presentation/organisms/forgot-password-modal/forgot-password-modal";
import {
  OtpVerificationModal,
  OtpVerificationModalProps,
} from "@/domains/auth/presentation/organisms/otp-verification-modal/otp-verification-modal";
import { CreateNewPasswordModal } from "@/domains/auth/presentation/organisms/create-new-password-modal/create-new-password-modal";
import { CategorySelectionModal } from "@/domains/auth/presentation/organisms/category-selection-modal/category-selection-modal";
import { TermsModal, TermsModalProps } from "@/domains/auth/presentation/organisms/terms-modal/terms-modal";
import { BecomeAuthorModal } from "@/domains/auth/presentation/organisms/become-author-modal/become-author-modal";

export type AuthTemplateVariant =
  | "login"
  | "login-error"
  | "register"
  | "forgot-password"
  | "forgot-password-success"
  | "forgot-password-error"
  | "otp-verification"
  | "otp-error"
  | "create-new-password"
  | "category-selection"
  | "terms"
  | "privacy"
  | "become-author";

type ForgotPasswordModalProps = React.ComponentProps<typeof ForgotPasswordModal>;
type CreateNewPasswordModalProps = React.ComponentProps<typeof CreateNewPasswordModal>;
type BecomeAuthorModalProps = React.ComponentProps<typeof BecomeAuthorModal>;

export interface AuthTemplateProps {
  /** Varian tampilan auth (9 base + state error/success) */
  variant?: AuthTemplateVariant;
  /** Warna background luar halaman (default: hijau JEDA #1B4E46) */
  backgroundColor?: string;
  /** Tambahan kelas CSS untuk wrapper luar */
  className?: string;
  /** Props tambahan untuk tiap modal (digabung dengan default per varian) */
  loginProps?: Partial<LoginModalProps>;
  registerProps?: Partial<RegisterModalProps>;
  forgotPasswordProps?: Partial<ForgotPasswordModalProps>;
  otpProps?: Partial<OtpVerificationModalProps>;
  createNewPasswordProps?: Partial<CreateNewPasswordModalProps>;
  categoryProps?: Partial<React.ComponentProps<typeof CategorySelectionModal>>;
  termsProps?: Partial<TermsModalProps>;
  becomeAuthorProps?: Partial<BecomeAuthorModalProps>;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
  variant = "login",
  backgroundColor = "#1B4E46",
  className = "",
  loginProps,
  registerProps,
  forgotPasswordProps,
  otpProps,
  createNewPasswordProps,
  categoryProps,
  termsProps,
  becomeAuthorProps,
}) => {
  const renderContent = () => {
    switch (variant) {
      case "login":
        return <LoginModal isOpen {...loginProps} />;
      case "login-error":
        return (
          <LoginModal
            isOpen
            errorMessageVariant="error-email-password"
            {...loginProps}
          />
        );
      case "register":
        return <RegisterModal isOpen {...registerProps} />;
      case "forgot-password":
        return <ForgotPasswordModal variant="default" {...forgotPasswordProps} />;
      case "forgot-password-success":
        return <ForgotPasswordModal variant="success" {...forgotPasswordProps} />;
      case "forgot-password-error":
        return <ForgotPasswordModal variant="error" {...forgotPasswordProps} />;
      case "otp-verification":
        return <OtpVerificationModal isOpen {...otpProps} />;
      case "otp-error":
        return <OtpVerificationModal isOpen isError {...otpProps} />;
      case "create-new-password":
        return <CreateNewPasswordModal {...createNewPasswordProps} />;
      case "category-selection":
        return <CategorySelectionModal isOpen {...categoryProps} />;
      case "terms":
        return <TermsModal isOpen defaultTab="terms" {...termsProps} />;
      case "privacy":
        return <TermsModal isOpen defaultTab="privacy" {...termsProps} />;
      case "become-author":
        return <BecomeAuthorModal {...becomeAuthorProps} />;
      default:
        return <LoginModal isOpen {...loginProps} />;
    }
  };

  return (
    // Wrapper luar: full-page hijau JEDA, konten modal ter-center di atasnya.
    // Catatan: modal yang memakai overlay `fixed ... bg-black/40` (login, register,
    // otp, category, terms) akan tampil di atas bg ini dengan overlay gelapnya sendiri,
    // sedangkan modal non-fixed (forgot, new-password, become-author) langsung
    // ter-center di atas hijau.
    <div
      className={`w-full min-h-screen flex items-center justify-center p-4 sm:p-8 box-border ${className}`}
      style={{ backgroundColor }}
    >
      <div className="w-full flex justify-center">{renderContent()}</div>
    </div>
  );
};

AuthTemplate.displayName = "AuthTemplate";

export default AuthTemplate;
