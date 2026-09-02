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
    | 'reset-password';
  onSubmit?: (emailOrCode: string, password?: string, confirmPassword?: string, categories?: string[]) => void;
  onRegister?: () => void;
  onLogin?: () => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: () => void;
  onResendCode?: () => void;
  onClose?: () => void;
  emailTarget?: string;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
  successMessage?: string;
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
  onClose,
  emailTarget = 'a*****@gmail.com',
  isError = false,
  errorMessage = 'Kode salah, coba lagi',
  isSuccess = false,
  successMessage = 'Kode telah dikirim ke emailmu',
  className = '',
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

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
      onSubmit?.(otp.join(''));
    } else if (isResetPassword) {
      onSubmit?.(newPassword, confirmNewPassword);
    } else if (isCategorySelection) {
      onSubmit?.('', undefined, undefined, selectedCategories);
    } else if (isForgotPassword) {
      onSubmit?.(email);
    } else if (isRegister) {
      onSubmit?.(email, password, confirmPassword);
    } else {
      onSubmit?.(email, password);
    }
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
        onClick={onClose}
        className="absolute left-[46px] top-7.5 flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer p-0 text-text-primary hover:opacity-80 transition-opacity"
        aria-label={isVerification || isCategorySelection || isForgotPassword || isForgotPasswordVerification || isResetPassword ? 'Kembali' : 'Tutup'}
      >
        {isVerification || isCategorySelection || isForgotPassword || isForgotPasswordVerification || isResetPassword ? (
          <ArrowLeft className="w-6 h-6 text-text-primary" strokeWidth={2} />
        ) : (
          <XCircle className="w-6 h-6" strokeWidth={1.5} />
        )}
      </button>

      {isResetPassword ? (
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
              />

              <PasswordInput
                label="Konfirmasi password baru"
                placeholder="Ulangi password baru"
                variant="default"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center w-full max-w-140.5 mt-2">
              <Button
                variant="brand"
                type="submit"
                className="w-full h-13.5"
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

            <div className="flex flex-col items-center w-140.5 gap-2.5 mt-2">
              <Button
                variant="brand"
                type="submit"
                className="w-full h-13.5"
                style={{ background: 'rgba(20,108,93,0.5)' }}
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
                    className="font-poppins text-btn font-medium leading-[24px] text-[#146C5D] bg-transparent border-none cursor-pointer underline"
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
                className="w-full h-13.5"
                style={{ background: 'rgba(20,108,93,0.5)' }}
              >
                Kirim kode
              </Button>

              <p className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary">
                Ingat password?{' '}
                <button
                  type="button"
                  onClick={onLogin}
                  className="font-poppins text-btn font-medium leading-[24px] text-[#146C5D] bg-transparent border-none cursor-pointer hover:underline"
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
              className="w-full h-13.5"
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
            />

            {isRegister && (
              <PasswordInput
                label="Konfirmasi password"
                placeholder="Minimal 8 karakter"
                variant="default"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            {isError && !isRegister && (
              <div className="flex items-center gap-4 w-full h-14 px-4 bg-[#FDECEC] border border-[#FBCECE] shadow-[0px_4px_6px_rgba(0,0,0,0.09)] rounded-sm box-border my-1">
                <CircleAlert className="w-4 h-4 text-[#D02A11] shrink-0" strokeWidth={2} />
                <span className="font-poppins text-btn font-medium leading-6 text-[#D02A11]">
                  {errorMessage}
                </span>
              </div>
            )}

            {!isRegister && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="font-poppins text-[12px] font-medium leading-5 text-[#146C5D] bg-transparent border-none cursor-pointer"
                >
                  Lupa password?
                </button>
              </div>
            )}

            <Button
              variant="brand"
              type="submit"
              className="w-full h-13.5 mt-1"
              style={{ background: 'rgba(20,108,93,0.5)' }}
            >
              {isRegister ? 'Daftar' : 'Masuk'}
            </Button>

            <p className="font-poppins text-btn font-normal leading-[24px] text-center text-text-primary mt-1">
              {isRegister ? 'Sudah punya akun? ' : 'Tidak punya akun? '}
              <button
                type="button"
                onClick={isRegister ? onLogin : onRegister}
                className="font-poppins text-btn font-medium leading-[24px] text-[#146C5D] bg-transparent border-none cursor-pointer underline"
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