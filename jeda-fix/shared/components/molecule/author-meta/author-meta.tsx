export interface AuthorMetaProps {
  author?: string | null;
  date: string;
  onAuthorClick?: (event: React.MouseEvent) => void;
}

export function AuthorMeta({ author, date, onAuthorClick }: AuthorMetaProps) {
  const authorName = author?.trim() || 'Pengguna';

  return (
    <div className="flex min-w-0 items-center gap-(--spacing-md)">
      <button
        type="button"
        onClick={onAuthorClick}
        className="font-sans shrink-0 whitespace-nowrap text-left text-sm font-bold leading-(--leading-normal) text-text-primary hover:underline"
      >
        {authorName}
      </button>
      <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
      <span className="font-sans text-sm font-medium leading-(--leading-normal) text-text-muted">
        {date}
      </span>
    </div>
  );
}