import React, { useState } from 'react';
import { ProgressBar } from "@/shared/atoms/progress-bar/progress-bar";

export interface CategoryItem {
  id: string;
  name: string;
  articleCount: number;
  isActive: boolean;
}

export interface PopularTagItem {
  id: string;
  name: string;
  count: number;
}

export interface CategoryManagementSectionProps {
  title?: string;
  categoryListTitle?: string;
  popularTagsTitle?: string;
  categories?: CategoryItem[];
  popularTags?: PopularTagItem[];
  onToggleCategory?: (id: string, newStatus: boolean) => void;
}

const defaultCategories: CategoryItem[] = [
  { id: '1', name: 'Opini', articleCount: 342, isActive: true },
  { id: '2', name: 'Menulis', articleCount: 512, isActive: true },
  { id: '3', name: 'Gaya hidup', articleCount: 264, isActive: true },
  { id: '4', name: 'AI', articleCount: 59, isActive: false },
  { id: '5', name: 'Makanan', articleCount: 108, isActive: true },
  { id: '6', name: 'Teknologi', articleCount: 102, isActive: true },
];

const defaultPopularTags: PopularTagItem[] = [
  { id: '1', name: 'Menulis', count: 512 },
  { id: '2', name: 'Opini', count: 342 },
  { id: '3', name: 'Gaya hidup', count: 264 },
  { id: '4', name: 'Makanan', count: 108 },
];

export const CategoryManagementSection: React.FC<CategoryManagementSectionProps> = ({
  title = 'Kategori',
  categoryListTitle = 'Kategori artikel',
  popularTagsTitle = 'Tag terpopuler',
  categories = defaultCategories,
  popularTags = defaultPopularTags,
  onToggleCategory,
}) => {
  const [categoryState, setCategoryState] = useState<CategoryItem[]>(categories);

  const handleToggle = (id: string) => {
    const updated = categoryState.map((cat) => {
      if (cat.id === id) {
        const nextStatus = !cat.isActive;
        if (onToggleCategory) onToggleCategory(id, nextStatus);
        return { ...cat, isActive: nextStatus };
      }
      return cat;
    });
    setCategoryState(updated);
  };

  // Mencari jumlah maksimum tag untuk persentase progress bar
  const maxTagCount = Math.max(...popularTags.map((tag) => tag.count), 1);

  return (
    <section className="w-full max-w-[1256px] p-2.5 font-['Poppins',sans-serif]">
      {/* Main Header */}
      <h1 className="text-[36px] font-bold leading-[26px] text-[#146C5D] mb-10">
        {title}
      </h1>

      {/* Main Grid Content */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[103px] items-start">
        
        {/* Left Side: Kategori Artikel */}
        <div className="w-full lg:w-[627px] flex flex-col gap-[20px]">
          <h2 className="text-[32px] font-bold leading-[26px] text-[#146C5D]">
            {categoryListTitle}
          </h2>

          <div className="w-full border border-[#146C5D]/20 rounded-[6px] p-6 flex flex-col gap-[17px] bg-white shadow-sm">
            {categoryState.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full min-h-[67px] gap-4"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className="text-[24px] font-bold leading-[26px] text-gray-900">
                    {item.name}
                  </span>
                  <span className="text-[20px] font-normal leading-[26px] text-gray-600">
                    {item.articleCount} artikel
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-pressed={item.isActive}
                  className={`relative inline-flex h-[32px] w-[64px] shrink-0 cursor-pointer rounded-full p-[4px] transition-colors duration-200 ease-in-out border focus:outline-none focus:ring-2 focus:ring-[#146C5D] ${
                    item.isActive
                      ? 'bg-[#146C5D] border-[#146C5D]/20 justify-end'
                      : 'bg-[#6B7280] border-[#6B7280]/20 justify-start'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      item.isActive ? 'translate-x-0' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Tag Terpopuler */}
        <div className="w-full lg:w-[506px] flex flex-col gap-[30px]">
          <h2 className="text-[32px] font-bold leading-[26px] text-[#146C5D]">
            {popularTagsTitle}
          </h2>

          <div className="w-full border border-[#146C5D]/20 rounded-[6px] p-6 flex flex-col gap-6 bg-white shadow-sm">
            {popularTags.map((tag) => {
              const percentage = Math.min((tag.count / maxTagCount) * 100, 100);

              return (
                <div key={tag.id} className="flex flex-col gap-[8px] w-full">
                  <div className="flex justify-between items-center w-full text-[24px] leading-[26px]">
                    <span className="font-bold text-gray-900">{tag.name}</span>
                    <span className="font-normal text-gray-800">{tag.count}</span>
                  </div>

                  {/* Progress Bar → atom ProgressBar */}
                  <ProgressBar value={percentage} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CategoryManagementSection;