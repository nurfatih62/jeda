import { faker } from '@faker-js/faker';
import type { ArticleCardData } from '../shared/components/organism/article-card/article-card';

const COVER_TOPICS = ['nature', 'business', 'technology', 'people', 'city', 'fitness'] as const;

/**
 * Bank judul + deskripsi Bahasa Indonesia (tema reflektif/wellness sesuai
 * brand Jeda).
 */
const ARTICLE_TOPICS: { title: string; description: string }[] = [
  {
    title: 'Pengaruh nikotin',
    description:
      'Nikotin memengaruhi suasana hati dan pola tidur lebih dari yang kita sadari. Simak dampaknya bagi kesehatan mental sehari-hari.',
  },
  {
    title: 'Tips olahraga di pagi hari',
    description:
      'Olahraga pagi terbukti meningkatkan fokus dan energi sepanjang hari. Berikut rutinitas sederhana yang bisa kamu coba mulai besok.',
  },
  {
    title: 'Mengelola stres di tempat kerja',
    description:
      'Tekanan kerja yang menumpuk bisa memengaruhi kesehatan mental. Kenali tanda-tandanya dan cara mengatasinya sebelum terlambat.',
  },
  {
    title: 'Kebiasaan tidur yang lebih sehat',
    description:
      'Kualitas tidur memengaruhi produktivitas dan mood harian. Ini beberapa kebiasaan kecil yang bisa memperbaiki kualitas tidurmu.',
  },
  {
    title: 'Belajar menerima diri sendiri',
    description:
      'Penerimaan diri adalah langkah pertama menuju ketenangan batin. Yuk mulai perjalanan self-love dari hal-hal kecil.',
  },
  {
    title: 'Manfaat journaling setiap hari',
    description:
      'Menulis jurnal membantu memproses emosi dan menjernihkan pikiran. Simak cara memulai kebiasaan journaling yang konsisten.',
  },
  {
    title: 'Cara mengatur waktu dengan efektif',
    description:
      'Manajemen waktu yang baik bisa mengurangi rasa kewalahan. Berikut teknik sederhana untuk mengatur prioritas harianmu.',
  },
  {
    title: 'Pentingnya me time bagi kesehatan mental',
    description:
      'Meluangkan waktu untuk diri sendiri bukan tindakan egois. Ini alasan kenapa me time penting untuk keseimbangan hidup.',
  },
  {
    title: 'Tips menjaga pola makan sehat',
    description:
      'Pola makan yang seimbang berpengaruh besar pada energi dan mood. Simak tips praktis menjaga asupan gizi harianmu.',
  },
  {
    title: 'Membangun hubungan yang lebih sehat',
    description:
      'Komunikasi yang jujur jadi kunci hubungan yang langgeng. Pelajari cara membangun batasan yang sehat dengan orang terdekat.',
  },
  {
    title: 'Mengenal tanda-tanda burnout',
    description:
      'Burnout sering datang tanpa disadari hingga berdampak serius. Kenali gejalanya sejak dini agar bisa segera diatasi.',
  },
  {
    title: 'Manfaat meditasi bagi pikiran',
    description:
      'Meditasi singkat setiap hari bisa menenangkan pikiran yang penuh. Ini panduan sederhana untuk pemula yang ingin mencoba.',
  },
  {
    title: 'Cara mengatasi rasa cemas berlebih',
    description:
      'Rasa cemas yang berlarut bisa mengganggu keseharian. Berikut beberapa cara praktis untuk meredakannya secara mandiri.',
  },
  {
    title: 'Pentingnya istirahat dari media sosial',
    description:
      'Terlalu sering scrolling bisa memengaruhi kesehatan mental. Coba digital detox dan rasakan perbedaannya pada dirimu.',
  },
  {
    title: 'Menemukan makna dalam rutinitas harian',
    description:
      'Rutinitas yang monoton bisa terasa lebih bermakna dengan sedikit refleksi. Simak cara menemukan makna di balik hal-hal kecil.',
  },
  {
    title: 'Tips healing tanpa harus jauh-jauh',
    description: 'Healing tidak selalu harus liburan panjang. Berikut cara sederhana menenangkan pikiran dari rumah.',
  },
  {
    title: 'Belajar mengatakan tidak dengan tenang',
    description:
      'Menetapkan batasan adalah bentuk self-respect. Ini cara mengatakan tidak tanpa rasa bersalah berlebihan.',
  },
  {
    title: 'Manfaat menulis rasa syukur',
    description:
      'Mencatat hal-hal kecil yang disyukuri bisa memperbaiki mood harian. Coba mulai gratitude journal mulai hari ini.',
  },
];

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
  return `https://loremflickr.com/600/400/${topic}?lock=${seed}`;
}

interface RawArticle extends Omit<ArticleCardData, 'date' | 'trendPercent'> {
  dateObj: Date;
}

function baseArticle(): RawArticle {
  const topic = faker.helpers.arrayElement(ARTICLE_TOPICS);
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    avatarUrl: randomAvatar(),
    dateObj: faker.date.recent({ days: 60 }),
    title: topic.title,
    description: topic.description,
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
 * Mengambil satu artikel spesifik berdasarkan ID untuk halaman Detail Artikel.
 * Memastikan artikel yang diklik di Homepage cocok dengan data detail yang dibuka.
 */
export function getArticleById(id: string, page = 1): ArticleCardData & { contentParagraphs?: string[] } {
  const allArticles = [...generatePopularArticles(30), ...generateLatestArticles(30)];
  const found = allArticles.find((art) => art.id === id);

  const baseData = found || {
    id: id,
    author: "Asya mc",
    avatarUrl: randomAvatar(),
    date: "15 Agustus 2026",
    title: "Artikel Pilihan",
    description: "Pembahasan mendalam mengenai pentingnya menjaga keseimbangan hidup dan kesehatan mental di era modern.",
    imageUrl: randomCover(),
    likes: 237,
    comments: 12,
  };

  // Variasi paragraf berdasarkan halaman (page 1, 2, atau 3)
  let paragraphs: string[] = [];
  if (page === 1) {
    paragraphs = [
      `${baseData.description} Hal ini sering kali menjadi topik perbincangan hangat di kalangan pemerhati kesehatan mental dan pengembangan diri.`,
      `Dalam praktiknya, topik mengenai "${baseData.title}" membutuhkan konsistensi serta pemahaman mendalam tentang batasan diri sendiri. Banyak orang mengabaikan tanda-tanda kecil hingga akhirnya berdampak pada produktivitas harian.`,
      `Melalui langkah-langkah kecil yang konsisten, kita dapat membangun kebiasaan baru yang lebih positif. Mulailah dari hari ini dan rasakan perubahan signifikan pada kesejahteraan hidupmu secara menyeluruh.`
    ];
  } else if (page === 2) {
    paragraphs = [
      `Bagian kedua dari pembahasan "${baseData.title}" ini akan mengupas lebih dalam mengenai faktor-faktor pemicu eksternal yang sering kali luput dari perhatian kita sehari-hari.`,
      `Menurut berbagai penelitian psikologi modern, pendekatan yang fleksibel jauh lebih efektif daripada memaksakan standar yang terlalu ketat pada diri sendiri.`,
      `Luangkan waktu sejenak untuk melakukan refleksi diri. Tanyakan pada diri sendiri: apa hal kecil yang bisa diperbaiki mulai minggu ini?`
    ];
  } else {
    paragraphs = [
      `Sebagai kesimpulan dari ulasan mengenai "${baseData.title}", penting untuk diingat bahwa proses pemulihan atau pengembangan diri bukanlah perlombaan yang harus dimenangkan dengan cepat.`,
      `Konsistensi kecil setiap hari jauh lebih bermakna daripada perubahan drastis yang hanya bertahan sementara waktu. Tetaplah berbelas kasih pada diri sendiri.`,
      `Terima kasih telah membaca artikel ini sampai selesai. Jangan lupa bagikan kepada orang terdekat yang mungkin membutuhkan sudut pandang serupa!`
    ];
  }

  return {
    ...baseData,
    contentParagraphs: paragraphs,
  };
}
export interface CommentItemData {
  id: string;
  author: string;
  avatarUrl: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
}

/**
 * Menghasilkan daftar komentar unik berdasarkan ID artikel agar komentarnya berbeda-beda tiap artikel.
 */
export function getCommentsByArticleId(id: string): CommentItemData[] {
  // Gunakan ID atau string acak untuk variasi jumlah & isi komentar
  const commentPool = [
    "Artikel yang sangat membuka pikiran! Terima kasih sudah berbagi tips bermanfaat ini.",
    "Sangat relate dengan kondisi yang sedang aku alami sekarang. Izin share ya!",
    "Penjelasannya sangat padat dan mudah dipahami. Ditunggu artikel-artikel menarik lainnya.",
    "Wah, poin nomor dua bener banget sih. Sering banget nggak sadar kalau lagi di posisi itu.",
    "Makasih infonya min, sangat membantu buat manajemen stres harian.",
    "Keren banget pembahasannya,, jadi lebih paham cara menghadapinya.",
  ];

  // Tentukan jumlah komentar secara konsisten berdasarkan panjang ID atau random terkontrol
  const commentCount = 2 + (id.length % 3); // Menghasilkan 2 sampai 4 komentar unik per artikel

  return Array.from({ length: commentCount }, (_, index) => {
    return {
      id: `${id}-comment-${index}`,
      author: faker.person.fullName(),
      avatarUrl: randomAvatar(),
      date: `${faker.number.int({ min: 1, max: 28 })} Agustus 2026`,
      content: commentPool[(id.charCodeAt(index % id.length) + index) % commentPool.length],
      likes: faker.number.int({ min: 1, max: 45 }),
      comments: faker.number.int({ min: 0, max: 5 }),
    };
  });
}