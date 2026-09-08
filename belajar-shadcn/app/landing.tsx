"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Manrope } from "next/font/google";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { link } from "fs";
import { setMaxIdleHTTPParsers } from "http";

const manrope = Manrope({
  subsets: ["latin"],
});

export default function Landing() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  // ======================
  // REGISTER
  // =======================
  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://6a7aee318c69b3eb4a17aec3.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nama,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Register gagal");
      }

      const data = await response.json();

      console.log("Register berhasil:", data);

      alert("Register berhasil!");

      setNama("");
      setEmail("");
      setPassword("");
      setMode("login");
    } catch (error) {
      console.error("Error:", error);
      alert("Register gagal!");
    }
  };

  // ===================
  // LOGIN
  // ====================
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://6a7aee318c69b3eb4a17aec3.mockapi.io/api/v1/users"
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const users = await response.json();

      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (!user) {
        alert("Email atau password salah!");
        return;
      }

      console.log("Login berhasil:", user);

      alert(`Selamat datang, ${user.name}!`);

      setEmail("");
      setPassword("");
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat login");
    }
  };


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-[#F2F7F6]">
        
        {/* Navbar */}
        <nav className="sticky top-0 z-50 flex justify-between bg-[#E4EFED] px-8 py-4">
          <div className="text-2xl font-semibold text-teal-700">
            Jeda
          </div>

          <Button 
          onClick={() => {
            setMode("login"); setOpen(true);
          }}
          className="bg-[#3A9489] text-white transition-colors hover:bg-[#2F7D73]">
            Masuk/Daftar
          </Button>
        </nav>

        {/* Section 1 */}
        <section className="py-20">
          <div className="mx-auto max-w-xl py-9 text-center">
            
            <h1 className="text-5xl">
              Tempat menulis pikiran,{" "}
              <span className="text-[#3A9489]">
                satu jeda
              </span>{" "}
              pada satu waktu.
            </h1>

            <p className="mt-8 text-2xl">
              Jeda adalah blog personal tentang hal-hal kecil yang kita
              rasakan sehari-hari — cerita, refleksi, dan sedikit psikologi
              diri, ditulis apa adanya.
            </p>

            <div className="flex justify-center gap-4 pt-8">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="bg-[#3A9489] text-white hover:bg-[#2F7D73]"
              >
                Mulai Sekarang
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setOpen(true)}
                className="border-[#3A9489] text-[#3A9489] hover:bg-[#E4EFED]"
              >
                Lihat Cerita
              </Button>
            </div>

          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="mx-auto max-w-xl py-20 text-left">
            <p className={`text-xl text-[#3A9489] ${manrope.className}`}>
              Bergabung dengan Jeda
            </p>
            <h1 className="mt-8 text-4xl">
              Simpan cerita favoritmu, dan tulis 
              <span className="text-[#3A9489]"> jedamu </span>
              sendiri.
            </h1>
            <p className={`mt-3 ${manrope.className}`}>
              Buat untuk menanda tulisan yang berkesan, meninggalkan komentar, dan (kalau kamu mau) mulai menulis cerita sendiri.
            </p>
            <div className={`mt-3 ${manrope.className}`}>
              <div className="flex flex-col gap-6">
                {/* item 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9DDDC] text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">
                      Tandai tulisan favorit
                    </p>
                    <p className="text-sm text-gray-700">
                      Simpen cerita yang ingin kamu baca ulang, kapan pun kamu butuh.
                    </p>
                  </div>
                </div>
                {/* item 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9DDDC] text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">
                      Ikut beromentar
                    </p>
                    <p className="text-sm text-gray-700">
                      Bagikan sudut pandangmu di kolom diskusi setiap cerita.
                    </p>
                  </div>
                </div>
                {/* item 3 */}
                <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9DDDC] text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">
                        Mulai menulis jedamu
                      </p>
                      <p className="text-sm text-gray-700">
                        Punya cerita sendiri? Kirim dan bagikan lewat jeda.
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false}>

            {/* Judul */}
            <DialogHeader className="mt-6 mb-3 items-center text-center">
              <DialogTitle className="text-2xl font-semibold">
                {mode === "login" ? "Mulai Cerita" : "Daftar"}
              </DialogTitle>
            </DialogHeader>

            {/* ============== LOGIN ============== */}
            {mode === "login" ? (
              <div className="flex flex-col gap-4">

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Email
                  </label>

                  <Input
                    type="email"
                    placeholder="Masukkan Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Password
                  </label>

                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Register */}
                <div className="flex items-center justify-center gap-1">
                  <p className="text-gray-600">
                    Belum punya akun?
                  </p>

                  <Button
                    variant="link"
                    className="p-0 text-[#3A9489]"
                    onClick={() => {
                      setMode("register");
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    Register
                  </Button>
                </div>

                {/* Tombol Login */}
                <Button
                  className="bg-[#3A9489] text-white hover:bg-[#2F7D73]"
                  onClick={handleLogin}
                >
                  Login
                </Button>

                {/* Daftar */}
                <div className="flex flex-col gap-3">
                  <Button variant="outline">
                    Daftar dengan Google
                  </Button>

                  <Button variant="outline">
                    Daftar dengan Facebook
                  </Button>

                  <Button variant="outline">
                    Daftar dengan Email
                  </Button>
                </div>

              </div>
            ) : (

              /* ============== REGISTER ============== */
              <div className="flex flex-col gap-4">

                {/* Nama Lengkap */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Nama Lengkap
                  </label>

                  <Input
                    type="text"
                    placeholder="Nama kamu"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Email
                  </label>

                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Kata Sandi */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Kata Sandi
                  </label>

                  <Input
                    type="password"
                    placeholder="Masukan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Konfirmasi Kata Sandi */}
                <div className="flex flex-col gap-2">
                  <label className="ml-3 text-sm font-medium">
                    Konfirmasi kata sandi
                  </label>

                  <Input
                    type="password"
                    placeholder="Ulangi kata sandi"
                  />
                </div>

                {/* Sudah punya akun */}
                <div className="flex items-center justify-center gap-1">
                  <p className="text-gray-600">
                    Sudah punya akun?
                  </p>

                  <Button
                    variant="link"
                    onClick={() => {
                      setMode("login");
                      setNama("");
                      setEmail("");
                      setPassword("");
                    }}
                    className="p-0 text-[#3A9489]"
                  >
                    Login
                  </Button>
                </div>

                {/* Tombol Register */}
                <Button
                  className="bg-[#3A9489] text-white hover:bg-[#2F7D73]"
                  onClick={handleRegister}
                >
                  Register
                </Button>

              </div>
            )}

          </DialogContent>
        </Dialog>
      <footer className="flex items-center justify-between bg-[#E4EFED] px-8 py-3">
        <p className={manrope.className}>
          © 2026 Jeda. Semua cerita adalah milik penulis.        
        </p>
        <a 
        href="#"
        className={`text-[#3A9489] underline ${manrope.className}`}
        >
          Help center
        </a>
      </footer>
    </div>
  );
}