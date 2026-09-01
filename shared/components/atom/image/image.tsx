import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  radius?: string | number;
}

export function Image({ 
  radius = 'var(--radius-md)', 
  className = '', 
  style, 
  ...rest 
}: ImageProps) {
  // Menangani jika prop radius berupa angka (dikonversi ke px) atau string token
  const resolvedRadius = typeof radius === 'number' ? `${radius}px` : radius;

  return (
    <img
      className={`block h-full w-full object-cover ${className}`}
      style={{ borderRadius: resolvedRadius, ...style }}
      {...rest}
    />
  );
}