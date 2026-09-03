"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/components/molecule/login/login";
import { supabase } from "@/../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(email: string, password?: string) {
    if (!password) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrorMessage("Masukkan email yang valid");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    setIsLoading(false);

    if (error) {
      setErrorMessage(
        error.message.toLowerCase().includes("email not confirmed")
          ? "Akun belum diverifikasi. Cek email kamu"
          : "Email atau password salah"
      );
      return;
    }

    router.push("/homepage");
  }

  return (
    <Login
      variant="login"
      onClose={() => router.push("/")}
      onGoogleLogin={() => undefined}
      onRegister={() => router.push("/register")}
      onForgotPassword={() => router.push("/forgot-password")}
      onSubmit={handleLogin}
      isLoading={isLoading}
      isError={Boolean(errorMessage)}
      errorMessage={errorMessage}
    />
  );
}