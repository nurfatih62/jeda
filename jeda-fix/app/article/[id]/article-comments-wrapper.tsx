"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { ArticleCommentItem } from '../../../shared/components/molecule/article-comment-item/article-comment-item';
import { supabase } from '../../../lib/supabase/client';
import { CommentInputBox } from '../../../shared/components/molecule/comment-input-box/comment-input-box';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [replyingTo, setReplyingTo] = useState<CommentData | null>(null);
  const [replyError, setReplyError] = useState('');

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setIsLoggedIn(Boolean(data.session?.user));
    });
    return () => {
      mounted = false;
    };
  }, []);

  // 1. Filter hanya komentar utama (parentId === null)
  const parentComments = comments.filter((c) => c.parentId === null);
  const shareComment = (commentId: string) => {
    const url = `${window.location.origin}/article/${comments[0]?.articleId}/comments#comment-${commentId}`;
    void navigator.clipboard?.writeText(url);
  };

  async function submitReply(content: string) {
    if (!replyingTo) return;
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const mention = `@${replyingTo.author.replace(/\s+/g, '_')}`;
    const { error } = await supabase.from('comments').insert({
      article_id: replyingTo.articleId,
      author_id: user.id,
      parent_id: replyingTo.id,
      content: `${mention} ${content}`,
    });
    if (error) {
      setReplyError(error.message);
      return;
    }
    setReplyingTo(null);
    setReplyError('');
    window.location.reload();
  }

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
              onCommentClick={() => setReplyingTo(parent)}
              isLoggedIn={isLoggedIn}
              onShare={() => shareComment(parent.id)}
            />
            {replyingTo?.id === parent.id && (
              <div className="ml-8 mt-2">
                <CommentInputBox
                  placeholder={`Balas @${parent.author}`}
                  isLoggedIn={isLoggedIn}
                  onSubmit={submitReply}
                />
                {replyError && <p className="mt-2 text-sm text-red-500">{replyError}</p>}
              </div>
            )}

            {/* Render Balasan (Replies) dengan gaya indentasi & garis vertikal di kiri */}
            {replies.map((reply) => {
              const formattedReplyDate = typeof reply.createdAt === 'number'
                ? new Date(reply.createdAt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                : reply.date || 'Baru saja';

              return (
                <React.Fragment key={reply.id}>
                  <ArticleCommentItem
                    avatarSrc={reply.avatarUrl}
                    author={reply.author}
                    date={formattedReplyDate}
                    content={reply.content}
                    likes={reply.likes}
                    comments={reply.comments}
                    isReply={true} 
                    onCommentClick={() => setReplyingTo(reply)}
                    isLoggedIn={isLoggedIn}
                    onShare={() => shareComment(reply.id)}
                  />
                  {replyingTo?.id === reply.id && (
                    <div className="mt-2">
                      <CommentInputBox
                        placeholder={`Balas @${reply.author}`}
                        isLoggedIn={isLoggedIn}
                        onSubmit={submitReply}
                      />
                      {replyError && <p className="mt-2 text-sm text-red-500">{replyError}</p>}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}