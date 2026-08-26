import React from "react";
import Image from "next/image";

import { Avatar } from "../../atom/avatar/avatar";
import { Typography } from "../../typography/typography";
import { AuthorMeta } from "../../molecule/author-meta/author-meta";
import { Engagement } from "../../molecule/engagement/engagement";
import { ArticleActions } from "../../molecule/article-actions/article-actions";

export interface ArticleCardProps {
  author: string;
  date: string;
  title: string;
  description: string;

  likes: number;
  comments: number;

  avatar?: string;
  image?: string;
}

export const ArticleCard = ({
  author,
  date,
  title,
  description,
  likes,
  comments,
  avatar,
  image,
}: ArticleCardProps) => {
  return (
    <article
      className="
        relative
        flex
        min-h-49.25
        gap-2
        border
        border-(--card-border)
        rounded-lg
        p-4.5
      "
    >
      {/* AVATAR */}
      <Avatar
        src={avatar}
        alt={author}
      />

      {/* CONTENT */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          gap-3.5
          pr-79
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2.25
          "
        >
          <AuthorMeta
            author={author}
            date={date}
          />

          <Typography variant="heading2">
            {title}
          </Typography>

          <Typography variant="body">
            {description}
          </Typography>
        </div>

        {/* ENGAGEMENT + ACTION */}
        <div className="flex items-center">
          <Engagement
            likes={likes}
            comments={comments}
          />

          <div className="flex-1" />

          <ArticleActions />
        </div>
      </div>

      {/* IMAGE */}
      {image && (
        <div
          className="
            absolute
            top-4
            right-4.5
            h-41.25
            w-74.75
            overflow-hidden
            rounded-lg
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>
      )}
    </article>
  );
};
