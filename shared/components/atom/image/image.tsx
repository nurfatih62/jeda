import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  radius?: number;
}

export function Image({ radius = 8, className = '', style, ...rest }: ImageProps) {
  return (
    <img
      className={`block h-full w-full object-cover ${className}`}
      style={{ borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
