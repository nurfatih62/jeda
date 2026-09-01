export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-[32px] h-[32px]',   // Menggunakan token/nilai konsisten
  md: 'w-[40px] h-[40px]', 
  lg: 'w-[48px] h-[48px]',
};

const DEFAULT_AVATAR_SRC =
  'https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg';
const DEFAULT_AVATAR_ALT = 'Nuf';

export function Avatar({ src = DEFAULT_AVATAR_SRC, alt = DEFAULT_AVATAR_ALT, size = 'md' }: AvatarProps) {
  const sizeClass = sizeMap[size];
  
  return (
    <img
      src={src}
      alt={alt}
      className={`shrink-0 rounded-full object-cover ${sizeClass}`}
    />
  );
}