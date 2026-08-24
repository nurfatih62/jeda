import { Avatar } from "../../avatar/avatar";

export interface AuthorMetaProps {
  author: string;
  date: string;
  avatar?: string;
}

export function AuthorMeta({
  author,
  date,
  avatar,
}: AuthorMetaProps) {
  return (
    <div className="flex items-center gap-1.5">
        <Avatar
        src={avatar}
        alt={`Foto ${author}`}
        size="sm"
        fallback={author.charAt(0)}
        />

      <span className="text-[14px] font-bold leading-7 text-(--text-secondary)">
        {author}
      </span>

      <span
        className="h-1 w-1 shrink-0 rounded-full bg-(--primary)"
        aria-hidden="true"
      />

      <span className="text-[14px] font-medium leading-7 text-(--text-secondary)">
        {date}
      </span>
    </div>
  );
}