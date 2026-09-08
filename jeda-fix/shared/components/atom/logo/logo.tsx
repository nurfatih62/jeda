export interface LogoProps {
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  return (
    <div className="flex items-center shrink-0">
      <span
        className="font-serif font-bold text-primary tracking-wide block"
        style={{ fontSize: `${size}px`, lineHeight: '1' }}
      >
        JEDA
      </span>
    </div>
  );
}