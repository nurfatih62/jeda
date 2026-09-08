"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/components/molecule/login/login";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setIsError(true);
      setErrorMessage("Masukkan email yang valid");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const data = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        setIsError(true);
        setErrorMessage(data.error || "Gagal memproses permintaan. Coba lagi");
        return;
      }

      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Gagal terhubung. Coba lagi");
    }
  }

  return (
    <Login
      variant="forgot-password"
      onClose={() => router.push("/")}
      onBack={() => router.push("/login")}
      onLogin={() => router.push("/login")}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      isSuccess={isSuccess}
      successMessage="Kode telah dikirim ke emailmu"
    />
  );
}
