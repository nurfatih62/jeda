"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "../../shared/components/organism/app-shell/app-shell";
import { supabase } from "../../lib/supabase/client";
import { Button } from "../../shared/components/atom/button/button";
import { PasswordInput } from "../../shared/components/molecule/password-input/password-input";
import { Toast } from "../../shared/components/molecule/toast/toast";
import { ConfirmationPopup } from "../../shared/components/molecule/confirmation-popup/confirmation-popup";
import { ProfileField } from "../../shared/components/molecule/profile-field/profile-field";
import { ProfileAvatarUploader } from "../../shared/components/molecule/profile-avatar-uploader/profile-avatar-uploader";

interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState<"success" | "error">("success");
  const [confirmation, setConfirmation] = useState<"profile" | "password" | null>(null);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    async function loadProfile() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      const profileQuery = supabase
        .from("profiles")
        .select("id,username,display_name,avatar_url,bio");

      const { data } = username
        ? await profileQuery.eq("username", username).maybeSingle()
        : user
          ? await profileQuery.eq("id", user.id).maybeSingle()
          : { data: null };

      if (!data) {
        setIsLoading(false);
        return;
      }

      setEmail(user?.email ?? "");
      setProfile(data);
      setDisplayName(data.display_name);
      setProfileUsername(data.username);
      setBio(data.bio ?? "");

      setIsLoading(false);
    }

    void loadProfile();
  }, [username]);

  useEffect(() => {
    if (!message) return;
    const timeoutId = window.setTimeout(() => setMessage(""), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  return (
    <AppShell activeSidebarKey="profile">
      <div className="bg-background w-full px-17-5 pt-top pb-12-5">
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs">
          <h1 className="font-sans text-title font-bold leading-[32px] text-text-primary">
            Profil
          </h1>

          {isLoading ? (
            <div className="w-full text-center text-text-muted">Memuat profil...</div>
          ) : profile ? (
            <section className="w-full max-w-284">
              <div className="mb-8 flex justify-end">
                {!username && (
                  <Button type="button" className="text-sm">
                    Gabung sebagai author
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <ProfileAvatarUploader
                    src={profile.avatar_url}
                    name={profile.display_name}
                    editable={!username}
                    onSelect={(file) => {
                      if (file.size > 5 * 1024 * 1024) {
                        setMessage("Ukuran foto maksimal 5 MB");
                        setMessageVariant("error");
                        return;
                      }
                      setProfile((current) => current ? { ...current, avatar_url: URL.createObjectURL(file) } : current);
                      setMessage("Foto profil dipilih. Simpan perubahan untuk menerapkannya.");
                      setMessageVariant("success");
                    }}
                  />
                  {!username && <p className="max-w-48 text-center text-xs text-text-muted">JPG, PNG, atau WebP. Maks. 5 MB.</p>}
                </div>
                <div className="flex w-full max-w-2xl flex-col gap-3">
                  <ProfileField label="Username" value={profileUsername} onChange={(event: ChangeEvent<HTMLInputElement>) => setProfileUsername(event.target.value)} readOnly={Boolean(username)} hint={!username ? "3–20 karakter. Gunakan huruf, angka, atau underscore" : undefined} />
                  <ProfileField label="Nama tampilan" value={displayName} onChange={(event: ChangeEvent<HTMLInputElement>) => setDisplayName(event.target.value)} readOnly={Boolean(username)} />
                  <ProfileField label="Deskripsi" value={bio} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setBio(event.target.value)} readOnly={Boolean(username)} maxLength={160} rows={2} multiline hint={!username ? "Ceritakan sedikit tentang dirimu. Maksimal 160 karakter." : undefined} />
                  <Button
                    type="button"
                    className="self-end text-sm"
                    onClick={() => {
                      setConfirmation("profile");
                    }}
                  >
                    Simpan perubahan
                  </Button>
                  <ConfirmationPopup
                    open={confirmation === "profile"}
                    title="Yakin mau ubah profil?"
                    description="Perubahan akan langsung terlihat oleh pengguna lain."
                    onCancel={() => setConfirmation(null)}
                    onConfirm={async () => {
                      setConfirmation(null);
                      setMessage("Perubahan berhasil");
                      setMessageVariant("success");
                    }}
                  />
                </div>
              </div>

              {!username && (
                <div className="mt-8 border-t border-primary pt-5">
                  <h2 className="text-2xl font-bold text-text-primary">Ubah password</h2>
                  <div className="mt-4 grid max-w-2xl gap-4">
                    <PasswordInput label="Password saat ini" placeholder="Masukkan password saat ini" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                    <PasswordInput label="Password baru" placeholder="Minimal 8 karakter" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                    <PasswordInput label="Konfirmasi password baru" placeholder="Ulangi password baru" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} matchStatus={confirmPassword ? (newPassword === confirmPassword ? "match" : "mismatch") : undefined} />
                    <Button
                      type="button"
                      className="w-fit self-end text-sm"
                      onClick={() => {
                        setConfirmation("password");
                      }}
                    >
                      Simpan perubahan
                    </Button>
                  </div>
                  <ConfirmationPopup
                    open={confirmation === "password"}
                    title="Yakin mau ubah password?"
                    description="Kamu mungkin perlu login ulang di perangkat lain setelah ini."
                    onCancel={() => setConfirmation(null)}
                    onConfirm={async () => {
                      setConfirmation(null);
                      setMessage("Perubahan berhasil");
                      setMessageVariant("success");
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                  />
                </div>
              )}
              {message && (
                <div className="fixed left-1/2 top-20 z-50 w-[calc(100%-2rem)] max-w-106 -translate-x-1/2">
                  <Toast variant={messageVariant} title={message} />
                </div>
              )}
            </section>
          ) : (
            <div className="flex w-full flex-col items-center gap-3 pt-top">
              <h2 className="font-sans font-bold text-title text-center text-text-primary">
                Masuk untuk melihat profil Anda
              </h2>
              <p className="font-sans font-medium text-desc text-center text-text-muted">
                Ayo masuk untuk melihat informasi akun, artikel yang disimpan, dan pengaturan lainnya.
              </p>
              <Link href="/login">
                <Button className="h-10">
                  Masuk
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
