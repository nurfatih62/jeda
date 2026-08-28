import { faker } from '@faker-js/faker';
import type { ArticleCardData } from '../shared/components/organism/article-card/article-card';

const COVER_TOPICS = ['nature', 'business', 'technology', 'people', 'city', 'fitness'] as const;

function formatDateID(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function randomAvatar(): string {
  const sex = faker.helpers.arrayElement(['men', 'women'] as const);
  const id = faker.number.int({ min: 0, max: 99 });
  return `https://randomuser.me/api/portraits/${sex}/${id}.jpg`;
}

function randomCover(): string {
  const topic = faker.helpers.arrayElement(COVER_TOPICS);
  const seed = faker.string.alphanumeric(10);
  // lock=<seed acak> supaya tiap generate dapat gambar berbeda, bukan cache yang sama
  return `https://loremflickr.com/600/400/${topic}?lock=${seed}`;
}

interface RawArticle extends Omit<ArticleCardData, 'date' | 'trendPercent'> {
  dateObj: Date;
}

function baseArticle(): RawArticle {
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    avatarUrl: randomAvatar(),
    dateObj: faker.date.recent({ days: 60 }),
    title: faker.lorem.sentence({ min: 4, max: 8 }).replace(/\.$/, ''),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    imageUrl: randomCover(),
    likes: faker.number.int({ min: 5, max: 500 }),
    comments: faker.number.int({ min: 0, max: 60 }),
  };
}

/**
 * Data untuk tab "Populer" — disortir dari like terbanyak,
 * tiap artikel dapat badge tren "+X%".
 */
export function generatePopularArticles(count = 6): ArticleCardData[] {
  const raw = Array.from({ length: count }, () => ({
    ...baseArticle(),
    likes: faker.number.int({ min: 150, max: 900 }),
  }));

  return raw
    .sort((a, b) => b.likes - a.likes)
    .map(({ dateObj, ...rest }) => ({
      ...rest,
      date: formatDateID(dateObj),
      trendPercent: faker.number.float({ min: 1, max: 35, fractionDigits: 1 }),
    }));
}

/**
 * Data untuk tab "Terbaru" — disortir dari tanggal paling baru,
 * tanpa badge tren.
 */
export function generateLatestArticles(count = 6): ArticleCardData[] {
  const raw = Array.from({ length: count }, () => baseArticle());

  return raw
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
    .map(({ dateObj, ...rest }) => ({
      ...rest,
      date: formatDateID(dateObj),
    }));
}

/**
 * Pool artikel umum (belum disortir) — dipakai homepage yang
 * melakukan sorting sendiri berdasarkan tab aktif.
 */
export function generateMockArticles(count = 12): ArticleCardData[] {
  const raw = Array.from({ length: count }, () => baseArticle());

  return raw.map(({ dateObj, ...rest }) => ({
    ...rest,
    date: formatDateID(dateObj),
  }));
}
