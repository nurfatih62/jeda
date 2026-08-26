import React from "react";
import { Avatar } from "../../atom/avatar/avatar";

export interface AuthorMetaProps {
  author: string;
  date: string;
  showAvatar?: boolean;
  avatar?: string;
}

export const AuthorMeta = ({
  author,
  date,
  showAvatar = false,
  avatar,
}: AuthorMetaProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
        text-sm
        font-bold
        leading-7
        text-(--text-secondary)
      "
    >
      {showAvatar && (
        <Avatar
          src={avatar}
          alt={author}
        />
      )}

      <span>{author}</span>

      <span
        aria-hidden="true"
        className="
          h-1
          w-1
          shrink-0
          rounded-full
          bg-(--primary)
        "
      />

      <span className="font-medium">
        {date}
      </span>
    </div>
  );
};