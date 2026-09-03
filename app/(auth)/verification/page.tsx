"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";
import { Login } from "@/components/molecule/login/login";

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const STATIC_OTP = "1234";

  async function handleVerify(code: string) {
    if (code.length !== 4 || !email) {
      setIsError(true);
      setErrorMessage(!email ? "Email verifikasi tidak ditemukan" : "Masukkan 4 digit kode terlebih dahulu");
      return;
    }

    setIsLoading(true);
    setIsError(false);

    // Simulasi delay verifikasi
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    if (code !== STATIC_OTP) {
      setIsError(true);
      setErrorMessage("Kode salah, coba lagi");
      return;
    }

    setIsSuccess(true);
    setTimeout(() => setShowCategories(true), 1000);
  }

  function handleCategories() {
    router.push("/homepage");
  }

  function handleResend() {
    // Statis: tidak kirim email, hanya tampilkan feedback
  }

  if (showCategories) {
    return (
      <Login
        variant="category-selection"
        onClose={() => router.push("/")}
        onBack={() => setShowCategories(false)}
        onSubmit={(_, __, ___, categories) => {
          if (categories?.length === 3) {
            window.localStorage.setItem(
              "jeda-preferred-categories",
              JSON.stringify(categories)
            );
            handleCategories();
          }
        }}
      />
    );
  }

  return (
    <Login
      variant="verification"
      emailTarget={email || "email kamu"}
      onClose={() => router.push("/")}
      onBack={() => router.push(`/register?email=${encodeURIComponent(email)}`)}
      onGoogleLogin={() => undefined}
      onSubmit={handleVerify}
      onResendCode={handleResend}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      isSuccess={isSuccess}
      successMessage="Kode terverifikasi"
    />
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={null}>
      <VerificationContent />
    </Suspense>
  );
}