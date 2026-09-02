"use client";

import React from 'react';
import { Login } from '../../shared/components/molecule/login/login';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (emailOrCode: string, password?: string, confirmPassword?: string) => {
    console.log('Login submitted:', { emailOrCode, password, confirmPassword });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <main className="relative flex items-center justify-center w-screen h-screen bg-text-primary border border-black overflow-hidden">
      <Login
        onSubmit={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
        onClose={handleClose}
      />
    </main>
  );
}