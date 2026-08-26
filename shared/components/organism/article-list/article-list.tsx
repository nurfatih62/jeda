import React from "react";

import {
  ArticleCard,
  type ArticleCardProps,
} from "../article-card/article-card";

export interface ArticleListProps {
  articles: ArticleCardProps[];
}

export const ArticleList = ({
  articles,
}: ArticleListProps) => {
  return (
    <section
      className="
        mx-auto
        flex
        w-full
        max-w-[1154px]
        flex-col
        gap-6
        pb-[60px]
      "
      aria-label="Daftar artikel"
    >
      {articles.map((article, index) => (
        <ArticleCard
          key={`${article.title}-${index}`}
          {...article}
        />
      ))}
    </section>
  );
};