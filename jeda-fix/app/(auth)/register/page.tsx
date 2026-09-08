"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/components/molecule/login/login";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  async function handleRegister(email: string, password?: string) {
    if (!password) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrorMessage("Masukkan email yang valid");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          displayName: normalizedEmail.split("@")[0],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429 || data.error === "rate_limit") {
          setErrorMessage("Terlalu banyak percobaan. Tunggu beberapa saat sebelum mencoba lagi");
        } else if (res.status === 409) {
          setErrorMessage("Email sudah terdaftar. Coba login");
        } else {
          setErrorMessage(data.error || "Gagal mendaftar. Coba lagi");
        }
        return;
      }

      // Redirect ke halaman verifikasi OTP statis (frontend-only)
      router.push(`/verification?email=${encodeURIComponent(normalizedEmail)}`);
    } catch {
      setErrorMessage("Gagal terhubung. Coba lagi");
    } finally {
      setIsLoading(false);
    }
  }

  if (showTerms) {
    return (
      <Login
        variant="terms"
        onBack={() => setShowTerms(false)}
        onClose={() => router.push("/")}
      />
    );
  }

  return (
    <Login
      variant="register"
      onClose={() => router.push("/")}
      onBack={() => router.back()}
      onGoogleLogin={() => undefined}
      onTermsClick={() => setShowTerms(true)}
      onLogin={() => router.push("/login")}
      onSubmit={handleRegister}
      isLoading={isLoading}
      isError={Boolean(errorMessage)}
      errorMessage={errorMessage}
      isSuccess={Boolean(successMessage)}
      successMessage={successMessage}
    />
  );
}