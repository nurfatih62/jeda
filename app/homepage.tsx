"use client";

import { useEffect, useState } from "react";

import { Header } from "@/shared/components/organism/header/header";
import { Hero } from "@/shared/components/organism/hero/hero";
import { Tabs } from "@/shared/components/organism/tabs/tabs";
import { ArticleList } from "@/shared/components/organism/article-list/article-list";
import { generateMockArticles } from "@/lib/mock-data";

const TAB_STORAGE_KEY = "article-active-tab";

export function Homepage() {
  const [activeTab, setActiveTab] = useState("populer");

  const [articles, setArticles] = useState<
    ReturnType<typeof generateMockArticles>
  >([]);

  // Ambil tab terakhir setelah halaman berjalan di browser
  useEffect(() => {
    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);

    if (savedTab === "populer" || savedTab === "terbaru") {
      setActiveTab(savedTab);
    }
  }, []);

  // Generate mock data
  useEffect(() => {
    setArticles(generateMockArticles());
  }, []);

  // Simpan tab setiap kali berubah
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem(TAB_STORAGE_KEY, key);
  };

  // Sorting artikel
  const sortedArticles = [...articles].sort((a, b) => {
    // POPULER
    if (activeTab === "populer") {
      const scoreA = a.likes + a.comments;
      const scoreB = b.likes + b.comments;

      return scoreB - scoreA;
    }

    // TERBARU
    if (activeTab === "terbaru") {
      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-(--background)">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* CONTENT */}
      <section className="mx-auto max-w-341 px-5 md:px-11.5">
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
    </main>
  );
}