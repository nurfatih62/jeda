import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AppShell } from '../../../shared/components/organism/app-shell/app-shell';
import { AuthorProfileLink } from '../../../shared/components/molecule/author-profile-link/author-profile-link';
import { ArticleFooterWrapper } from './article-footer-wrapper';
import { ArticleCommentsWrapper } from './article-comments-wrapper';
import { JoinCallout } from '../../../shared/components/molecule/join-callout/join-callout';
import { ArticlePagination } from './article-pagination';
import { IconButton } from '../../../shared/components/atom/button/icon-button';
import { Typography } from '../../../shared/components/typography/typography';
import { Button } from '../../../shared/components/atom/button/button';
import { fetchArticleById, fetchCommentsByArticleId } from '../../../lib/api';

export interface ArticleDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Fungsi helper untuk menentukan batas kata berdasarkan halaman (Kelipatan 150)
function getWordLimitForPage(page: number) {
  const maxWords = page * 150;
  const minWords = (page - 1) * 150;
  return { min: minWords, max: maxWords };
}

// Fungsi helper untuk memecah paragraf artikel berdasarkan target kelipatan kata
function getParagraphsForPage(paragraphs: string[], page: number) {
  if (!paragraphs || paragraphs.length === 0) return [];

  const targetLimit = getWordLimitForPage(page);
  const selectedParagraphs: string[] = [];
  let currentWordCount = 0;

  // Tentukan indeks awal paragraf berdasarkan halaman-halaman sebelumnya
  let startIndex = 0;
  for (let p = 1; p < page; p++) {
    const limit = getWordLimitForPage(p);
    let tempCount = 0;
    while (startIndex < paragraphs.length) {
      const wordsInPara = paragraphs[startIndex].split(/\s+/).length;
      if (tempCount + wordsInPara > limit.max && tempCount > 0) break;
      tempCount += wordsInPara;
      startIndex++;
    }
  }

  // Ambil paragraf untuk halaman aktif saat ini
  for (let i = startIndex; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const wordsInPara = para.split(/\s+/).length;

    if (currentWordCount + wordsInPara <= targetLimit.max || currentWordCount < targetLimit.min) {
      selectedParagraphs.push(para);
      currentWordCount += wordsInPara;
    } else {
      break;
    }
  }

  // Fallback jika halaman kosong tapi masih ada sisa paragraf
  if (selectedParagraphs.length === 0 && startIndex < paragraphs.length) {
    selectedParagraphs.push(paragraphs[startIndex]);
  }

  return selectedParagraphs;
}

export default async function ArticleDetailPage({ params, searchParams }: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  
  const id = resolvedParams?.id || '';
  const currentPage = Math.max(1, parseInt(resolvedSearch?.page || '1', 10));

  const article = await fetchArticleById(id);
  const comments = await fetchCommentsByArticleId(id);

  if (!article) {
    return (
      <AppShell activeSidebarKey="home">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Typography variant="heading">Artikel tidak ditemukan.</Typography>
          <Link href="/homepage"><Button variant="primary">Kembali ke Beranda</Button></Link>
        </div>
      </AppShell>
    );
  }

  const allParagraphs = article.contentParagraphs || [];
  const paginatedParagraphs = getParagraphsForPage(allParagraphs, currentPage);

  // Hitung total halaman secara dinamis agar berhenti di halaman terakhir yang memiliki isi
  let calculatedPages = 1;
  while (calculatedPages < allParagraphs.length) {
    const paragraphsForThisPage = getParagraphsForPage(allParagraphs, calculatedPages + 1);
    if (paragraphsForThisPage.length > 0) {
      calculatedPages++;
    } else {
      break;
    }
  }
  const totalPages = calculatedPages;

  return (
    <AppShell activeSidebarKey="home">
      <div className="bg-background w-full px-17-5 pt-top pb-12-5 text-text-primary">
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs mx-auto">
          
          {/* Tombol Kembali */}
          <div>
            <Link href="/homepage">
              <IconButton
                variant="ghost"
                aria-label="Kembali"
                icon={<ArrowLeft size={24} strokeWidth={2} />}
              />
            </Link>
          </div>

          {/* Header Artikel */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <AuthorProfileLink
                author={article.author}
                username={article.authorUsername}
                avatarUrl={article.avatarUrl}
                date={new Date(article.createdAt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="heading" className="text-[32px] leading-[40px] font-bold text-text-primary">
                {article.title}
              </Typography>
              <Typography variant="body" className="text-text-muted text-base leading-relaxed">
                {article.description}
              </Typography>
            </div>
          </div>

          {/* Gambar Artikel */}
          <div className="w-full overflow-hidden rounded-xl border border-swatch-border">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-125"
            />
          </div>

          {/* Paragraf Isi Artikel Sesuai Halaman */}
          <div className="flex flex-col gap-6 text-text-muted text-base leading-7 font-medium w-full">
            {paginatedParagraphs.length > 0 &&
              paginatedParagraphs.map((paragraf: string, index: number) => (
                <p key={index}>{paragraf}</p>
              ))}
          </div>

          {/* Pagination */}
          <ArticlePagination currentPage={currentPage} totalPages={totalPages} />

          {/* Join Callout */}
          <div className="w-full">
            <JoinCallout />
          </div>

          {/* Footer Actions */}
          <div className="w-full my-4">
            <ArticleFooterWrapper
              likes={article.likes}
              comments={comments.length}
            />
          </div>

          {/* Komentar (Menampilkan maksimal 2 komentar teratas) */}
          <div className="flex flex-col gap-4 mt-4 w-full">
            <Typography variant="heading" className="text-xl font-bold">
              Komentar ({comments.length})
            </Typography>
            <ArticleCommentsWrapper comments={comments.slice(0, 2)} />
          </div>

          {/* Tombol Lihat Lebih Banyak Komentar (Mengarahkan ke /article/[id]/comments) */}
          {comments.length > 2 && (
            <div className="flex justify-center pb-12 w-full pt-4">
              <Link href={`/article/${id}/comments`} className="w-full md:w-auto">
                <Button
                  variant="primary"
                  colorState="default"
                  className="w-full md:w-auto px-6 py-2.5 cursor-pointer"
                >
                  Lihat lebih banyak komentar ({comments.length})
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </AppShell>
  );
}