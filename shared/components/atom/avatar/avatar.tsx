export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string; // Tambahan prop opsional untuk inisial manual
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'profile';
}

const sizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-[32px] h-[32px] text-[10px]', 
  md: 'w-[40px] h-[40px] text-xs', 
  lg: 'w-[48px] h-[48px] text-sm',
  xl: 'w-15 h-15 text-xs',
  profile: 'h-[186px] w-[186px] text-[51px]',
};

const DEFAULT_AVATAR_ALT = 'Nuf';

// Helper untuk otomatis mengambil inisial dari teks (contoh: "John Doe" -> "JD")
function getInitials(text?: string): string {
  if (!text) return '';
  const words = text.trim().split(' ').filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt = DEFAULT_AVATAR_ALT, initials, size = 'md' }: AvatarProps) {
  const sizeClass = sizeMap[size];
  const computedInitials = initials || getInitials(alt);
  const initialsClass = size === 'profile' ? 'font-semibold' : '';

  // Jika src tidak ada, tampilkan Inisial dengan styling dari desain Anda
  if (!src) {
    return (
      <div
        className={`shrink-0 rounded-full flex items-center justify-center font-semibold bg-[#D0E8E6] text-[#0FA6C1] ${sizeClass} ${initialsClass}`}
        style={{ fontFamily: 'Poppins, sans-serif' }}
        title={alt}
      >
        {computedInitials}
      </div>
    );
  }

  // Jika src tersedia, tampilkan gambar seperti biasa
  return (
    <img
      src={src}
      alt={alt}
      className={`shrink-0 rounded-full object-cover ${sizeClass}`}
    />
  );
}