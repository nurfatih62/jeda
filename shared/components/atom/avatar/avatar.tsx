export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const DEFAULT_AVATAR_SRC =
  'https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg';
const DEFAULT_AVATAR_ALT = 'Nuf';

export function Avatar({ src = DEFAULT_AVATAR_SRC, alt = DEFAULT_AVATAR_ALT, size = 'md' }: AvatarProps) {
  const px = sizeMap[size];
  return (
    <img
      src={src}
      alt={alt}
      width={px}
      height={px}
      className="shrink-0 rounded-full object-cover"
      style={{ width: px, height: px }}
    />
  );
}
