export interface AuthorMetaProps {
  author: string;
  date: string;
}

export function AuthorMeta({ author, date }: AuthorMetaProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-sans text-sm font-bold leading-7 text-text-muted">
        {author}
      </span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
      <span className="font-sans text-sm font-medium leading-7 text-text-muted">
        {date}
      </span>
    </div>
  );
}
