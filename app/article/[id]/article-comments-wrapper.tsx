"use client";

import React from 'react';
import { ArticleCommentItem } from '../../../shared/components/molecule/article-comment-item/article-comment-item';
import { CommentFromAPI } from '../../../lib/api';

interface ArticleCommentsWrapperProps {
  comments: CommentFromAPI[];
}

export function ArticleCommentsWrapper({ comments }: ArticleCommentsWrapperProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {comments.length > 0 ? (
        comments.map((comment) => {
          // Konversi createdAt menjadi angka dengan aman sebelum dikalikan 1000
          const timestamp = Number(comment.createdAt) || Date.now();

          return (
            <ArticleCommentItem
              key={comment.id}
              avatarSrc={comment.avatarUrl}
              author={comment.author}
              date={new Date(timestamp * 1000).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
              content={comment.content}
              likes={comment.likes}
              comments={comment.comments}
              liked={false}
              bookmarked={false}
              onLikeClick={() => console.log('Like diklik:', comment.id)}
              onBookmarkClick={() => console.log('Bookmark diklik:', comment.id)}
              onShare={() => console.log('Share diklik:', comment.id)}
              onReport={() => console.log('Report diklik:', comment.id)}
            />
          );
        })
      ) : (
        <p className="text-text-muted text-sm">Belum ada komentar untuk artikel ini.</p>
      )}
    </div>
  );
}