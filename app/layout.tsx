import type { Metadata } from "next";
import { IBM_Plex_Serif, Nunito, Poppins } from "next/font/google";
import "./global.css";

const poppins = Poppins({
  variable: "--font-jeda-poppins",
  weight: ["500", "700"],
  subsets: ["latin"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-jeda-serif",
  weight: "700",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-jeda-nunito",
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JEDA - Ambil Jeda dan Mulai Membaca",
  description:
    "Platform artikel untuk membaca, menulis, dan mengelola artikel blog.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${plexSerif.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
