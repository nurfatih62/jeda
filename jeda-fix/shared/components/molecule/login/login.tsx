"use client";

import React, { useState, useEffect } from 'react';
import { TextInput } from '../text-input/text-input';
import { PasswordInput, PasswordStrength } from '../password-input/password-input';
import { Button } from '../../atom/button/button';
import { GoogleLoginButton } from '../google-login-button/google-login-button';
import { Tag } from '../../atom/tag/tag';
import { OtpInput } from '../otp-input/otp-input';
import { XCircle, CircleAlert, ArrowLeft } from 'lucide-react';

export interface LoginProps {
  variant?: 
    | 'login' 
    | 'register' 
    | 'verification' 
    | 'category-selection' 
    | 'forgot-password'
    | 'forgot-password-verification'
    | 'reset-password'
    | 'terms';
  onSubmit?: (emailOrCode: string, password?: string, confirmPassword?: string, categories?: string[]) => void;
  onRegister?: () => void;
  onLogin?: () => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: () => void;
  onResendCode?: () => void;
  onTermsClick?: () => void;
  onClose?: () => void;
  onBack?: () => void;
  emailTarget?: string;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
  successMessage?: string;
  isLoading?: boolean;
  className?: string;
}

const calculateStrength = (pwd: string): PasswordStrength => {
  if (!pwd) return 0;
  if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 4;
  if (pwd.length >= 8) return 3;
  if (pwd.length >= 6) return 2;
  return 1;
};

export function Login({
  variant = 'login',
  onSubmit,
  onRegister,
  onLogin,
  onGoogleLogin,
  onForgotPassword,
  onResendCode,
  onTermsClick,
  onClose,
  onBack,
  emailTarget = 'a*****@gmail.com',
  isError = false,
  errorMessage = 'Kode salah, coba lagi',
  isSuccess = false,
  successMessage = 'Kode telah dikirim ke emailmu',
  isLoading = false,
  className = '',
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

  const primaryButtonStyles = {
    background: 'var(--color-primary)',
  } as const;

  const disabledPrimaryButtonStyles = {
    background: 'color-mix(in srgb, var(--color-primary) 50%, white)',
  } as const;

  const availableCategories = [
    'Teknologi',
    'Kehidupan',
    'Wisata',
    'Pekerjaan',
    'Pengembangan diri',
    'Makanan',
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const isRegister = variant === 'register';
  const isVerification = variant === 'verification';
  const isCategorySelection = variant === 'category-selection';
  const isForgotPassword = variant === 'forgot-password';
  const isForgotPasswordVerification = variant === 'forgot-password-verification';
  const isResetPassword = variant === 'reset-password';
  const isTerms = variant === 'terms';
  const usesBackButton =
    isTerms ||
    isVerification ||
    isCategorySelection ||
    isForgotPassword ||
    isForgotPasswordVerification ||
    isResetPassword;

  const goToLogin = () => {
    onLogin?.();
  };

  const goToRegister = () => {
    onRegister?.();
  };

  const registerPasswordError = isRegister && password.length > 0 && password.length < 8;
  const registerConfirmMismatch = isRegister && confirmPassword.length > 0 && confirmPassword !== password;
  const registerConfirmMatch = isRegister && confirmPassword.length > 0 && confirmPassword === password;
  const isOtpIncomplete = (isVerification || isForgotPasswordVerification) && otp.some((digit) => !digit);
  const isResetPasswordInvalid = isResetPassword && (newPassword.length < 8 || confirmNewPassword.length < 8 || newPassword !== confirmNewPassword);

  useEffect(() => {
    if ((isVerification || isForgotPasswordVerification) && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVerification, isForgotPasswordVerification, timeLeft]);

  const handleResendClick = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      onResendCode?.();
    }
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isVerification || isForgotPasswordVerification) {
      if (isOtpIncomplete) return;
      onSubmit?.(otp.join(''));
      return;
    }

    if (isResetPassword) {
      if (isResetPasswordInvalid) return;
      onSubmit?.(newPassword, confirmNewPassword);
      return;
    }

    if (isCategorySelection) {
      if (selectedCategories.length < 3) return;
      onSubmit?.('', undefined, undefined, selectedCategories);
      return;
    }

    if (isForgotPassword) {
      onSubmit?.(email);
      return;
    }

    if (isRegister) {
      if (
        !email ||
        password.length < 8 ||
        confirmPassword.length < 8 ||
        confirmPassword !== password ||
        !hasAgreedToTerms
      ) {
        return;
      }
      onSubmit?.(email, password, confirmPassword);
      return;
    }

    onSubmit?.(email, password);
  };

  return (
    <div
      className={`relative flex flex-col items-center bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-sm w-208 ${
        isResetPassword
          ? 'h-144'
          : isVerification || isForgotPasswordVerification
          ? 'h-129'
          : isCategorySelection
          ? 'h-133.5'
          : isForgotPassword
          ? 'h-122.5'
          : isRegister
          ? 'h-194'
          : 'h-184.25'
      } px-8 pt-19.5 pb-12-5 max-w-full box-border ${className}`}
    >
      <button
        type="button"
        onClick={usesBackButton ? onBack ?? onClose : onClose}
        className="absolute left-[46px] top-7.5 flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer p-0 text-text-primary hover:opacity-80 transition-opacity"
        aria-label={usesBackButton ? 'Kembali' : 'Tutup'}
      >
        {usesBackButton ? (
          <ArrowLeft className="w-6 h-6 text-text-primary" strokeWidth={2} />
        ) : (
          <XCircle className="w-6 h-6" strokeWidth={1.5} />
        )}
      </button>

      {isTerms ? (
        <TermsView onBack={onBack ?? onClose} />
      ) : isResetPassword ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-7-25 text-center w-full mt-2">
            <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
              Buat password baru
            </h2>
            <p className="font-poppins text-desc font-medium leading-[28px] text-text-muted max-w-160.25">
              Pastikan password barumu berbeda dari sebelumnya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-8 gap-6">
            <div className="flex flex-col w-full max-w-141.5 gap-6">
              <PasswordInput
                label="Password"
                placeholder="Minimal 8 karakter"
                variant="default"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                strength={calculateStrength(newPassword)}
                errorText={newPassword.length > 0 && newPassword.length < 8 ? 'Password minimal 8 karakter' : undefined}
                matchStatus={
                  confirmNewPassword.length > 0
                    ? confirmNewPassword === newPassword
                      ? 'match'
                      : 'mismatch'
                    : undefined
                }
              />

              <PasswordInput
                label="Konfirmasi password baru"
                placeholder="Ulangi password baru"
                variant="default"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                matchStatus={
                  confirmNewPassword.length > 0
                    ? confirmNewPassword === newPassword
                      ? 'match'
                      : 'mismatch'
                    : undefined
                }
              />
            </div>

            <div className="flex flex-col items-center w-full max-w-140.5 mt-2">
              <Button
                variant="brand"
                type="submit"
                className="w-full h-button-brand"
              >
                Reset password
              </Button>
            </div>
          </form>
        </div>
      ) : isForgotPasswordVerification || isVerification ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-7-25 text-center w-full mt-2">
            <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
              {isForgotPasswordVerification ? 'Masukkan kode verifikasi' : 'Verifikasi email kamu'}
            </h2>
            <p className="font-poppins text-desc font-medium leading-[28px] text-text-muted">
              Kode dikirim ke {emailTarget}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-8 gap-6">
            <div className="flex flex-col items-center w-full">
              <OtpInput
                length={4}
                value={otp}
                onChange={(newVals) => setOtp(newVals)}
                status={isError ? 'error' : 'normal'}
                message={isError ? errorMessage : undefined}
              />
            </div>

            <div className="flex flex-col items-center w-button-brand gap-2.5 mt-2">
              <Button
                variant="brand"
                type="submit"
                className="w-full h-button-brand"
                loading={isLoading}
                disabled={isLoading || isOtpIncomplete}
                style={isLoading || isOtpIncomplete ? disabledPrimaryButtonStyles : primaryButtonStyles}
              >
                Verifikasi
              </Button>

              <p className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary">
                Belum dapat kode?{' '}
                {timeLeft > 0 ? (
                  <span className="text-text-muted">
                    kirim ulang dalam {timeLeft} detik
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendClick}
                    className="font-poppins text-btn font-medium leading-[24px] text-primary bg-transparent border-none cursor-pointer underline"
                  >
                    kirim ulang
                  </button>
                )}
              </p>
            </div>
          </form>
        </div>
      ) : isForgotPassword ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-[10px] text-center w-full mt-2">
            <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
              Lupa password?
            </h2>
            <p className="font-poppins text-desc font-medium leading-[28px] text-text-muted">
              Masukkan email kamu, kami akan kirim kode untuk reset password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-6 gap-6">
            <div className="flex flex-col w-full max-w-141.5 relative">
              <TextInput
                label="Email"
                placeholder="nama@gmail.com"
                variant="default"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={isError ? errorMessage : isSuccess ? successMessage : undefined}
                helperType={isSuccess ? 'success' : 'error'}
              />
            </div>

            <div className="flex flex-col items-center w-full max-w-140.5 gap-2.5">
              <Button
                variant="brand"
                type="submit"
                className="w-full h-button-brand"
                loading={isLoading}
                disabled={isLoading}
                style={isLoading ? disabledPrimaryButtonStyles : primaryButtonStyles}
              >
                Kirim kode
              </Button>

              <p className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary">
                Ingat password?{' '}
                <button
                  type="button"
                  onClick={onLogin}
                  className="font-poppins text-btn font-medium leading-[24px] text-primary bg-transparent border-none cursor-pointer hover:underline"
                >
                  Kembali ke login
                </button>
              </p>
            </div>
          </form>
        </div>
      ) : isCategorySelection ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center gap-7-25 text-center w-full mt-2">
            <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
              Pilih 3 kategori favoritmu
            </h2>
            <p className="font-poppins text-desc font-medium leading-[28px] text-text-muted">
              Buat rekomendasi bacaan lebih sesuai seleramu
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-4 w-full max-w-160.25 mt-8 justify-items-center">
            {availableCategories.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <Tag
                  key={cat}
                  selected={isSelected}
                  onClick={() => handleCategoryToggle(cat)}
                >
                  {cat}
                </Tag>
              );
            })}
          </div>

          <div className="flex flex-col w-full max-w-140.5 mt-6 gap-2.5">
            <span className="font-poppins text-btn font-normal leading-[24px] text-text-primary">
              {selectedCategories.length} /3 dipilih
            </span>

            <Button
              variant="brand"
              type="submit"
              onClick={handleSubmit}
              className="w-full h-button-brand"
              loading={isLoading}
              disabled={isLoading || selectedCategories.length < 3}
            >
              Masuk
            </Button>
          </div>
        </div>
      ) : (
        <>
          <GoogleLoginButton onClick={onGoogleLogin} />

          <div className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary my-4 w-full">
            Atau
          </div>

          <div className="flex flex-col items-center gap-2 text-center w-full">
            <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
              {isRegister ? 'Daftar untuk memulai' : 'Gabung untuk melanjutkan'}
            </h2>
            <p className="font-poppins text-desc font-medium leading-[28px] text-text-muted">
              {isRegister
                ? 'Gabung untuk memulai pengalaman dengan fitur terbaik kami'
                : 'Masuk untuk melanjutkan aktivitasmu dan nikmati pengalaman lainnya'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] w-full mt-6">
            <TextInput
              label="Email"
              placeholder="nama@gmail.com"
              variant="default"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              label="Password"
              placeholder={isRegister ? 'Minimal 8 karakter' : 'Input'}
              variant="default"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              strength={isRegister ? calculateStrength(password) : undefined}
              errorText={registerPasswordError ? 'Password minimal 8 karakter' : undefined}
            />

            {isRegister && (
              <PasswordInput
                label="Konfirmasi password"
                placeholder="Minimal 8 karakter"
                variant="default"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                matchStatus={
                  registerConfirmMismatch
                    ? 'mismatch'
                    : registerConfirmMatch
                      ? 'match'
                      : undefined
                }
              />
            )}

            {isRegister && (
              <label className="flex items-center gap-3 w-full mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAgreedToTerms}
                  onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 shrink-0 accent-primary cursor-pointer"
                  aria-label="Setujui syarat dan ketentuan"
                />
                <span className="font-poppins text-btn font-medium leading-6 text-text-primary">
                  Saya setuju dengan{' '}
                  <button
                    type="button"
                    onClick={onTermsClick}
                    className="font-poppins text-btn font-medium leading-6 text-primary underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    syarat dan ketentuan
                  </button>
                </span>
              </label>
            )}

            {isError && (
              <div className="flex items-center gap-4 w-full h-14 px-4 bg-danger-surface border border-danger-border shadow-[0px_4px_6px_rgba(0,0,0,0.09)] rounded-sm box-border my-1">
                <CircleAlert className="w-4 h-4 text-danger shrink-0" strokeWidth={2} />
                <span className="font-poppins text-btn font-medium leading-6 text-danger">
                  {errorMessage}
                </span>
              </div>
            )}

            {!isRegister && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="font-poppins text-[12px] font-medium leading-5 text-primary bg-transparent border-none cursor-pointer"
                >
                  Lupa password?
                </button>
              </div>
            )}

            <Button
              variant="brand"
              type="submit"
              className="w-full h-button-brand mt-1"
              loading={isLoading}
              disabled={
                isLoading ||
              (isRegister &&
                (!email ||
                  password.length < 8 ||
                  confirmPassword.length < 8 ||
                  confirmPassword !== password ||
                  !hasAgreedToTerms))
              }
              style={
                isLoading ||
              (isRegister &&
                (!email ||
                  password.length < 8 ||
                  confirmPassword.length < 8 ||
                  confirmPassword !== password ||
                  !hasAgreedToTerms))
                  ? disabledPrimaryButtonStyles
                  : primaryButtonStyles
              }
            >
              {isRegister ? 'Daftar' : 'Masuk'}
            </Button>

            <p className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary mt-1">
              {isRegister ? 'Sudah punya akun? ' : 'Tidak punya akun? '}
              <button
                type="button"
                onClick={isRegister ? goToLogin : goToRegister}
                className="font-poppins text-btn font-medium leading-[24px] text-primary bg-transparent border-none cursor-pointer underline"
              >
                {isRegister ? 'Masuk' : 'Daftar'}
              </button>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

function TermsView({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="font-poppins text-title font-bold leading-[32px] text-text-primary">
        Syarat & Ketentuan
      </h2>

      <div className="flex w-full max-w-140.5 mt-6 border-b border-primary">
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`w-1/2 border-b-2 bg-transparent pb-2 font-poppins text-btn font-bold cursor-pointer ${
            activeTab === 'terms'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted'
          }`}
        >
          Syarat & Ketentuan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`w-1/2 border-b-2 bg-transparent pb-2 font-poppins text-btn font-bold cursor-pointer ${
            activeTab === 'privacy'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted'
          }`}
        >
          Kebijakan privasi
        </button>
      </div>

      <p className="w-full max-w-140.5 mt-4 font-poppins text-btn text-text-muted">
        Terakhir diperbarui: 03 September 2026
      </p>

      <div className="w-full max-w-140.5 mt-6 flex-1 overflow-y-auto font-poppins text-btn leading-7 text-text-muted">
        {activeTab === 'terms' ? <TermsContent /> : <PrivacyContent />}
      </div>

      <Button
        variant="brand"
        type="button"
        onClick={onBack}
        className="w-full max-w-140.5 h-button-brand mt-4"
      >
        Saya mengerti
      </Button>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6 pb-2">
      <p>
        Selamat datang di JEDA. Dengan mengakses atau menggunakan Platform ini,
        kamu setuju untuk terikat pada Syarat & Ketentuan berikut.
      </p>
      <section>
        <h3 className="font-bold text-text-primary">1. Definisi</h3>
        <p>
          Pengguna terdiri dari Reader (membaca, menyukai, mengomentari,
          menandai artikel) dan Author (menulis dan mempublikasikan artikel).
          Status Author bersifat tambahan terhadap akun Reader, bukan peran
          terpisah.
        </p>
      </section>
      <section>
        <h3 className="font-bold text-text-primary">2. Akun Pengguna</h3>
        <p>
          Kamu bisa membaca artikel publik tanpa akun, tapi wajib membuat akun
          untuk menyukai, mengomentari, melaporkan, menandai, atau menulis
          artikel. Kamu bertanggung jawab menjaga kerahasiaan kredensial akun
          dan seluruh aktivitas di dalamnya.
        </p>
      </section>
      <section>
        <h3 className="font-bold text-text-primary">3. Ketentuan Khusus Author</h3>
        <p>
          Author bertanggung jawab atas artikel yang dibuat dan dipublikasikan
          serta wajib menghormati hak dan keamanan pengguna lain.
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-6 pb-2">
      <p>
        Kebijakan ini menjelaskan bagaimana JEDA mengumpulkan, menggunakan,
        menyimpan, dan melindungi data pribadimu, sesuai UU No. 27 Tahun 2022
        tentang Pelindungan Data Pribadi.
      </p>
      <section>
        <h3 className="font-bold text-text-primary">1. Data yang Kami Kumpulkan</h3>
        <p>
          Data yang kamu berikan langsung (nama, email, foto profil, kategori
          minat, konten yang kamu buat), data dari login pihak ketiga seperti
          Google, data aktivitas otomatis, dan data teknis.
        </p>
      </section>
      <section>
        <h3 className="font-bold text-text-primary">2. Tujuan Penggunaan Data</h3>
        <p>
          Menyediakan fitur Platform, memberi rekomendasi artikel yang
          dipersonalisasi, mengirim notifikasi terkait akunmu, menjaga keamanan
          Platform, dan analisis internal untuk peningkatan layanan.
        </p>
      </section>
      <section>
        <h3 className="font-bold text-text-primary">3. Dasar Pemrosesan Data</h3>
        <p>
          Kami memproses datamu berdasarkan persetujuan yang kamu berikan saat
          menggunakan Platform.
        </p>
      </section>
    </div>
  );
}