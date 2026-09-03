"use client";

import { Avatar } from "../../atom/avatar/avatar";
import { AuthorMeta } from "../author-meta/author-meta";

interface AuthorProfileLinkProps {
  author: string;
  username?: string;
  avatarUrl?: string;
  date: string;
}

export function AuthorProfileLink({
  author,
  username,
  avatarUrl,
  date,
}: AuthorProfileLinkProps) {
  function openProfile(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = `/profile?username=${encodeURIComponent(username || author)}`;
  }

  return (
    <>
      <button
        type="button"
        aria-label={`Lihat profil ${author}`}
        onClick={openProfile}
        className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Avatar src={avatarUrl} alt={author} size="md" />
      </button>
      <AuthorMeta author={author} date={date} onAuthorClick={openProfile} />
    </>
  );
}
