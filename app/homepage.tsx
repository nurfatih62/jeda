"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/shared/components/organism/app-shell/app-shell";
import { Hero } from "@/shared/components/organism/hero/hero";
import { Tabs } from "@/shared/components/organism/tabs/tabs";
import { ArticleList } from "@/shared/components/organism/article-list/article-list";
import { generateMockArticles } from "@/lib/mock-data";

const TAB_STORAGE_KEY = "article-active-tab";

export function Homepage() {
  // Tab aktif
  const [activeTab, setActiveTab] = useState("populer");

  // Data artikel
  const [articles, setArticles] = useState<
    ReturnType<typeof generateMockArticles>
  >([]);

  // Ambil tab terakhir dan generate data
  useEffect(() => {
    // Ambil tab terakhir dari localStorage
    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);

    if (savedTab === "populer" || savedTab === "terbaru") {
      setActiveTab(savedTab);
    }

    // Generate artikel
    setArticles(generateMockArticles());
  }, []);

  // Ketika tab berubah
  const handleTabChange = (key: string) => {
    setActiveTab(key);

    // Simpan tab agar ketika refresh tetap di tab tersebut
    localStorage.setItem(TAB_STORAGE_KEY, key);
  };

  // Sorting artikel berdasarkan tab
  const sortedArticles = [...articles].sort((a, b) => {
    // =========================
    // POPULER
    // =========================
    if (activeTab === "populer") {
      const scoreA = a.likes + a.comments;
      const scoreB = b.likes + b.comments;

      return scoreB - scoreA;
    }

    // =========================
    // TERBARU
    // =========================
    if (activeTab === "terbaru") {
      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );
    }

    return 0;
  });

  return (
    <AppShell activeSidebarKey="home">
      {/* HERO */}
      <Hero />

      {/* CONTENT */}
      <section className="mx-auto w-full max-w-341 px-5 md:px-11.5">
        {/* TABS */}
        <Tabs
          defaultActiveKey={activeTab}
          items={[
            {
              key: "populer",
              label: "Populer",
            },
            {
              key: "terbaru",
              label: "Terbaru",
            },
          ]}
          onChange={handleTabChange}
        />

        {/* ARTICLE LIST */}
        <ArticleList articles={sortedArticles} />
      </section>
    </AppShell>
  );
}