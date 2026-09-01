import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AppShell } from '../../../shared/components/organism/app-shell/app-shell';
import { Avatar } from '../../../shared/components/atom/avatar/avatar';
import { AuthorMeta } from '../../../shared/components/molecule/author-meta/author-meta';
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
              <Avatar src={article.avatarUrl} size="md" />
              <AuthorMeta 
                author={article.author} 
                date={new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} 
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

          {/* Paragraf Isi Artikel */}
          <div className="flex flex-col gap-6 text-text-muted text-base leading-7 font-medium">
            {article.contentParagraphs && article.contentParagraphs.length > 0 ? (
              article.contentParagraphs.map((paragraf: string, index: number) => (
                <p key={index}>{paragraf}</p>
              ))
            ) : (
              <p>{article.description}</p>
            )}
          </div>

          {/* Pagination */}
          <ArticlePagination currentPage={currentPage} totalPages={3} />

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

          {/* Komentar (Dibatasi hanya 2 item teratas) */}
          <div className="flex flex-col gap-4 mt-4 w-full">
            <Typography variant="heading" className="text-xl font-bold">
              Komentar ({comments.length})
            </Typography>
            
            <ArticleCommentsWrapper comments={comments.slice(0, 2)} />
          </div>

          {/* Tombol Lihat Lebih Komentar (Hanya muncul jika komentar > 2) */}
          {comments.length > 2 && (
            <div className="flex justify-center pb-12 w-full pt-4">
              <Button
                variant="primary"
                colorState="default"
                className="w-full md:w-auto px-6 py-2.5 cursor-pointer"
              >
                Lihat lebih banyak komentar
              </Button>
            </div>
          )}

        </div>
      </div>
    </AppShell>
  );
}