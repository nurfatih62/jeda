"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TopicTag } from "../../molecule/topic-tag/topic-tag";

export interface TopicTagsProps {
  topics: string[];
  activeTopic: string;
  /** Path dasar buat bikin href, default "/explore" */
  basePath?: string;
}

export function TopicTags({ topics, activeTopic, basePath = "/explore" }: TopicTagsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fungsi pembantu untuk membangun URL dengan pengaman searchParams null
  const createHref = (topicName: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    
    if (topicName === "Semua") {
      params.delete("topic"); // Hapus parameter topic jika "Semua"
    } else {
      params.set("topic", topicName);
    }

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // Menggunakan native addEventListener dengan { passive: false } 
  // agar e.preventDefault() tidak diabaikan oleh browser modern.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // Mencegah halaman utama ikut scroll ke atas/bawah
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setDragStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const el = scrollRef.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - dragStartX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    },
    [isDragging, dragStartX, scrollLeft],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex items-center h-tag-container w-full gap-md overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {topics.map((topic) => (
        <TopicTag
          key={topic}
          label={topic}
          href={createHref(topic)}
          active={activeTopic === topic}
        />
      ))}
    </div>
  );
}