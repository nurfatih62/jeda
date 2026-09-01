"use client";

import React from 'react';
// Ambil langsung dari folder article-footer-actions yang sudah kamu buat
import { ArticleFooterActions } from '../../../shared/components/molecule/article-footer-actions/article-footer-actions';

interface ArticleFooterWrapperProps {
  likes: number;
  comments: number;
}

export function ArticleFooterWrapper({ likes, comments }: ArticleFooterWrapperProps) {
  return (
    <ArticleFooterActions
      bookmarked={false}
      comments={comments}
      liked={false}
      likes={likes}
      onBookmarkClick={() => console.log('Bookmark diklik')}
      onLikeClick={() => console.log('Like diklik')}
      onReport={() => console.log('Report diklik')}
      onShare={() => console.log('Share diklik')}
    />
  );
}