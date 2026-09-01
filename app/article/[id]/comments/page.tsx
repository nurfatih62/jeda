import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AppShell } from '../../../../shared/components/organism/app-shell/app-shell';
import { Typography } from '../../../../shared/components/typography/typography';
import { IconButton } from '../../../../shared/components/atom/button/icon-button';
import { CommentInputBox } from '../../../../shared/components/molecule/comment-input-box/comment-input-box';
import { SortSelect } from '../../../../shared/components/molecule/sort-select/sort-select';
import { ArticleCommentsWrapper } from '../article-comments-wrapper';
import { fetchArticleById, fetchCommentsByArticleId } from '../../../../lib/api';

export interface ArticleCommentsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ commentSort?: string }>;
}

async function getAuthStatus() {
  const isLoggedIn = false; 
  return isLoggedIn;
}

export default async function ArticleCommentsPage({ params }: ArticleCommentsPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || '';

  const article = await fetchArticleById(id);
  const comments = await fetchCommentsByArticleId(id);
  const isLoggedIn = await getAuthStatus();

  if (!article) {
    return (
      <AppShell activeSidebarKey="home">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Typography variant="heading">Artikel tidak ditemukan.</Typography>
          <Link href="/homepage">
            <span className="text-primary underline">Kembali ke Beranda</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeSidebarKey="home">
      <div className="bg-background w-full px-17-5 pt-top pb-12-5 text-text-primary">
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs mx-auto">
          
          {/* Tombol Kembali ke Artikel Utama */}
          <div>
            <Link href={`/article/${id}`}>
              <IconButton
                variant="ghost"
                aria-label="Kembali ke artikel"
                icon={<ArrowLeft size={24} strokeWidth={2} />}
              />
            </Link>
          </div>

          {/* Header & Form Komentar */}
          <div className="flex flex-col gap-6 w-full">
            <Typography variant="heading" className="text-[32px] leading-[40px] font-bold text-text-primary">
              Komentar ({comments.length})
            </Typography>

            <CommentInputBox placeholder="Note" isLoggedIn={isLoggedIn} />

            <div className="flex items-center justify-between w-full">
              <SortSelect 
                options={['Populer', 'Terbaru']} 
                paramName="commentSort" 
                defaultValue="Populer" 
                label="Urutkan komentar" 
              />
            </div>
          </div>

          {/* Render Daftar Komentar */}
          <div className="w-full mt-4">
            <ArticleCommentsWrapper comments={comments} />
          </div>

        </div>
      </div>
    </AppShell>
  );
}