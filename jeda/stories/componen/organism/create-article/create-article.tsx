"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import {
  ArrowLeft,
  ImagePlus,
  X,
  Bold,
  Italic,
  Underline,
  Link,
  Quote,
  Code,
  Image as ImageIcon,
} from "lucide-react";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface CreateArticleProps {
  categories?: CategoryOption[];
  onBack?: () => void;
  onSaveDraft?: (data: ArticleData) => void;
  onPublish?: (data: ArticleData) => void;
  className?: string;
}

export interface ArticleData {
  title: string;
  description: string;
  coverImage: File | null;
  coverImagePreview: string | null;
  selectedCategories: string[];
  content: string;
}

const defaultCategoryOptions: CategoryOption[] = [
  { id: "1", name: "Desain UI/UX" },
  { id: "2", name: "Teknologi" },
  { id: "3", name: "Pemrograman" },
  { id: "4", name: "Karir" },
  { id: "5", name: "Gaya Hidup" },
];

export const CreateArticle: React.FC<CreateArticleProps> = ({
  categories = defaultCategoryOptions,
  onBack,
  onSaveDraft,
  onPublish,
  className = "",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Maximum character limits
  const maxTitleLength = 100;
  const maxDescLength = 150;

  // Handle Cover Image Upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran berkas melebihi 5 MB.");
        return;
      }
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Category Selection (Min 1, Max 3)
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      if (selectedCategories.length >= 3) {
        alert("Maksimal pilih 3 kategori.");
        return;
      }
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Text Formatting Helpers
  const applyFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  // Word count helper
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // Form Data Object
  const getArticleData = (): ArticleData => ({
    title,
    description,
    coverImage,
    coverImagePreview,
    selectedCategories,
    content,
  });

  return (
    <div
      className={`w-full max-w-[1068px] mx-auto flex flex-col items-center gap-[37px] font-['Poppins'] ${className}`}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between py-2 border-b border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          title="Kembali"
        >
          <ArrowLeft className="w-6 h-6 text-[#1B4E46]" />
        </button>

        <div className="flex items-center gap-[440px]">
          <span className="text-base font-medium text-gray-500 font-['Poppins']">
            Tersimpan otomatis 2 menit lalu
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onSaveDraft?.(getArticleData())}
              className="px-4 py-2 border border-[#146C5D] text-[#146C5D] font-medium text-base rounded-md hover:bg-[#146C5D]/10 transition-colors cursor-pointer"
            >
              Simpan draft
            </button>
            <button
              type="button"
              onClick={() => onPublish?.(getArticleData())}
              className="px-4 py-2 bg-[#146C5D] text-white font-medium text-base rounded-md hover:bg-[#1B4E46] transition-colors cursor-pointer shadow-sm"
            >
              Terbitkan
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image Upload Section */}
      <div className="w-full flex flex-col gap-1">
        <div className="w-full h-[525px] rounded-md bg-[rgba(16,29,19,0.16)] flex flex-col items-center justify-center relative overflow-hidden group">
          {coverImagePreview ? (
            <>
              <img
                src={coverImagePreview}
                alt="Sampul Artikel"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                title="Hapus gambar"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-4 cursor-pointer w-full h-full"
            >
              <ImagePlus className="w-[91px] h-[91px] text-[#1B4E46]" />
              <span className="font-['Nunito'] text-2xl font-medium text-[#1B4E46]">
                Tambah gambar sampul (16:9)
              </span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <span className="text-sm font-medium text-[#1B4E46]/75">
          JPG, PNG, atau WebP. Maks. 5 MB.
        </span>
      </div>

      {/* Title Input Section */}
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-3xl font-bold text-[#1B4E46]">Judul</h2>
        <div className="relative w-full">
          <input
            type="text"
            value={title}
            maxLength={maxTitleLength}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tulis judul di sini.."
            className="w-full h-[100px] px-[30px] border border-[#1B4E46]/50 rounded-[16px] text-xl text-[#1B4E46] placeholder:text-[#1B4E46]/50 focus:outline-none focus:border-[#146C5D] font-normal"
          />
        </div>
        <div className="text-right text-sm font-medium font-['Nunito'] text-[#1B4E46]/50">
          {title.length}/{maxTitleLength}
        </div>
      </div>

      {/* Description Input Section */}
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-2xl font-bold text-[#1B4E46]">Deskripsi</h2>
        <div className="relative w-full">
          <textarea
            value={description}
            maxLength={maxDescLength}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tulis deskripsi singkat di sini.."
            rows={3}
            className="w-full h-[136px] p-[30px] border border-[#1B4E46]/50 rounded-[16px] text-xl text-[#1B4E46] placeholder:text-[#1B4E46]/50 focus:outline-none focus:border-[#146C5D] font-normal resize-none"
          />
        </div>
        <div className="text-right text-sm font-medium font-['Nunito'] text-[#1B4E46]/50">
          {description.length}/{maxDescLength}
        </div>
      </div>

      {/* Category Selection Section */}
      <div className="w-full flex flex-col gap-3 py-4 border-t border-[#1B4E46]">
        <h2 className="text-2xl font-bold text-[#1B4E46]">Kategori:</h2>
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-base font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#146C5D] text-white"
                    : "border border-[#1B4E46]/30 text-[#1B4E46] hover:border-[#1B4E46]"
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <X className="w-4 h-4 rotate-45" />}
              </button>
            );
          })}
        </div>
        <span className="text-sm font-medium text-[#1B4E46]/75">
          Pilih minimal 1 dan maksimal 3 untuk kategori
        </span>
      </div>

      {/* Article Content & Formatting Toolbar */}
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#1B4E46]">Isi</h2>

        {/* Text Formatting Tools */}
        <div className="flex items-center gap-8 py-2">
          {/* Bold, Italic, Underline */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => applyFormat("**", "**")}
              className="text-[#1B4E46] hover:opacity-75 font-bold"
              title="Cetak Tebal"
            >
              <Bold className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormat("*", "*")}
              className="text-[#1B4E46] hover:opacity-75 italic"
              title="Cetak Miring"
            >
              <Italic className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormat("<u>", "</u>")}
              className="text-[#1B4E46] hover:opacity-75 underline"
              title="Garis Bawah"
            >
              <Underline className="w-5 h-5" />
            </button>
          </div>

          {/* Separator Line */}
          <div className="w-px h-6 bg-[#1B4E46]" />

          {/* Link, Quote, Code, Image Insertion */}
          <div className="flex items-center gap-6 text-[#1B4E46]">
            <button
              type="button"
              onClick={() => applyFormat("[judul link](", ")")}
              className="hover:opacity-75"
              title="Tambah Tautan"
            >
              <Link className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormat("> ")}
              className="hover:opacity-75"
              title="Kutipan"
            >
              <Quote className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormat("`", "`")}
              className="hover:opacity-75"
              title="Kode"
            >
              <Code className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => applyFormat("![alt text](", ")")}
              className="hover:opacity-75"
              title="Sisipkan Gambar"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Mulai menulis artikel di sini..."
          rows={15}
          className="w-full h-[414px] p-[30px] border border-[#1B4E46]/50 rounded-[16px] text-xl text-[#1B4E46] placeholder:text-[#1B4E46]/50 focus:outline-none focus:border-[#146C5D] font-normal resize-none"
        />

        {/* Word Counter */}
        <div className="text-right text-sm font-medium font-['Nunito'] text-[#1B4E46]/50 py-1">
          {wordCount} kata
        </div>
      </div>
    </div>
  );
};

CreateArticle.displayName = "CreateArticle";

export default CreateArticle;