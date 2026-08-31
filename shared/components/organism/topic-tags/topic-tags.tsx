"use client";

import { useCallback, useRef, useState } from "react";
import { TopicTag } from "../../molecule/topic-tag/topic-tag";

export interface TopicTagsProps {
  topics: string[];
  activeTopic: string;
  /** Path dasar buat bikin href, default "/explore" */
  basePath?: string;
}

export function TopicTags({ topics, activeTopic, basePath = "/explore" }: TopicTagsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += e.deltaY;
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
      className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide select-none cursor-grab active:cursor-grabbing"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <TopicTag label="Semua" href={basePath} active={activeTopic === "Semua"} />
      {topics.map((topic) => (
        <TopicTag
          key={topic}
          label={topic}
          href={`${basePath}?topic=${encodeURIComponent(topic)}`}
          active={activeTopic === topic}
        />
      ))}
    </div>
  );
}