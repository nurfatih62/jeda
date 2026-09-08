export interface LogoProps {
  size?: number;
}

export function Logo({ size = 24 }: LogoProps) {
  return (
    <span
      className="font-serif shrink-0 font-bold text-primary"
      style={{ fontSize: size, lineHeight: `${size + 4}px` }}
    >
      JEDA
    </span>
  );
}
