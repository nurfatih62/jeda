import { faker } from "@faker-js/faker";

import type { ArticleCardData } from "@/shared/components/organism/article-card/article-card";

export function generateMockArticles(): ArticleCardData[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),

    author: faker.person.fullName(),

    date: faker.date.recent({ days: 30 }).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),

    title: faker.lorem.sentence(),

    description: faker.lorem.paragraph(),

    likes: faker.number.int({
      min: 0,
      max: 1000,
    }),

    comments: faker.number.int({
      min: 0,
      max: 300,
    }),

    avatarUrl: faker.image.avatar(),

    imageUrl: faker.image.urlLoremFlickr({
      category: "nature",
    }),
  }));
}