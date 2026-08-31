import Link from 'next/link';

export interface TopicTagProps {
  label: string;
  href: string;
  active?: boolean;
}

/** Pill filter topik. Navigasi lewat href (?topic=...), bukan onClick client-side. */
export function TopicTag({ label, href, active = false }: TopicTagProps) {
  return (
    <Link
      href={href}
      className={`font-sans inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-9.75 py-2 text-base font-medium transition-colors ${
        active
          ? 'bg-primary text-white hover:bg-primary-hover'
          : 'border border-primary text-primary hover:bg-primary-overlay-hover'
      }`}
    >
      {label}
    </Link>
  );
}
