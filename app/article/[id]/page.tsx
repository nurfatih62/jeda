"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '../../../shared/components/organism/app-shell/app-shell';
import { Avatar } from '../../../shared/components/atom/avatar/avatar';
import { AuthorMeta } from '../../../shared/components/molecule/author-meta/author-meta';
import { ArticleActions as ArticleFooterActions } from '../../../shared/components/molecule/article-actions/article-actions';
import { JoinCallout } from '../../../shared/components/molecule/join-callout/join-callout';
import { ArticleCommentItem } from '../../../shared/components/molecule/article-comment-item/article-comment-item';
import { Pagination } from '../../../shared/components/molecule/pagination/pagination';
import { IconButton } from '../../../shared/components/atom/button/icon-button';
import { Typography } from '../../../shared/components/typography/typography';
import { Button } from '../../../shared/components/atom/button/button';
import { getArticleById, getCommentsByArticleId } from '../../../lib/mock-data';

export default function ArticleDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || '';

  const [currentPage, setCurrentPage] = useState(1);

  // Ambil data artikel dan daftar komentar berdasarkan ID unik artikel tersebut
  const article = getArticleById(id, currentPage);
  const comments = getCommentsByArticleId(id);

  return (
    <AppShell activeSidebarKey="home">
      <div className="bg-background w-full px-17-5 pt-top pb-12-5 text-text-primary">
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs mx-auto">
          
          {/* Tombol Kembali ke Homepage */}
          <div>
            <Link href="/homepage">
              <IconButton
                variant="ghost"
                aria-label="Kembali"
                icon={<ArrowLeft size={24} strokeWidth={2} />}
                className="p-0 text-text-muted hover:text-primary"
              />
            </Link>
          </div>

          {/* Bagian Header Penulis & Judul Artikel */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <Avatar src={article.avatarUrl} size="md" />
              <AuthorMeta author={article.author} date={article.date} />
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

          {/* Gambar / Ilustrasi Utama Artikel */}
          <div className="w-full overflow-hidden rounded-xl border border-swatch-border">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-125"
            />
          </div>

          {/* Paragraf Isi Artikel Dinamis */}
          <div className="flex flex-col gap-6 text-text-muted text-base leading-7 font-medium">
            {article.contentParagraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Komponen Pagination Halaman Artikel */}
          <div className="flex justify-center my-4 w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={(page: number) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Callout Gabung (JoinCallout) */}
          <div className="w-full">
            <JoinCallout
              onRegister={() => console.log('Daftar diklik')}
              onLogin={() => console.log('Masuk diklik')}
            />
          </div>

          {/* Toolbar Footer Actions Utama Artikel */}
          <div className="w-full">
            <ArticleFooterActions
              likes={article.likes}
              comments={comments.length} // Menyesuaikan jumlah komentar dengan data dinamis
              onLikeClick={() => console.log('Like artikel')}
              onBookmarkClick={() => console.log('Bookmark artikel')}
              onShare={() => console.log('Share artikel')}
              onReport={() => console.log('Report artikel')}
            />
          </div>

          {/* Daftar Komentar Dinamis Berdasarkan ID Artikel */}
          <div className="flex flex-col gap-4 mt-4 w-full">
            <Typography variant="heading" className="text-xl font-bold">
              Komentar ({comments.length})
            </Typography>
            {comments.map((comment) => (
              <ArticleCommentItem
                key={comment.id}
                author={comment.author}
                date={comment.date}
                content={comment.content}
                likes={comment.likes}
                comments={comment.comments}
                onLikeClick={() => console.log('Like komentar', comment.id)}
                onBookmarkClick={() => console.log('Bookmark komentar', comment.id)}
                onShare={() => console.log('Share komentar', comment.id)}
                onReport={() => console.log('Report komentar', comment.id)}
              />
            ))}
          </div>

          {/* Tombol Lihat Lebih Banyak Komentar */}
          <div className="flex justify-center pb-12 w-full pt-4">
            <Button
              variant="primary"
              colorState="default"
              onClick={() => console.log('Muat lebih banyak komentar')}
              className="w-full md:w-auto px-6 py-2.5"
            >
              Lihat lebih banyak komentar
            </Button>
          </div>

        </div>
      </div>
    </AppShell>
  );
}