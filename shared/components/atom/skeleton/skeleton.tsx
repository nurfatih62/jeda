export interface SkeletonProps {
  className?: string;
}

/** Placeholder loading generik. Kasih `className` buat atur ukuran & radius. */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-card-border/40 ${className}`} />;
}
