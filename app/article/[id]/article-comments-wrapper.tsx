"use client";

import React from 'react';
import { ArticleCommentItem } from '../../../shared/components/molecule/article-comment-item/article-comment-item';

export interface CommentData {
  id: string;
  articleId: string;
  author: string;
  avatarUrl?: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: number;
  parentId: string | null;
  date?: string;
}

export function ArticleCommentsWrapper({ comments }: { comments: CommentData[] }) {
  // 1. Filter hanya komentar utama (parentId === null)
  const parentComments = comments.filter((c) => c.parentId === null);

  return (
    <div className="flex flex-col gap-4 w-full">
      {parentComments.map((parent) => {
        // 2. Cari semua balasan yang parentId-nya merujuk ke ID komentar utama ini
        const replies = comments.filter((c) => c.parentId === parent.id);

        const formattedParentDate = typeof parent.createdAt === 'number'
          ? new Date(parent.createdAt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          : parent.date || 'Baru saja';

        return (
          <div key={parent.id} className="flex flex-col">
            {/* Render Komentar Utama */}
            <ArticleCommentItem
              avatarSrc={parent.avatarUrl}
              author={parent.author}
              date={formattedParentDate}
              content={parent.content}
              likes={parent.likes}
              comments={parent.comments}
              onCommentClick={() => {
                console.log('Balas komentar utama:', parent.id);
              }}
            />

            {/* Render Balasan (Replies) dengan gaya indentasi & garis vertikal di kiri */}
            {replies.map((reply) => {
              const formattedReplyDate = typeof reply.createdAt === 'number'
                ? new Date(reply.createdAt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                : reply.date || 'Baru saja';

              return (
                <ArticleCommentItem
                  key={reply.id}
                  avatarSrc={reply.avatarUrl}
                  author={reply.author}
                  date={formattedReplyDate}
                  content={reply.content}
                  likes={reply.likes}
                  comments={reply.comments}
                  isReply={true} 
                  onCommentClick={() => {
                    console.log('Balas sub-komentar:', reply.id);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}