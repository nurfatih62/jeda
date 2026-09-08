"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowUp, ArrowDown, Edit3 } from "lucide-react";

export interface ArticleItem {
  id: string;
  title: string;
  status: "Publikasi" | "Draft";
  views: string;
  likes: string;
  comments: string;
}

export interface StatCardData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
}

export interface AuthorDashboardProps {
  stats?: StatCardData[];
  articles?: ArticleItem[];
  onEditArticle?: (article: ArticleItem) => void;
  className?: string;
}

const defaultStats: StatCardData[] = [
  {
    label: "Total views",
    value: "8.4K",
    change: "12%",
    isPositive: true,
  },
  {
    label: "Total likes",
    value: "1.1K",
    change: "8%",
    isPositive: true,
  },
  {
    label: "Total komentar",
    value: "156",
    change: "3%",
    isPositive: false,
  },
  {
    label: "Total publikasi artikel",
    value: "2",
    subtitle: "1 draft aktif",
  },
];

const defaultArticles: ArticleItem[] = [
  {
    id: "1",
    title: 'Kenapa Kita Suka Cerita Sedih',
    status: "Publikasi",
    views: "2.4K",
    likes: "237",
    comments: "47",
  },
  {
    id: "2",
    title: "Belajar Menulis Tiap Hari",
    status: "Publikasi",
    views: "1.8K",
    likes: "123",
    comments: "21",
  },
  {
    id: "3",
    title: "Catatan dari Kota Tanpa Nama",
    status: "Draft",
    views: "-",
    likes: "-",
    comments: "-",
  },
];

const timeRanges = [
  "7 hari terakhir",
  "30 hari terakhir",
  "1 tahun terakhir",
];

export const AuthorDashboard: React.FC<AuthorDashboardProps> = ({
  stats = defaultStats,
  articles = defaultArticles,
  onEditArticle,
  className = "",
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7 hari terakhir");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Semua" | "Publikasi" | "Draft">("Semua");

  const filteredArticles = articles.filter((article) => {
    if (activeTab === "Publikasi") return article.status === "Publikasi";
    if (activeTab === "Draft") return article.status === "Draft";
    return true;
  });

  return (
    <div className={`w-full max-w-[1247px] mx-auto p-[10px] font-['Poppins'] ${className}`}>
      <div className="w-full flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B4E46]">
            Dashboard
          </h1>

          {/* Time Range Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-[280px] md:w-[368px] h-10 px-6 border border-[#1B4E46] rounded-md flex items-center justify-between text-[#1B4E46] font-bold text-base bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="flex-1 text-center">{selectedTimeRange}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#146C5D] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-[280px] md:w-[368px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-1 flex flex-col gap-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setSelectedTimeRange(range);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full h-10 px-4 rounded-md font-bold text-base text-left hover:bg-gray-100 transition-colors cursor-pointer ${
                      selectedTimeRange === range
                        ? "text-[#146C5D] bg-[#146C5D]/10"
                        : "text-[#1B4E46]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="w-full h-[186px] p-4 border border-gray-300 rounded-md flex flex-col justify-between bg-white shadow-sm"
            >
              <span className="text-base font-normal text-[#1B4E46]">
                {stat.label}
              </span>

              <div className="text-4xl md:text-[48px] font-bold text-[#1B4E46] leading-none">
                {stat.value}
              </div>

              <div className="h-8 flex items-center">
                {stat.change ? (
                  <div
                    className={`flex items-center gap-1 text-base font-normal ${
                      stat.isPositive ? "text-[#1B4E46]" : "text-[#D97706]"
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUp className="w-5 h-5 text-[#1B4E46]" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-[#D97706]" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                ) : (
                  <span className="text-base font-normal text-[#1B4E46]">
                    {stat.subtitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Articles Table Section */}
        <div className="w-full flex flex-col gap-[40px]">
          {/* Article Header & Filter Tabs */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#1B4E46]">
              Semua artikel
            </h2>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2.5">
              {(["Semua", "Publikasi", "Draft"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-base font-medium transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#146C5D] text-white"
                      : "border border-[#1B4E46] text-[#1B4E46] hover:bg-[#1B4E46]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-[#146C5D]/16 h-[50px]">
                  <th className="px-6 py-3 text-xl font-bold text-[#1B4E46]">
                    Artikel
                  </th>
                  <th className="px-4 py-3 text-xl font-bold text-[#1B4E46] text-center w-[120px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xl font-bold text-[#1B4E46] text-center w-[100px]">
                    Views
                  </th>
                  <th className="px-4 py-3 text-xl font-bold text-[#1B4E46] text-center w-[100px]">
                    Likes
                  </th>
                  <th className="px-4 py-3 text-xl font-bold text-[#1B4E46] text-center w-[100px]">
                    Komen
                  </th>
                  <th className="px-6 py-3 text-xl font-bold text-[#1B4E46] text-center w-[80px]">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-t border-gray-200 h-[52px] hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-3 text-base font-normal text-[#1B4E46]">
                      {article.title}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-sm font-normal ${
                          article.status === "Publikasi"
                            ? "bg-[#146C5D]/50 text-[#1B4E46]"
                            : "bg-[rgba(16,29,19,0.16)] text-[#162D13]/75"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-base font-normal text-[#1B4E46] text-center">
                      {article.views}
                    </td>
                    <td className="px-4 py-3 text-base font-normal text-[#1B4E46] text-center">
                      {article.likes}
                    </td>
                    <td className="px-4 py-3 text-base font-normal text-[#1B4E46] text-center">
                      {article.comments}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => onEditArticle?.(article)}
                        className="text-[#1B4E46] hover:opacity-70 transition-opacity p-1 cursor-pointer"
                        title="Edit artikel"
                      >
                        <Edit3 className="w-5 h-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

AuthorDashboard.displayName = "AuthorDashboard";

export default AuthorDashboard;