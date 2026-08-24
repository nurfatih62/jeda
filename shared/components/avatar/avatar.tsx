import React, { useState } from "react";
import Image from "next/image";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: React.ReactNode;
}

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const showFallback = !src || imageError;

  return (
    <div
        className={`
        ${sizeClass[size]}
        relative
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-(--primary-hover-bg)
        text-(--primary-clicked)
        font-medium
        `}
    >
      {showFallback ? (
        fallback
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}