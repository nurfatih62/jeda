"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DocSectionBlock } from "@/shared/molecules/doc-section-block/doc-section-block";

export interface TermsModalProps {
  /** Status keterbukaan modal */
  isOpen?: boolean;
  /** Tab awal yang aktif ('terms' atau 'privacy') */
  defaultTab?: "terms" | "privacy";
  /** Tanggal pembaruan dokumen */
  lastUpdated?: string;
  /** Isi teks Syarat & Ketentuan kustom */
  termsContent?: React.ReactNode;
  /** Isi teks Kebijakan Privasi kustom */
  privacyContent?: React.ReactNode;
  /** Callback saat tombol kembali diklik */
  onBack?: () => void;
  /** Callback saat tombol 'Saya mengerti' diklik */
  onUnderstand?: () => void;
  /** Tambahan kelas CSS */
  className?: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen = true,
  defaultTab = "terms",
  lastUpdated = "03 September 2026",
  termsContent,
  privacyContent,
  onBack,
  onUnderstand,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">(defaultTab);

  if (!isOpen) return null;

  // Isi Syarat & Ketentuan — dirender via molecule DocSectionBlock
  const termsSections: Array<{ heading: string; body: React.ReactNode }> = [
    {
      heading: "1. Definisi",
      body: "Pengguna terdiri dari Reader (membaca, menyukai, mengomentari, menandai artikel) dan Author (menulis dan mempublikasikan artikel). Status Author bersifat tambahan terhadap akun Reader, bukan peran terpisah.",
    },
    {
      heading: "2. Akun Pengguna",
      body: "Kamu bisa membaca artikel publik tanpa akun, tapi wajib membuat akun untuk menyukai, mengomentari, melaporkan, menandai, atau menulis artikel. Kamu bertanggung jawab menjaga kerahasiaan kredensial akun dan seluruh aktivitas di dalamnya. Satu orang hanya boleh punya satu akun aktif. Status Author bersifat permanen dan hanya bisa dihapus lewat permintaan khusus ke kami.",
    },
    {
      heading: "3. Ketentuan Khusus Author",
      body: "Kamu bisa mengaktifkan status Author kapan saja secara self-service. Kamu tetap memegang hak cipta atas kontenmu, namun memberi kami lisensi non-eksklusif untuk menampilkan dan mendistribusikannya. Dilarang mempublikasikan konten yang melanggar hak cipta, mengandung ujaran kebencian/SARA, hoaks, atau melanggar hukum. Kami berhak menurunkan konten yang melanggar tanpa perlu persetujuan Author.",
    },
    {
      heading: "4. Perilaku Pengguna",
      body: "Dilarang membuat akun palsu, menyamar sebagai pihak lain, melakukan aktivitas ilegal, spam, scraping otomatis, atau melecehkan pengguna lain.",
    },
    {
      heading: "5. Pelaporan Konten",
      body: "Kamu dapat melaporkan konten yang melanggar ketentuan. Kami akan meninjau dan berhak mengambil tindakan sesuai kebijakan internal.",
    },
    {
      heading: "6. Batasan Tanggung Jawab",
      body: "Konten yang dipublikasikan Author adalah tanggung jawab Author, bukan Platform. Kami tidak menjamin layanan bebas gangguan sepenuhnya.",
    },
    {
      heading: "7. Perubahan Layanan dan Ketentuan",
      body: "Kami berhak mengubah fitur Platform maupun ketentuan ini sewaktu-waktu. Perubahan material akan diinformasikan lewat Platform atau email terdaftarmu.",
    },
    {
      heading: "8. Hukum yang Berlaku",
      body: "Syarat & Ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.",
    },
    {
      heading: "9. Kontak",
      body: (
        <>
          Ada pertanyaan terkait Syarat & Ketentuan ini? Hubungi kami{" "}
          <a href="mailto:jedahelpcall@gmail.com" className="text-[#146C5D] underline">
            jedahelpcall@gmail.com
          </a>
        </>
      ),
    },
  ];

  // Teks Lengkap Syarat & Ketentuan
  const defaultTermsContent = (
    <div className="flex flex-col gap-4 text-[#101D13]/75 font-['Poppins'] text-base leading-[28px] font-medium">
      <p className="m-0">
        Selamat datang di JEDA. Dengan mengakses atau menggunakan Platform ini, kamu setuju untuk terikat pada Syarat & Ketentuan berikut.
      </p>

      {termsSections.map((section) => (
        <DocSectionBlock key={section.heading} heading={section.heading}>
          {section.body}
        </DocSectionBlock>
      ))}
    </div>
  );

  // Isi Kebijakan Privasi — dirender via molecule DocSectionBlock
  const privacySections: Array<{ heading: string; body: React.ReactNode }> = [
    {
      heading: "1. Data yang Kami Kumpulkan",
      body: "Data yang kamu berikan langsung (nama, email, foto profil, kategori minat, konten yang kamu buat), data dari login pihak ketiga seperti Google, data aktivitas otomatis (riwayat baca, like, bookmark, komentar), dan data teknis (IP, perangkat, browser, cookie).",
    },
    {
      heading: "2. Tujuan Penggunaan Data",
      body: "Menyediakan fitur Platform, memberi rekomendasi artikel yang dipersonalisasi, mengirim notifikasi terkait akunmu, menjaga keamanan Platform, dan analisis internal untuk peningkatan layanan.",
    },
    {
      heading: "3. Dasar Pemrosesan Data",
      body: "Kami memproses datamu berdasarkan persetujuan yang kamu berikan saat mendaftar, serta kepentingan sah kami dalam mengoperasikan dan meningkatkan Platform.",
    },
    {
      heading: "4. Berbagi Data dengan Pihak Ketiga",
      body: "Kami tidak menjual data pribadimu. Data hanya dibagikan ke penyedia layanan teknis (hosting, analitik) atau pihak berwenang jika diwajibkan hukum.",
    },
    {
      heading: "5. Cookie",
      body: "Digunakan untuk menjaga sesi login, mengingat preferensimu, dan menganalisis penggunaan Platform secara agregat. Kamu bisa mengatur cookie lewat pengaturan browser.",
    },
    {
      heading: "6. Penyimpanan dan Keamanan Data",
      body: "Data disimpan selama akunmu aktif atau sesuai kebutuhan tujuan pemrosesan. Kami menerapkan langkah keamanan wajar untuk melindungi datamu. Setelah akun dihapus, data dihapus/dianonimkan sesuai retensi yang berlaku.",
    },
    {
      heading: "7. Hak Kamu sebagai Pemilik Data",
      body: 'Sesuai UU PDP, kamu berhak mengakses, mengoreksi, meminta penghapusan ("hak untuk dilupakan"), menarik persetujuan, dan mengajukan keberatan atas pemrosesan data tertentu.',
    },
    {
      heading: "8. Perubahan Kebijakan Privasi",
      body: "Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan material akan diinformasikan lewat Platform atau email terdaftarmu sebelum berlaku efektif.",
    },
    {
      heading: "9. Kontak",
      body: (
        <>
          Ada pertanyaan, keluhan, atau ingin menggunakan hakmu atas data pribadi? Hubungi kami di{" "}
          <a href="mailto:jedahelpcall@gmail.com" className="text-[#146C5D] underline">
            jedahelpcall@gmail.com
          </a>.
        </>
      ),
    },
  ];

  // Teks Lengkap Kebijakan Privasi
  const defaultPrivacyContent = (
    <div className="flex flex-col gap-4 text-[#101D13]/75 font-['Poppins'] text-base leading-[28px] font-medium">
      <p className="m-0">
        Kebijakan ini menjelaskan bagaimana JEDA mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadimu, sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
      </p>

      {privacySections.map((section) => (
        <DocSectionBlock key={section.heading} heading={section.heading}>
          {section.body}
        </DocSectionBlock>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Container Utama Modal */}
      <div
        className={`
          relative w-full max-w-[832px] h-[823px] bg-white rounded-[6px]
          shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center
          p-8 box-border overflow-hidden
          ${className}
        `}
      >
        {/* Tombol Back (Kiri Atas) */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="absolute left-[46px] top-[30px] bg-transparent border-none p-1 cursor-pointer hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6 stroke-[#1B4E46]" />
        </button>

        {/* Header Judul Utama */}
        <h2 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] mt-8 mb-6 text-center">
          Syarat & Ketentuan
        </h2>

        {/* Tab Navigation */}
        <div className="w-full max-w-[662px] flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-[#CCCCCC] relative">
            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`
                w-1/2 py-2 font-['Poppins'] font-bold text-[24px] leading-[28px] text-center border-none bg-transparent cursor-pointer transition-colors
                ${activeTab === "terms" ? "text-[#1B4E46] opacity-100" : "text-[#1B4E46] opacity-50"}
              `}
            >
              Syarat & Ketentuan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`
                w-1/2 py-2 font-['Poppins'] font-bold text-[24px] leading-[28px] text-center border-none bg-transparent cursor-pointer transition-colors
                ${activeTab === "privacy" ? "text-[#1B4E46] opacity-100" : "text-[#1B4E46] opacity-50"}
              `}
            >
              Kebijakan privasi
            </button>

            {/* Indicator Line Aktif */}
            <div
              className={`
                absolute bottom-0 h-[2px] bg-gradient-to-r from-black/20 to-black/20 bg-[#146C5D] transition-all duration-300 w-1/2
                ${activeTab === "terms" ? "left-0" : "left-1/2"}
              `}
            />
          </div>

          {/* Subtitle Terakhir Diperbarui */}
          <p className="font-['Poppins'] font-normal text-base text-[#1B4E46] text-center mt-4 mb-2">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        {/* Area Dokumen Scrollable */}
        <div className="w-full max-w-[676px] flex-1 overflow-y-auto my-4 pr-2 text-left">
          {activeTab === "terms"
            ? termsContent || defaultTermsContent
            : privacyContent || defaultPrivacyContent}
        </div>

        {/* Tombol Action "Saya mengerti" */}
        <div className="w-full max-w-[562px] mt-2 mb-2">
          <button
            type="button"
            onClick={onUnderstand}
            className="w-full h-[54px] flex justify-center items-center py-2 px-4 rounded-[6px] bg-[#146C5D] bg-gradient-to-r from-black/20 to-black/20 text-white font-['Poppins'] font-medium text-[20px] leading-[24px] cursor-pointer hover:opacity-90 transition-opacity border-none"
          >
            Saya mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

TermsModal.displayName = "TermsModal";