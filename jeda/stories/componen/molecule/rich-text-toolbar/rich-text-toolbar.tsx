"use client";

import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Quote,
  Code,
  Image as ImageIcon,
} from "lucide-react";
import { ToolbarButton } from "../../atom/toolbar-button/toolbar-button";

export interface RichTextToolbarProps {
  /** Dipanggil dengan (prefix, suffix) — logika format yang sama seperti di CreateArticle */
  onFormat?: (prefix: string, suffix?: string) => void;
  className?: string;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  onFormat,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-8 py-2 ${className}`}>
      <div className="flex items-center gap-6">
        <ToolbarButton title="Cetak Tebal" onClick={() => onFormat?.("**", "**")} className="font-bold">
          <Bold className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton title="Cetak Miring" onClick={() => onFormat?.("*", "*")} className="italic">
          <Italic className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton title="Garis Bawah" onClick={() => onFormat?.("<u>", "</u>")} className="underline">
          <Underline className="w-5 h-5" />
        </ToolbarButton>
      </div>

      <div className="w-px h-6 bg-[#1B4E46]" />

      <div className="flex items-center gap-6 text-[#1B4E46]">
        <ToolbarButton title="Tambah Tautan" onClick={() => onFormat?.("[judul link](", ")")}>
          <Link className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton title="Kutipan" onClick={() => onFormat?.("> ")}>
          <Quote className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton title="Kode" onClick={() => onFormat?.("`", "`")}>
          <Code className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton title="Sisipkan Gambar" onClick={() => onFormat?.("![alt text](", ")")}>
          <ImageIcon className="w-5 h-5" />
        </ToolbarButton>
      </div>
    </div>
  );
};

RichTextToolbar.displayName = "RichTextToolbar";

export default RichTextToolbar;
